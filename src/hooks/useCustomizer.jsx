import { useState, useEffect } from 'react';
import axios from 'axios';

const useCustomizer = () => {
  const [bgColor, setBgColor] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [mobileMenu, setMobileMenu] = useState('');
  const [navColor, setNavColor] = useState('')
  const [primaryBtnColor, setPrimaryBtnColor] = useState('');
  const [primaryBtnTextColor, setPrimaryBtnTextColor] = useState('');
  const [secondaryBtnColor, setSecondaryBtnColor] = useState('');
  const [secondaryBtnTextColor, setSecondaryBtnTextColor] = useState('');

  const baseURL = import.meta.env.VITE_WP_BASEURL;

  useEffect(() => {
    axios.get(`${baseURL}wp-json/custom-theme/v1/customizer-settings`)
        .then((response) => {
            const {backgroundColor, fontFamily, mobileMenu, navbarColor, primaryButtonColor, primaryButtonTextColor, secondaryButtonColor, secondaryButtonTextColor} = response.data;
            setBgColor(backgroundColor);
            setFontFamily(fontFamily);
            setMobileMenu(mobileMenu);
            setNavColor(navbarColor);
            setPrimaryBtnColor(primaryButtonColor);
            setPrimaryBtnTextColor(primaryButtonTextColor);
            setSecondaryBtnColor(secondaryButtonColor);
            setSecondaryBtnTextColor(secondaryButtonTextColor);
        })
        .catch((error) => {
            console.error('Error fetching customizer settings: ', error)
        })
  }, [baseURL]);

  return {bgColor, fontFamily, mobileMenu, navColor, primaryBtnColor, primaryBtnTextColor, secondaryBtnColor, secondaryBtnTextColor};
};

export default useCustomizer;
