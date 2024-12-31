import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ProductDetails.css"; 
import { fetchDetails } from "../service/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetchDetails(id)
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img
          src={product.image}
          alt={product.title}
          className="product-details-image"
        />
        <div className="product-details-info">
          <h1 className="product-details-title">{product.title}</h1>
          <p className="product-details-category">
            Category: <strong>{product.category}</strong>
          </p>
          <p className="product-details-price">
            Price: <strong>${product.price}</strong>
          </p>
          <p className="product-details-description">{product.description}</p>
          <button
            className="product-details-add-to-cart"
            onClick={() => alert("Added to cart!")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
