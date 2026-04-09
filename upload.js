import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// 🚀 CATEGORY MAPPING (EDIT HERE)
const CATEGORY_MAPPING = {
   "": "",

  // "SCHOOL DESK &BENCH_BG": "School Desk & Bench"
};

// 📁 CHANGE THIS IF YOUR FOLDER IS SOMEWHERE ELSE
const PHOTOS_BASE_DIR = "./Photos";

// 🔐 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📤 MAIN FUNCTION
async function uploadTargetedCategories() {
  if (!fs.existsSync(PHOTOS_BASE_DIR)) {
    console.error(`❌ Photos directory not found: ${PHOTOS_BASE_DIR}`);
    return;
  }

  for (const [localFolderName, cloudTargetName] of Object.entries(CATEGORY_MAPPING)) {
    const fullSourcePath = path.join(PHOTOS_BASE_DIR, localFolderName);

    if (fs.existsSync(fullSourcePath) && fs.lstatSync(fullSourcePath).isDirectory()) {
      const files = fs.readdirSync(fullSourcePath).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext);
      });

      if (files.length === 0) {
        console.warn(`⚠️  Folder [${localFolderName}] is EMPTY or has no images. Skipping.`);
        continue;
      }

      const cloudFolder = `products/${cloudTargetName}`;
      console.log(`\n🚀 Uploading [${localFolderName}] (${files.length} images) → [${cloudFolder}]`);
      await uploadFilesInFolder(fullSourcePath, cloudFolder);
    } else {
      console.warn(`⚠️  Folder not found: ${fullSourcePath}`);
    }
  }
}

// 📁 UPLOAD FILES
async function uploadFilesInFolder(dir, cloudFolder) {
  const items = fs.readdirSync(dir);
  let count = 0;

  for (const item of items) {
    const filePath = path.join(dir, item);

    if (fs.lstatSync(filePath).isFile()) {
      const ext = path.extname(item).toLowerCase();

      // ✅ Allowed image formats
      if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) {
        console.log(`  ⏭ Skipped: ${item}`);
        continue;
      }

      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: cloudFolder,
          public_id: path.parse(item).name, // avoids duplicate names
          overwrite: false
        });

        console.log(`  ✅ [${++count}] ${item}`);
        console.log(`     🔗 ${result.secure_url}`);
      } catch (err) {
        console.error(`  ❌ ${item} → ${err.message}`);
      }
    }
  }
}

// 🚀 START
console.log("✨ Starting Cloudinary Smart Upload...");

uploadTargetedCategories()
  .then(() => console.log("\n🏁 Upload completed successfully!"))
  .catch((err) => console.error("💥 Execution error:", err));