import React from 'react';
import image from './img.png'
// Style for the header component
const headerStyle = {

  backgroundImage: `url(${image})`, // Update with your image path
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '400px', // Adjust the height as needed
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white', // Assuming the text color should be white to stand out
  fontSize: '2em', // Large text for the app name
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Text shadow for better readability
};

const Header = ({ appName }) => {
  return (
    <header style={headerStyle}>
      {appName}
    </header>
  );
};

export default Header;
