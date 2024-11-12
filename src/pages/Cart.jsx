import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const Cart = () => {
  const {cart, updateCart, removeFromCart} = useContext(CartContext);

  const handleIncrement = (item) => {
    updateCart(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        updateCart(item.id, item.quantity - 1);
    } else {
        removeFromCart(item.id);
    }
  };

  return (
    <>
        <Seo 
            title='Cart - My First Formative WP'
            description='Explore our wide range of products'
            url={window.location.href}
        />
        <div className="cart">
        <h1>Cart</h1>
        {cart.length === 0 ? (
            <div className='no-product-cart'>
                <p>Your Cart is Empty. Go buy something from the shop</p>
                <Link to='/shopCategories' className="secondary-button">Shop now</Link>

            </div>
            
        ) : (
            <>
            <ul className="cart-products">
                {cart.map((item) => (
                    <li key={item.id} className="cart-product">
                        <img src={item.images[0].src} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>Price: ${parseFloat(item.prices.price / 100).toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                        <div><button onClick={() => handleDecrement(item)}>-</button>
                        <button onClick={() => handleIncrement(item)}>+</button></div>
                        
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
                
            </ul>
            <div className="button-container">
                <button className='primary-button'>Proceed to Checkout</button>
                <Link to='/shopCategories' className="secondary-button">Continue Shopping</Link>
            </div>
            
            </>
            
        )} 
    </div>
    </>
    
  );
};

export default Cart;
