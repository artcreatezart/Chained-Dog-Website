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
    // Apply the bgColor to the body
    document.body.style.backgroundColor = `#${ bgColor }`

    // Apply the font to the body
    if (fontFamily === 'Arial') {
      document.body.style.fontFamily = `'Arial', sans-serif`;
    }
    if (fontFamily === 'Roboto') {
      document.body.style.fontFamily = `'Roboto', sans-serif`;
    }
    if (fontFamily === 'Poppins') {
      document.body.style.fontFamily = `'Poppins', sans-serif`;
    }
    if (fontFamily === 'Rubik') {
      document.body.style.fontFamily = `'Rubik', sans-serif`;
    }
    if (fontFamily === 'DM Sans') {
      document.body.style.fontFamily = `'DM Sans', sans-serif`;
    }
    if (fontFamily === 'Delius Swash Caps') {
      document.body.style.fontFamily = `'Delius Swash Caps', sans-serif`;
    }

    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
      p.style.fontFamily = fontFamily ? `'${fontFamily}', sans-serif` : '';
    });

    document.querySelector('nav').style.backgroundColor = navColor;
    document.querySelector('footer').style.backgroundColor = navColor;
    const eventHomeContainer = document.querySelectorAll('.event-home-container');
    eventHomeContainer.forEach(div => {
      div.style.backgroundColor = navColor;
    });
    const menuOpen = document.querySelectorAll('.menu-open');
    menuOpen.forEach(div => {
      div.style.backgroundColor = navColor;
    });
    const primaryButtons = document.querySelectorAll('.primary-button');
    primaryButtons.forEach(button => {
      button.style.backgroundColor = primaryBtnColor;
      button.style.color = primaryBtnTextColor;
    });
    const secondaryButtons = document.querySelectorAll('.secondary-button');
    secondaryButtons.forEach(button => {
      button.style.backgroundColor = secondaryBtnColor;
      button.style.color = secondaryBtnTextColor;
    });

  }, [ bgColor, fontFamily, navColor, primaryBtnColor, primaryBtnTextColor, secondaryBtnColor, secondaryBtnTextColor ])


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
