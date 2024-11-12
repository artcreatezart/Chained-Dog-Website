import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import wooCommerceApi from '../woocommerceApi';
import PageHeader from '../components/PageHeader';
import Seo from '../components/Seo';

const ShopCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await wooCommerceApi.get('/products/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();

    }, []);

    return (
        <>
            <Seo 
                title='Shop - My First Formative WP'
                description='Explore our wide range of products'
                url={window.location.href}
            />
            <div>
                <PageHeader title='Shop' image_url='/header-bg-imgs/bgimg3.jpg' />
                <ul className='product-categorie-container'>
                    {categories.map((category) => (
                        <li key={category.id} >
                            <Link to={`/category/${category.id}`}>
                                <h2 className='secondary-button'>{category.name}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
        
    );
};

export default ShopCategories;
