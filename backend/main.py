from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.api
import cloudinary.uploader

# Load .env if it exists (for local dev), but prioritize system env vars (for production)
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
if os.path.exists(env_path):
    load_dotenv(env_path)

CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
API_KEY = os.getenv("CLOUDINARY_API_KEY")
API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

# Cloudinary configuration
if all([CLOUD_NAME, API_KEY, API_SECRET]):
    cloudinary.config(
        cloud_name=CLOUD_NAME,
        api_key=API_KEY,
        api_secret=API_SECRET,
        secure=True
    )
    print(f"✅ Cloudinary connected successfully for: {CLOUD_NAME}")
else:
    print("⚠️ WARNING: Cloudinary credentials missing! API will return mock data.")

app = FastAPI(title="Poorani Engineering API")

# CORS setup for Vercel and Localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    id: str
    name: str
    category: str
    description: str
    price: Optional[float] = None
    image_url: str
    specifications: dict

@app.get("/")
async def root():
    status = "Connected" if all([CLOUD_NAME, API_KEY, API_SECRET]) else "Warning: No Cloudinary"
    return {
        "message": "Welcome to Poorani Engineering API",
        "cloudinary_status": status,
        "environment": "Production" if os.getenv("RENDER") else "Development"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/products")
async def get_products(category: Optional[str] = None):
    # Mock data fallback
    base_products = [
        {"id": "1", "name": "SS Cooking Range", "category": "Hostel", "description": "Heavy-duty range.", "image_url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a", "specifications": {"material": "SS304"}},
    ]

    if not category:
        return base_products

    try:
        # Fetch photos from Cloudinary products/ folder
        response = cloudinary.api.resources(
            type="upload",
            prefix="products/",
            max_results=500,
            context=True
        )
        
        resources = response.get('resources', [])
        cloudinary_products = []
        normalized_category = "".join(filter(str.isalnum, category.lower()))
        
        for res in resources:
            public_id_parts = res['public_id'].lower().split('/')
            folder_name = public_id_parts[1] if len(public_id_parts) > 1 else ""
            normalized_folder = "".join(filter(str.isalnum, folder_name))
            
            # Match folder to category
            if normalized_folder in normalized_category or normalized_category in normalized_folder:
                name = res['public_id'].split('/')[-1].replace('_', ' ').replace('-', ' ').title()
                cloudinary_products.append({
                    "id": res['public_id'],
                    "name": name,
                    "category": category,
                    "description": f"High-quality {name} from Poorani Engineering.",
                    "image_url": res['secure_url'],
                    "specifications": {"material": "SS304"}
                })
        
        if cloudinary_products:
            return cloudinary_products
            
    except Exception as e:
        print(f"❌ API Error: {str(e)}")

    # Final fallback to matching mock data
    return [p for p in base_products if category.lower() in p["category"].lower()]

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
