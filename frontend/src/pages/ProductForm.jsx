import { useState } from "react";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, subcategory, price, stock, images }),
    });

    if (response.ok) {
      alert("✅ Product added successfully!");
    } else {
      alert("❌ Failed to add product!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Product Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Desert">Desert</option>
        <option value="Mountain">Mountain</option>
        <option value="Tropical">Tropical</option>
        <option value="Forest">Forest</option>
      </select>

      {category && (
        <>
          <label>Subcategory:</label>
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
            {category === "Desert" && <option value="Cacti">Cacti</option>}
            {category === "Mountain" && <option value="Evergreens">Evergreens</option>}
            {category === "Tropical" && <option value="Palms">Palms</option>}
            {category === "Forest" && <option value="Maples">Maples</option>}
          </select>
        </>
      )}

      <label>Price ($):</label>
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />

      <label>Stock:</label>
      <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;