import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import useCustomizer from '../hooks/useCustomizer';
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const baseURL = import.meta.env.VITE_WP_BASEURL

const Navbar = () => {
    const {cart} = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const {mobileMenu} = useCustomizer();
    const [logoURL, setLogoURL] = useState('')

    const toggleMenu = () => {
        setIsOpen(!isOpen); 
        document.body.style.overflow = isOpen ? 'auto': 'hidden';
    }

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    }

    useEffect(() => {
        const mobile = document.querySelector('.nav-links'); 
        if (isOpen && mobile) {
        mobile.style.backgroundColor = mobileMenu;
        } else {
        mobile.style.backgroundColor = 'transparent';
        }
    }, [isOpen, mobileMenu])

    useEffect(() => {
        const fetchNavLogo = async () => {
            try {
                const response = await axios.get(`${baseURL}wp-json/custom/v1/nav-logo`)
                if (response.status === 200) {
                    const data = response.data;
                    setLogoURL(data[0]);
                } else {
                    console.error('Failed to fetch logo URL');
                }
            } catch (error) {
                console.error('Error fetching logo', error)
            }
        };

        fetchNavLogo();
    }, [])

    return (
        <header>
        <nav className={`navbar ${isOpen ? 'menu-open' : ''}`}>
            <NavLink to='/' className='logo'>
                <img src={logoURL} alt='Website Logo'/>
            </NavLink>

            <div className='menu-icon' onClick={toggleMenu}>
            <div className={`bar bar1 ${isOpen ? 'toggle' : ''}`}></div>
            <div className={`bar bar2 ${isOpen ? 'toggle' : ''}`}></div>
            <div className={`bar bar3 ${isOpen ? 'toggle' : ''}`}></div>
            </div>

            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li>
                <NavLink
                    to='/'
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? 'active-link' : '')}
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to='/job'
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? 'active-link' : '')}
                >
                    Team
                </NavLink>
            </li>

            <li>
                <NavLink
                    to='/dogs'
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? 'active-link' : '')}
                >
                    Dogs
                </NavLink>
            </li>

            <li>
                <NavLink
                    to='/shopCategories'
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? 'active-link' : '')}
                >
                    Shop
                </NavLink>
            </li>

            <li>
                <NavLink
                    to='/cart'
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? 'active-link' : '')}
                >
                    
                    {cart.length === 0 ? (
                        <div className='no-item-cart'/>
                    ) : (
                        <ul className='cart-icon'>
                                <li >
                                    <FaCartShopping/>
                                    <span>{cart.length}</span>
                                </li>

                        </ul>
                    )} 
                </NavLink>
            </li>

            <li>
                <NavLink
                    to='/contact'
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? 'active-link' : '')}
                >
                    Contact
                </NavLink>
            </li>

            <li>
                <Link 
                    to='/category/26'
                    onClick={closeMenu}
                    className='primary-button'
                    >
                        Donate
                </Link>
            </li>

            <li>
                <Link 
                    to='/contact'
                    onClick={closeMenu}
                    className='secondary-button'
                    >
                        Report a Chained Dog
                </Link>
            </li>

            </ul>

        </nav>
        {isOpen && <div className='overlay' onClick={closeMenu}></div>} 
        </header>
    )
}

export default Navbar
