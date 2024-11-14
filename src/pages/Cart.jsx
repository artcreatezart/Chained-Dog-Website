import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { FaTrashAlt } from "react-icons/fa";

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

  const totalPrice = cart.reduce((total, item) => {
    return total + item.prices.price *item.quantity;
  }, 0) / 100;

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
                        <p>QUANTITY: {item.quantity}</p>
                        <p>TOTAL ITEM PRICE: ${parseFloat(item.prices.price * item.quantity / 100).toFixed(2)}</p>
                        <div className='cart-buttons'>
                            <button onClick={() => removeFromCart(item.id)} className='delete-product'><FaTrashAlt /></button>
                            <div className="plus-minus-buttons">
                            <button onClick={() => handleDecrement(item)} className='remove-product secondary-button'>-</button>
                            <button onClick={() => handleIncrement(item)}className='add-product secondary-button'>+</button>
                            </div>
                            
                        </div>
                        
                        
                    </li>
                ))}
                
            </ul>
            <div className='total-price'>
                <h2>Total: ${totalPrice.toFixed(2)}</h2>
            </div>
            <div className="button-container">
                <Link to='/shopCategories' className="secondary-button">Continue Shopping</Link>
                <button className='primary-button'>Proceed to Checkout</button>
            </div>
            
            </>
            
        )} 
    </div>
    </>
    
  );
};

export default Cart;
