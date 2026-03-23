from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

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
    # Mock data for now
    products = [
        {
            "id": "1",
            "name": "SS Bulk Cooking Range",
            "category": "Hostel",
            "description": "Heavy-duty industrial cooking range for large volume preparation.",
            "price": None,
            "image_url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
            "specifications": {"material": "SS304", "burners": 4}
        },
        # More products...
    ]
    if category:
        return [p for p in products if p["category"].lower() == category.lower()]
    return products

@app.post("/api/inquiry")
async def create_inquiry(inquiry: Inquiry):
    # Here we would save to Supabase
    return {"status": "success", "message": "Inquiry received. Our team will contact you shortly."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
