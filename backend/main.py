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
    print(f"Cloudinary connected successfully for: {CLOUD_NAME}")
else:
    print("WARNING: Cloudinary credentials missing! API will return mock data.")

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
    if not category:
        return [
            {"id": "1", "name": "SS Cooking Range", "category": "Hostel", "description": "Heavy-duty range.", "image_url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a", "specifications": {"material": "SS304"}},
        ]

    try:
        # SEARCH API is much more powerful to find specific folders
        # We search specifically for things in the 'products' folder
        search_query = f"folder:products/* AND resource_type:image"
        
        print(f"DEBUG: Searching for category: {category}")
        
        # We fetch up to 500 images
        result = cloudinary.Search() \
            .expression(search_query) \
            .max_results(500) \
            .execute()
        
        resources = result.get('resources', [])
        cloudinary_products = []
        
        # Clean target name: "Display counter" -> "displaycounter"
        target = "".join(filter(str.isalnum, category.lower()))
        
        for res in resources:
            public_id = res['public_id'].lower()
            # Path looks like: products/display counter/image1
            path_parts = public_id.split('/')
            if len(path_parts) < 2: continue
            
            # The folder name is the part after 'products'
            actual_folder = path_parts[1]
            normalized_folder = "".join(filter(str.isalnum, actual_folder))
            
            # Match if category name is in the folder name or vice versa
            if (normalized_folder in target) or (target in normalized_folder):
                filename = res['public_id'].split('/')[-1]
                # Use Folder Name as the product name for a cleaner look
                display_name = actual_folder.replace('_', ' ').replace('-', ' ').title()
                
                cloudinary_products.append({
                    "id": res['public_id'],
                    "name": f"{display_name} Unit",
                    "category": category,
                    "description": f"Premium {display_name} manufactured by Poorani Engineering Works.",
                    "image_url": res['secure_url'],
                    "specifications": {"material": "SS304", "origin": "Salem, India"}
                })
        
        if cloudinary_products:
            # Grouping by name to avoid duplicate titles if many images in same folder
            return sorted(cloudinary_products, key=lambda x: x['id'])
            
    except Exception as e:
        print(f"❌ API Search Error: {str(e)}")

    return []

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
