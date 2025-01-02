import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/Dataprovider';
import { useNavigate } from 'react-router-dom';
import { fetchCarts } from '../service/api';
import '../css/Fav.css'

const FavPage = () => {
    const { cart, addToCart } = useContext(DataContext);
    const navigate = useNavigate();
    // const [orderData, setOrderData] = useState([]);

    const fetchCartData = useCallback(async () => {
        try {
            const response = await fetchCarts();
            if (!response.ok) {
                throw new Error("Failed to fetch product details.");
            }
            const data = await response.json();
            console.log(data);
            cart(data);
        } catch (error) {
            console.error(error);
        }
    }, []); 
    
    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);
    

    const handleHome = () => {
        navigate('/');
    };

    return (
        <div className="fav-container">
            {cart.length > 0 ? (
                <div className="fav-items">
                    {cart.map((order) => (
                        <div className="order-card" key={order.id}>
                            <h3>Order ID: {order.id}</h3>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            <div className="order-products">
                                {order.products.map((product, index) => (
                                    <div key={index} className="product-item">
                                        <p>Product ID: {product.productId}</p>
                                        <p>Quantity: {product.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-cart">
                    <img src="cartimg.png" alt="Empty Cart" className="empty-cart-image" />
                    <p>Your cart is empty</p>
                    <span
                        style={{ textDecoration: "underline", cursor: "pointer" }}
                        onClick={handleHome}
                    >
                        Shop Here
                    </span>
                </div>
            )}
        </div>
    );
};

export default FavPage;
