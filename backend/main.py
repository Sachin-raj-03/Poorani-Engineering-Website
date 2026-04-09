from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.api
import cloudinary.uploader

# Secure production config (loads from .env at project root)
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env"))

CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
API_KEY = os.getenv("CLOUDINARY_API_KEY")
API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

if not all([CLOUD_NAME, API_KEY, API_SECRET]):
    print("⚠️ WARNING: Cloudinary credentials not found in .env! (Falling back to mock data)")
else:
    print(f"✅ Cloudinary connected securely for: {CLOUD_NAME}")

# Cloudinary configuration
cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET,
    secure=True
)

app = FastAPI(title="SteelCraft Manufacturing API")

# CORS setup
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

class Inquiry(BaseModel):
    customer_name: str
    phone: str
    email: str
    product_id: Optional[str] = None
    message: str
    dimensions: Optional[dict] = None

@app.get("/")
async def root():
    return {"message": "Welcome to SteelCraft Manufacturing API"}

@app.get("/api/products")
async def get_products(category: Optional[str] = None):
    # Base products (mock data for reference)
    base_products = [
        {"id": "1", "name": "SS Bulk Cooking Range", "category": "Hostel", "description": "Heavy-duty industrial cooking range for large volume preparation.", "image_url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop", "specifications": {"material": "SS304"}},
        {"id": "2", "name": "Glass Display Counter", "category": "Display counter", "description": "Elegant tempered glass counter with internal LED lighting.", "image_url": "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1974&auto=format&fit=crop", "specifications": {"glass": "Toughened"}},
        {"id": "3", "name": "4-Seater SS Dining Table", "category": "Dining table", "description": "Durable all-stainless steel dining table for industrial canteens.", "image_url": "https://images.unsplash.com/photo-1615060761096-33973cf0fd00?q=80&w=2070&auto=format&fit=crop", "specifications": {"capacity": "4 Persons"}},
    ]

    if not category:
        return base_products

        # Step 1: Fetch from Cloudinary
    try:
        # Fetching all resources under 'products/' prefix for better flexibility
        print(f"\n--- Cloudinary Debug Start ---")
        print(f"🔍 Website requested category: '{category}'")
        
        # Searching with prefix "products/" to catch all categorized items
        response = cloudinary.api.resources(
            type="upload",
            prefix="products/",
            max_results=500,
            context=True
        )
        
        resources = response.get('resources', [])
        print(f"📦 Total resources found in Cloudinary 'products/' prefix: {len(resources)}")
        
        cloudinary_products = []
        # Normalize category for fuzzy matching (lowercase and alphanumeric only)
        normalized_category = "".join(filter(str.isalnum, category.lower()))
        print(f"🛠️ Normalized search term: '{normalized_category}'")
        
        for res in resources:
            public_id_lower = res['public_id'].lower()
            # Extract folder name (e.g. products/Bainmarie/img -> bainmarie)
            parts = public_id_lower.split('/')
            folder_name = parts[1] if len(parts) > 1 else ""
            normalized_folder = "".join(filter(str.isalnum, folder_name))
            
            # Match happens if one is inside the other
            is_match = (normalized_folder in normalized_category and len(normalized_folder) > 2) or \
                       (normalized_category in normalized_folder and len(normalized_category) > 2) or \
                       ("trolley" in normalized_folder and "trolly" in normalized_category)
            
            if is_match:
                print(f"✅ MATCH FOUND: Folder '{normalized_folder}' matches category '{normalized_category}'")
                full_name = res['public_id'].split('/')[-1]
                display_name = full_name.replace('_', ' ').replace('-', ' ').title()
                
                cloudinary_products.append({
                    "id": res['public_id'],
                    "name": display_name,
                    "category": category,
                    "description": f"High-quality {display_name} manufactured at Poorani Engineering Works.",
                    "price": None,
                    "image_url": res['secure_url'],
                    "specifications": {"material": "SS304", "origin": "Salem, India"}
                })
        
        print(f"📊 Final result: {len(cloudinary_products)} products found.")
        print(f"--- Cloudinary Debug End ---\n")
        
        if cloudinary_products:
            return cloudinary_products
            
    except Exception as e:
        print(f"❌ Cloudinary error: {str(e)}")

    # Step 2: Fallback to mock data filter if Cloudinary folder is empty or errors
    return [p for p in base_products if category.lower() in p["category"].lower()]

@app.post("/api/inquiry")
async def create_inquiry(inquiry: Inquiry):
    # Here we would save to Supabase
    return {"status": "success", "message": "Inquiry received. Our team will contact you shortly."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
