import os
import cloudinary
import cloudinary.api
from dotenv import load_dotenv

# Load credentials
load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def debug_cloudinary():
    print("[SEARCHING] Searching Cloudinary for all resources...")
    try:
        # 1. Check all folders
        print("\n--- FOLDERS FOUND ---")
        folders = cloudinary.api.root_folders()
        for f in folders.get('folders', []):
            print(f"Folder: {f['name']}")
            try:
                sub_folders = cloudinary.api.sub_folders(f['name'])
                for sf in sub_folders.get('folders', []):
                    print(f"   └── Subfolder: {sf['name']}")
            except:
                pass

        # 2. Check all images with 'products/' prefix
        print("\n--- IMAGES IN 'products/' ---")
        response = cloudinary.api.resources(type="upload", prefix="products/", max_results=50)
        resources = response.get('resources', [])
        
        if not resources:
            print("WARNING: No images found with 'products/' prefix.")
        else:
            for res in resources:
                print(f"Photo: {res['public_id']}")

        # 3. Check first 10 images anywhere
        print("\n--- FIRST 10 IMAGES (ANYWHERE) ---")
        response = cloudinary.api.resources(type="upload", max_results=10)
        for res in response.get('resources', []):
            print(f"Found: {res['public_id']}")

    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    debug_cloudinary()
