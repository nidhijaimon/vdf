import torch
import torch.nn as nn
from torchvision import models
from torchvision.models import AlexNet_Weights
from PIL import Image
from torchvision import datasets, transforms
from collections import Counter
import os
import numpy as np

def deep_learning_prediction(image_paths):
    # Set device (GPU or CPU)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Define number of classes
    num_classes = 16  # Change this to match your dataset

    # Load the model architecture
    model = models.alexnet(weights=AlexNet_Weights.IMAGENET1K_V1)
    model.classifier[6] = nn.Linear(model.classifier[6].in_features, num_classes)
    model = model.to(device)

    # Load the saved weights
    model_path = "C:/Users/xiaomi/Desktop/PROJECT/vitamin_deficiency_model_final.pth"  # Path where model is saved
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()  # Set model to evaluation mode
    print("Model loaded successfully!")



    # Apply the same transformations as training
    transform = transforms.Compose([
        transforms.Lambda(lambda img: img.convert("RGB")),
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomRotation(degrees=15),
        transforms.RandomAffine(degrees=0, translate=(0.1, 0.1)),
        transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.1),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])

    # Training dataset directory
    train_dir = "C:/Users/xiaomi/Desktop/PROJECT/FINAL_DATASET/train"

    # Load dataset to get class labels
    train_dataset = datasets.ImageFolder(root=train_dir, transform=transform)

    # Define inference transformations (without random augmentations)
    inference_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])  
    
    cumulative_probabilities = {cls: 0.0 for cls in train_dataset.classes}  # Initialize cumulative probabilities
    
    for image_path in image_paths:
        image = Image.open(image_path)
        image = inference_transform(image).unsqueeze(0).to(device)  # Preprocess the image

        with torch.no_grad():
            output = model(image)
            probabilities = torch.sigmoid(output).cpu().numpy()[0]  # Get probabilities

        # Store class probabilities for this image
        class_probabilities = {train_dataset.classes[i]: probabilities[i] for i in range(num_classes)}
        
        # Add probabilities to cumulative sum
        for cls, prob in class_probabilities.items():
            cumulative_probabilities[cls] += prob

        print(f"\n🔹 Image: {os.path.basename(image_path)}")

        # Print all class probabilities for the current image
        print("\nAll Class Probabilities for this Image:")
        for cls, prob in class_probabilities.items():
            print(f"{cls}: {prob:.4f}")

    # Print cumulative probabilities for all classes
    print("\n🔹 Cumulative Probabilities Across All Images:")
    for cls, prob in cumulative_probabilities.items():
        print(f"{cls}: {prob:.4f}")

    # Determine the class with the highest cumulative probability
    highest_class = max(cumulative_probabilities, key=cumulative_probabilities.get)
    highest_prob = cumulative_probabilities[highest_class]

    print(f"\n🟢 Predicted Deficiency (Highest Cumulative Probability): {highest_class} ({highest_prob:.4f})")
    return f"{highest_class}"
