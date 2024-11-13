import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
// Import customizer hook
import useCustomizer from './hooks/useCustomizer';

// Imports
import Navbar from './components/Navbar';
import Links from './components/Links';
import Footer from './components/Footer';

const App = () => {
  const { bgColor, fontFamily, navColor, primaryBtnColor, primaryBtnTextColor, secondaryBtnColor, secondaryBtnTextColor } = useCustomizer();

  
  // Check if the customizer values are loaded
  const isCustomizerLoaded = bgColor && fontFamily && navColor && primaryBtnColor && primaryBtnTextColor && secondaryBtnColor && secondaryBtnTextColor;

  useEffect(() => {
    if (!isCustomizerLoaded) return;

    document.documentElement.style.setProperty('--primary-btn-bg', primaryBtnColor);
    document.documentElement.style.setProperty('--primary-btn-text', primaryBtnTextColor);
    document.documentElement.style.setProperty('--secondary-btn-bg', secondaryBtnColor);
    document.documentElement.style.setProperty('--secondary-btn-text', secondaryBtnTextColor);
    document.documentElement.style.setProperty('--event-home-bg', navColor);

  
    // Set background color and font for body
    document.body.style.backgroundColor = `#${bgColor}`;
    document.body.style.fontFamily = fontFamily ? `'${fontFamily}', sans-serif` : '';
  
    // Style nav and footer
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (nav) nav.style.backgroundColor = navColor;
    if (footer) footer.style.backgroundColor = navColor;
  
  }, [bgColor, fontFamily, navColor, primaryBtnColor, primaryBtnTextColor, secondaryBtnColor, secondaryBtnTextColor]);


  return (
    <HashRouter>
        {isCustomizerLoaded ? (
          <div style={{ backgroundColor: `#${bgColor}`, fontFamily: fontFamily}}>
            <Navbar style={{ backgroundColor: navColor }} />
            <Links />
            <Footer />
          </div>
        ) : (
          <p>Loading</p>
        )}
    </HashRouter>
  );

}

export default App
