import { useState, useEffect } from "react";

const ProductGallery = ({ images, onImageChange }) => {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    const newIndex = (index + 1) % images.length;
    setIndex(newIndex);
    onImageChange(images[newIndex]); // ✅ Updates product details
  };

  const prevImage = () => {
    const newIndex = (index - 1 + images.length) % images.length;
    setIndex(newIndex);
    onImageChange(images[newIndex]); // ✅ Updates product details
  };

  return (
    <div>
      <img src={images[index]} alt={`Product Image ${index + 1}`} />
      <button onClick={prevImage}>← Prev</button>
      <button onClick={nextImage}>Next →</button>
    </div>
  );
};

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
  const [totalPrice, setTotalPrice] = useState(selectedPrice * selectedQty);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products?category=${selectedCategory}`);
      const data = await response.json();
      setProducts(data.length > 0 ? data : []); // ✅ Ensures no errors on empty response
    };
    fetchProducts();
  }, [selectedCategory]);


  // ✅ Ensures clean selection after category switch
  useEffect(() => {
    setSelectedProductIndex(0);
  }, [selectedCategory]);


  const handleProductSelect = (index) => {
    setSelectedProductIndex(index);
    setSelectedPrice(products[index]?.price || 0);
  };

  const handleImageChange = (newImage, index) => {
    setSelectedPrice(products[selectedProductIndex]?.price || 0); // ✅ Pull price from DB or 0
  };

  useEffect(() => {
    setTotalPrice(selectedPrice * selectedQty);
  }, [selectedPrice, selectedQty]);

  return (
    <div>
      {/* <h1 className="font-Playfair text-xl my-4.5">Product Gallery</h1> */}
      <h1
  style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-titles)' }}
  className="my-8"
>
  Product Gallery
</h1>

      {/* ✅ Category Filter */}
      <CategoryFilter setSelectedCategory={setSelectedCategory} />

      {/* ✅ Products List */}
      <div>
        {products.map((product, idx) => (
          <button key={product.id || idx} onClick={() => handleProductSelect(idx)}>
            {product.name || `Product ${idx + 1}`}
          </button>
        ))}
      </div>

      {/* ✅ Product Details */}
      {products.length > 0 && products[selectedProductIndex]?.images && (
        <div>
          <ProductGallery images={products[selectedProductIndex].images} onImageChange={handleImageChange} />
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