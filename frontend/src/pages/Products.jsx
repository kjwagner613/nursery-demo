import React, { useState, useEffect } from 'react';
import Chinesse_Plum_Blossom from "./../assets/images/products/Chinesse_Plum_Blossom.jpg"
import IMPATIENS_wallariana from "./../assets/images/products/IMPATIENS_walleriana.jpg"
import "./../assets/images/products/Nicotiana.jpg"
import "./../assets/images/products/Sarracenia_leucophylla.jpg"


const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedPrice, setSelectedPrice] = useState(10);
  const [selectedQty, setSelectedQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(selectedPrice * selectedQty);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    if (e.target.value === 'S') {
      setSelectedPrice(10);
    } else if (e.target.value === 'M') {
      setSelectedPrice(15);
    } else if (e.target.value === 'L') {
      setSelectedPrice(20);
    }
  };

  const handleQtyChange = (e) => {
    setSelectedQty(e.target.value);
  };

  useEffect(() => {
    setTotalPrice(selectedPrice * selectedQty);
  }, [selectedPrice, selectedQty]);

  return (
    <div className="product-page">
      <div className="product-image-container" style={{ marginLeft: "10px" }}>
        <img
          className="plum-blossom"
          src={Chinesse_Plum_Blossom}
          alt="Product Image"
          marginLeft="10px"
          move-right="150px"
          style={{ transform: "scale(0.8)" }}
        />
        <img src={IMPATIENS_wallariana} alt="Product Image" style={{ transform: "scale(0.4)" }} />
      </div>
      <div className="product-details">
        <h1>Plum Blossom and IMPATIENS</h1>
        <p>Price: ${selectedPrice}</p>
        <label htmlFor="size-select">Size:</label>
        <select id="size-select" value={selectedSize} onChange={handleSizeChange}>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
        <label htmlFor="qty-select">Quantity:</label>
        <select id="qty-select" value={selectedQty} onChange={handleQtyChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p>Total Price: ${totalPrice}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;