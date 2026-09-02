import random
from PIL import Image, ImageEnhance, ImageFilter

class AgriculturalImageAugmenter:
    """
    Realistic Agricultural Augmenter for Onion Defect Detection.
    Maintains visual authenticity of rot, skin splits, and sprout characteristics.
    """
    def __init__(self, rotation_deg=15, brightness_range=(0.85, 1.15), contrast_range=(0.9, 1.1)):
        self.rotation_deg = rotation_deg
        self.brightness_range = brightness_range
        self.contrast_range = contrast_range

    def augment(self, image: Image.Image) -> Image.Image:
        img = image.copy()
        
        # 1. Random Mild Rotation (-15 to +15 deg)
        if random.random() > 0.5:
            angle = random.uniform(-self.rotation_deg, self.rotation_deg)
            img = img.rotate(angle, resample=Image.BICUBIC, expand=False)
            
        # 2. Horizontal Flip
        if random.random() > 0.5:
            img = img.transpose(Image.FLIP_LEFT_RIGHT)
            
        # 3. Mild Lighting & Brightness Variation (Simulating Field Shadow / Sunlight)
        if random.random() > 0.4:
            factor = random.uniform(*self.brightness_range)
            img = ImageEnhance.Brightness(img).enhance(factor)
            
        # 4. Contrast Variation
        if random.random() > 0.4:
            factor = random.uniform(*self.contrast_range)
            img = ImageEnhance.Contrast(img).enhance(factor)
            
        # 5. Mild Blur (Simulating Lens Dust or Motion Blur)
        if random.random() > 0.8:
            img = img.filter(ImageFilter.GaussianBlur(radius=random.uniform(0.3, 0.8)))
            
        return img
