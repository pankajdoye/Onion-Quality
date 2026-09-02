import os
import json
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import transforms, datasets, models
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATASETS_DIR = BASE_DIR / "ml" / "datasets"
MODELS_DIR = BASE_DIR / "models"

class OnionQualityNet(nn.Module):
    def __init__(self, num_classes: int = 2, architecture: str = "efficientnet_b0"):
        super(OnionQualityNet, self).__init__()
        self.architecture = architecture
        if "efficientnet" in architecture:
            try:
                base_model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
            except Exception:
                base_model = models.efficientnet_b0(pretrained=True)
            num_ftrs = base_model.classifier[1].in_features
            base_model.classifier = nn.Identity()
            self.backbone = base_model
        else:
            try:
                base_model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
            except Exception:
                base_model = models.mobilenet_v3_small(pretrained=True)
            num_ftrs = base_model.classifier[0].in_features
            base_model.classifier = nn.Identity()
            self.backbone = base_model

        self.classifier = nn.Sequential(
            nn.Dropout(p=0.4),
            nn.Linear(num_ftrs, 128),
            nn.ReLU(),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        feat = self.backbone(x)
        out = self.classifier(feat)
        return out

def train_quality_classifier(epochs: int = 5, batch_size: int = 64, lr: float = 2e-4, architecture: str = "efficientnet_b0"):
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Training Onion Quality Classifier on {device} using architecture: {architecture}", flush=True)

    train_dir = DATASETS_DIR / "train" / "quality"
    val_dir = DATASETS_DIR / "validation" / "quality"

    if not train_dir.exists():
        print(f"Train directory {train_dir} does not exist.", flush=True)
        return

    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(20),
        transforms.ColorJitter(brightness=0.25, contrast=0.25),
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

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=0)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=0)

    num_classes = len(train_dataset.classes)
    print(f"Classes ({num_classes}): {train_dataset.class_to_idx}", flush=True)

    model = OnionQualityNet(num_classes=num_classes, architecture=architecture).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)

    best_val_acc = 0.0
    best_model_path = MODELS_DIR / "onion_quality_best.pth"

    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * inputs.size(0)
            _, preds = torch.max(outputs, 1)
            correct += torch.sum(preds == labels.data).item()
            total += labels.size(0)

        train_acc = correct / total if total > 0 else 0.0

        # Validation
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                val_loss += loss.item() * inputs.size(0)
                _, preds = torch.max(outputs, 1)
                val_correct += torch.sum(preds == labels.data).item()
                val_total += labels.size(0)

        val_acc = val_correct / val_total if val_total > 0 else 0.0

        print(f"Epoch {epoch+1}/{epochs} - Train Acc: {train_acc*100:.2f}% | Val Acc: {val_acc*100:.2f}%", flush=True)

        if val_acc >= best_val_acc:
            best_val_acc = val_acc
            torch.save({
                'model_state_dict': model.state_dict(),
                'architecture': architecture,
                'class_to_idx': train_dataset.class_to_idx,
                'idx_to_class': {v: k for k, v in train_dataset.class_to_idx.items()},
                'best_val_acc': best_val_acc,
                'input_size': 224
            }, best_model_path)
            print(f"--> Saved best quality model with Val Acc: {best_val_acc*100:.2f}%", flush=True)

    return best_val_acc

if __name__ == "__main__":
    train_quality_classifier()
