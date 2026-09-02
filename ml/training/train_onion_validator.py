import os
import json
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, WeightedRandomSampler
from torchvision import transforms, datasets, models
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATASETS_DIR = BASE_DIR / "ml" / "datasets"
MODELS_DIR = BASE_DIR / "models"

class OnionValidatorNet(nn.Module):
    def __init__(self, architecture: str = "efficientnet_b0"):
        super(OnionValidatorNet, self).__init__()
        self.architecture = architecture
        if architecture == "efficientnet_b0":
            try:
                base_model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
            except Exception:
                base_model = models.efficientnet_b0(pretrained=True)
            num_ftrs = base_model.classifier[1].in_features
            base_model.classifier = nn.Identity()
            self.backbone = base_model
        else:
            try:
                base_model = models.mobilenet_v3_large(weights=models.MobileNet_V3_Large_Weights.DEFAULT)
            except Exception:
                base_model = models.mobilenet_v3_large(pretrained=True)
            num_ftrs = base_model.classifier[0].in_features
            base_model.classifier = nn.Identity()
            self.backbone = base_model

        self.head = nn.Sequential(
            nn.Dropout(p=0.3),
            nn.Linear(num_ftrs, 128),
            nn.ReLU(),
            nn.Dropout(p=0.2),
            nn.Linear(128, 1)
        )

    def forward(self, x):
        features = self.backbone(x)
        logits = self.head(features)
        return logits

def train_validator(epochs: int = 6, batch_size: int = 64, lr: float = 3e-4, architecture: str = "efficientnet_b0"):
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Training Onion Validator on device: {device} using architecture: {architecture}", flush=True)

    train_dir = DATASETS_DIR / "train" / "validator"
    val_dir = DATASETS_DIR / "validation" / "validator"

    if not train_dir.exists():
        print(f"Train directory {train_dir} does not exist.", flush=True)
        return

    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    train_dataset = datasets.ImageFolder(root=str(train_dir), transform=train_transform)
    val_dataset = datasets.ImageFolder(root=str(val_dir), transform=val_transform)

    print(f"Class mapping: {train_dataset.class_to_idx}", flush=True)
    onion_idx = train_dataset.class_to_idx.get('onion', 1)

    targets_list = [sample[1] for sample in train_dataset.samples]
    class_counts = torch.bincount(torch.tensor(targets_list))
    class_weights = 1.0 / class_counts.float()
    sample_weights = class_weights[targets_list]

    sampler = WeightedRandomSampler(weights=sample_weights, num_samples=len(sample_weights), replacement=True)

    train_loader = DataLoader(train_dataset, batch_size=batch_size, sampler=sampler, num_workers=0)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=0)

    model = OnionValidatorNet(architecture=architecture).to(device)
    criterion = nn.BCEWithLogitsLoss()
    optimizer = optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)

    best_val_acc = 0.0
    best_model_path = MODELS_DIR / "onion_validator_best.pth"

    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for inputs, labels in train_loader:
            inputs = inputs.to(device)
            targets = (labels == onion_idx).float().unsqueeze(1).to(device)

            optimizer.zero_grad()
            logits = model(inputs)
            loss = criterion(logits, targets)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * inputs.size(0)
            probs = torch.sigmoid(logits)
            preds = (probs >= 0.5).float()
            correct += (preds == targets).sum().item()
            total += targets.size(0)

        scheduler.step()
        train_acc = correct / total if total > 0 else 0.0
        train_loss = running_loss / total if total > 0 else 0.0

        # Validation Phase
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs = inputs.to(device)
                targets = (labels == onion_idx).float().unsqueeze(1).to(device)

                logits = model(inputs)
                loss = criterion(logits, targets)

                val_loss += loss.item() * inputs.size(0)
                probs = torch.sigmoid(logits)
                preds = (probs >= 0.5).float()
                val_correct += (preds == targets).sum().item()
                val_total += targets.size(0)

        val_acc = val_correct / val_total if val_total > 0 else 0.0
        val_epoch_loss = val_loss / val_total if val_total > 0 else 0.0

        print(f"Epoch {epoch+1}/{epochs} - Train Loss: {train_loss:.4f}, Train Acc: {train_acc*100:.2f}% | Val Loss: {val_epoch_loss:.4f}, Val Acc: {val_acc*100:.2f}%", flush=True)

        if val_acc >= best_val_acc:
            best_val_acc = val_acc
            torch.save({
                'model_state_dict': model.state_dict(),
                'architecture': architecture,
                'class_to_idx': train_dataset.class_to_idx,
                'onion_idx': onion_idx,
                'best_val_acc': best_val_acc,
                'input_size': 224
            }, best_model_path)
            print(f"--> Saved best validator model with Val Acc: {best_val_acc*100:.2f}%", flush=True)

    return best_val_acc

if __name__ == "__main__":
    train_validator()
