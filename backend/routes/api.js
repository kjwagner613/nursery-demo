import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";
import { Product } from '../models/Product.js';
import { verifyAdmin } from '../middleware/authMiddleware.js'; // ✅ Protect admin routes
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // ✅ Store images in memory before upload


router.post("/login", loginUser);
router.post("/register", registerUser);

// ✅ Upload product images (Admin Only)
router.post('/products/:id/upload', verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { 
      folder: "nursery_products" 
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $push: { images: result.secure_url } }, // ✅ Adds new image to the product's image array
      { new: true }
    );

    res.json({ success: true, imageUrl: result.secure_url, product: updatedProduct });
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});



// ✅ GET all active not deleted products (public)
router.get('/products', async (req, res) => {
  try {
    const category = req.query.category;
    const filter = { active: true, deleted: false };
    if (category) filter.category = category;

    const products = await Product.find(filter).select("name category subcategory price images");
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});



// ✅ POST new product (admin-only)
router.post('/products', verifyAdmin, async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      images: req.body.images || [] // ✅ Accepts multiple images
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(400).json({ error: "Invalid product data" });
  }
});
// ✅ PUT Update Product Images (admin-only)
router.put('/products/:id/images', verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { images: req.body.images },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ Error updating product images:", error);
    res.status(400).json({ error: "Failed to update images" });
  }
});


router.delete('/products/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    res.json({ success: true, message: "✅ Product marked as deleted", product: updatedProduct });
  } catch (error) {
    console.error("❌ Error soft deleting product:", error);
    res.status(400).json({ error: "Failed to delete product" });
  }
});


export default router;
