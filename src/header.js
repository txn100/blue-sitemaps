import React from 'react';
import image from './img.png';

const headerStyle = {
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '2em',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
};

const searchInputStyle = {
  padding: '10px',
  margin: '0 20px',
  borderRadius: '5px',
  border: '1px solid #d0d0d0',
};

const Header = ({ appName, onSearch, websites, onWebsiteSelect }) => {
  return (
    <header style={headerStyle}>
      {appName}
      <input 
        type="text" 
        placeholder="Search articles..." 
        style={searchInputStyle}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select onChange={(e) => onWebsiteSelect(e.target.value)}>
        <option value="">Select a Website</option>
        {websites.map((website, index) => (
          <option key={index} value={website}>{website}</option>
        ))}
      </select>
    </header>
  );
};

export default Header;
