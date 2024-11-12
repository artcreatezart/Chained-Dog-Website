import { useContext, useEffect, useState} from 'react';
import wooCommerceApi from '../woocommerceApi';
import { CartContext } from '../context/CartContext';
import PageHeader from '../components/PageHeader';
import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
 
const Products = () => {
    const { categoryId } = useParams(); 
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const {addToCart} = useContext(CartContext);
    const [showAddToCart, setShowAddToCart] = useState(false);
 
    useEffect(() => {
        const fetchCategoryName = async () => {
          try {
            const response = await wooCommerceApi.get(`products/categories/${categoryId}`);
            setCategoryName(response.data.name);
          } catch (error) {
            console.error('Error couldnt fetch products', error)
          }
        }
        const fetchProducts = async () => {
            try {
                const response = await wooCommerceApi.get('/products', {
                  params: { category: categoryId }});
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error)
            }
        }
        fetchCategoryName();
        fetchProducts();
    }, [categoryId]);
 
    const handleAddToCart = (product) =>{
        addToCart(product); 
        setShowAddToCart(true);

        setTimeout(() => {
            setShowAddToCart(false);
        }, 3000);
    };
 
  return (
    <>
      <Seo
        title={categoryName || 'Products'}
        description={`Explore products in the ${categoryName} category`}
        image={products[0]?.images?.[0]?.src}
        url={window.location.href}
      />
      <div id='productsContainer'>
        <PageHeader title={categoryName} image_url='/header-bg-imgs/bgimg3.jpg'/>
        <ul className='products-container'>
          {products.map(product => (
              <li key={product.id} className='product-container'>
                  <img src={product.images[0].src} alt={product.name} />
                  <h2>{product.name}</h2>
                  <p>Price:  ${(product.prices.price / 100).toFixed(2)} {product.prices.currency_code}</p>
                  <div dangerouslySetInnerHTML={{ __html: product.short_description }}/>
                  <button onClick={() => handleAddToCart(product)} className='secondary-button'>Add to Cart</button>
              </li>
          ))}
        </ul>

        {showAddToCart && (
          <div className='added-to-cart-prompt'>
              Item added to cart!
          </div>
        )}
 
      </div>
    </>
  )
}
 
export default Products