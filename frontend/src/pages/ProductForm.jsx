import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ title: "", description: "", price: "", images: [] });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const imageFiles = Array.from(e.target.files);
    setFormData({ ...formData, images: imageFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      
      // Send product data first
      const productResponse = await axios.post("/api/products", {
        title: formData.title,
        description: formData.description,
        price: formData.price
      });

      const productId = productResponse.data._id;
      if (!productId) throw new Error("Failed to create product.");

      // Upload images to Cloudinary after product creation
      if (formData.images.length > 0) {
        const imageData = new FormData();
        formData.images.forEach(image => imageData.append("images", image));
        const imageResponse = await axios.post(`/api/upload/${productId}`, imageData);
        await axios.put(`/api/products/${productId}`, { images: imageResponse.data });
      }

      onProductAdded(); // ✅ Refresh products in Products.jsx after submission
    } catch (error) {
      setErrorMessage("Error submitting product.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Generic fill-in field (text) */}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        required
      />

      {/* Dropdown (select) */}
      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Dessert">Desert</option>
        <option value="mountain">Mountain</option>
        <option value="tropical">Tropical</option>
        <option value="forest">Forest</option>  
      </select>

      {/* Currency (number, step for cents) */}
         <label>
        Price
      <input
        type="number"
        name="price"
        placeholder="Price"
        step="0.01"
        min="0"
        onChange={handleChange}
        required
      />
      </label>

      {/* Number (integer) */}
      <label>
        Stock
        <input
          type="number"
          name="stock"
          placeholder="Qty in Stock"
          min="0"
          onChange={handleChange}
        />
      </label>

      {/* Active yes/no to list on product list */}
      <label>
        List in Catalog?
        <select name="active" onChange={handleChange} required>
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      {/* Images */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />

      <button type="submit">Submit Product</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default ProductForm;