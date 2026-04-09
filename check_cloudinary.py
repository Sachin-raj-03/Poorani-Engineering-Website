import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.api

# Load .env relative to current script (root level)
load_dotenv(".env")

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def list_cloudinary_folders():
    try:
        # List subfolders in 'products/'
        response = cloudinary.api.subfolders("products")
        folders = [f['name'] for f in response['folders']]
        print(f"📁 Categories found in Cloudinary (under 'products/'):")
        for f in folders:
            print(f" - {f}")
            
        # Check files in products/
        res = cloudinary.api.resources(type="upload", prefix="products/", max_results=10)
        print(f"\n📄 Recent files (total checked: {len(res['resources'])}):")
        for r in res['resources']:
            print(f" - {r['public_id']}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    list_cloudinary_folders()
