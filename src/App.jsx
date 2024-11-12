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
  
    // Set background color and font for body
    document.body.style.backgroundColor = `#${bgColor}`;
    document.body.style.fontFamily = fontFamily ? `'${fontFamily}', sans-serif` : '';
  
    // Style nav and footer
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (nav) nav.style.backgroundColor = navColor;
    if (footer) footer.style.backgroundColor = navColor;
  
    // Style primary buttons
    const primaryButton = document.querySelectorAll('.primary-button');
    primaryButton.forEach(button => {
      button.style.backgroundColor = primaryBtnColor;
      button.style.color = primaryBtnTextColor;
    });
  
    // Style secondary buttons
    const secondaryButton = document.querySelectorAll('.secondary-button');
    secondaryButton.forEach(button => {
      button.style.backgroundColor = secondaryBtnColor;
      button.style.color = secondaryBtnTextColor;
    });
  }, [bgColor, fontFamily, navColor, primaryBtnColor, primaryBtnTextColor, secondaryBtnColor, secondaryBtnTextColor]);


  return (
    <HashRouter>
        {isCustomizerLoaded ? (
          <div style={{ backgroundColor: `#${bgColor}`, fontFamily: fontFamily}}>
            <Navbar style={{ backgroundColor: navColor }} />
            <Links primaryButtonsStyle={{ backgroundColor: primaryBtnColor, color: primaryBtnTextColor }}
            secondaryButtonsStyle={{ backgroundColor: secondaryBtnColor, color: secondaryBtnTextColor }}/>
            <Footer />
          </div>
        ) : (
          <p>Loading</p>
        )}
    </HashRouter>
  );

}

export default App
