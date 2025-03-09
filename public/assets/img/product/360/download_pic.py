import requests

# Base URL for the images
base_url = "https://360views.3dmodels.org/original/Tools/1279_Six_Panel_Snapback/Six_Panel_Snapback_360_1080_200-"

# Function to download and save each image
def download_image(image_number):
    image_url = f"{base_url}{image_number}.jpg"
    response = requests.get(image_url)
    if response.status_code == 200:
        with open(f"snapback_{image_number}.jpg", 'wb') as file:
            file.write(response.content)
        print(f"Image {image_number} downloaded successfully.")
    else:
        print(f"Failed to download image {image_number}.")

# Loop to download images from 1 to 200
for i in range(1, 201):
    download_image(i)
