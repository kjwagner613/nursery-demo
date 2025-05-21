import { useState, useEffect } from "react";
import ProductForm from "./ProductForm"; // ✅ Import the product form
import ProductGallery from "../components/ProductGallery"; // ✅ Import ProductGallery component

const CategoryFilter = ({ setSelectedCategory }) => {
  const categoryData = {
    Desert: ["Cacti", "Succulents", "Dry Flowers"],
    Mountain: ["Evergreens", "Alpine Flowers"],
    Tropical: ["Palms", "Orchids", "Ferns"],
    Forest: ["Maples", "Pine", "Birch"]
  };

  const [selectedCategory, setCategory] = useState("");
  const [selectedSubcategory, setSubcategory] = useState("");

  return (
    <>
      <select onChange={(e) => { setCategory(e.target.value); setSelectedCategory(e.target.value); }}>
        <option value="">Select Category</option>
        {Object.keys(categoryData).map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {selectedCategory && (
        <select onChange={(e) => setSubcategory(e.target.value)}>
          <option value="">Select Subcategory</option>
          {categoryData[selectedCategory].map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
      )}
    </>
  );
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ Added loading state for UX improvement

  const fetchProducts = async () => {
    setLoading(true); // ✅ Show loading while fetching
    try {
      const response = await fetch(`/api/products?category=${selectedCategory}`);
      const data = await response.json();
      setProducts(data.length > 0 ? data : []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false); // ✅ Hide loading after fetch
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleProductAdded = () => {
    fetchProducts(); // ✅ Refresh product list after a new one is added
  };

  useEffect(() => {
    setSelectedProductIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    setTotalPrice(selectedPrice * selectedQty);
  }, [selectedPrice, selectedQty]); // ✅ Ensure total price updates dynamically

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-titles)' }} className="my-8">
        Product Gallery
      </h1>

      {/* ✅ Product Form (For Adding New Products) */}
      <ProductForm onProductAdded={handleProductAdded} />

      {/* ✅ Category Filter */}
      <CategoryFilter setSelectedCategory={setSelectedCategory} />

      {/* ✅ Show loading indicator while fetching products */}
      {loading ? <p>Loading products...</p> : null}

      {/* ✅ Products List */}
      <div>
        {products.map((product, idx) => (
          <button key={product.id || idx} onClick={() => setSelectedProductIndex(idx)}>
            {product.name || `Product ${idx + 1}`}
          </button>
        ))}
      </div>

      {/* ✅ Product Details */}
      {products.length > 0 && products[selectedProductIndex]?.images && (
        <div>
          <ProductGallery images={products[selectedProductIndex].images} onImageChange={() => setSelectedPrice(products[selectedProductIndex]?.price || 0)} />
          <h2>{products[selectedProductIndex]?.name}</h2>
          <p>Price: ${selectedPrice}</p>

          <label htmlFor="qty-select">Quantity:</label>
          <select id="qty-select" value={selectedQty} onChange={(e) => setSelectedQty(Number(e.target.value))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <p>Total Price: ${totalPrice}</p>
          <button>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default Products;