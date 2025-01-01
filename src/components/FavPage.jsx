import React, { useContext } from 'react';
import { DataContext } from '../context/Dataprovider';
// import './FavPage.css';
import '../css/Fav.css'

const FavPage = () => {
    const { cart } = useContext(DataContext);

    return (
        <div className="fav-container">
            {cart.length > 0 ? (
                <div className="fav-items">
                    {cart.map((item, index) => (
                        <div className="fav-card" key={index}>
                            <img src={item.image} alt={item.title} className="fav-image" />
                            <div className="fav-details">
                                <h3 className="fav-title">{item.title}</h3>
                                <p className="fav-price">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-cart">
                    <img src="/path_to_image.jpg" alt="Empty Cart" className="empty-cart-image" />
                    <p>Your cart is empty</p>
                </div>
            )}
        </div>
    );
};

export default FavPage;
