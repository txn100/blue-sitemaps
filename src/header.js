import React from 'react';
import Select from 'react-select';
import image from './img.png';

const headerStyle = {
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '2em',
};

const searchContainerStyle = {
  display: 'flex',
  flexDirection: 'column', // Stack elements vertically
  alignItems: 'center',
  marginTop: '20px',
};

const searchInputStyle = {
  padding: '10px',
  borderRadius: '20px',
  border: '1px solid #d0d0d0',
  outline: 'none',
  width: '400px', // Increased width
  marginBottom: '10px', // Space between search box and selects
};

const multiSelectCustomStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '35px', // Adjusted height for a better appearance
    fontSize: '14px', // Smaller font size
    boxShadow: 'none',
    width: '400px', // Adjust width as needed
    border: '1px solid #d0d0d0',
    borderRadius: '20px', // Rounder edges
    padding: '2px 8px', // Adjusted padding
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#a0a0a0'
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px',
    overflow: 'hidden', // Preventing text overflow
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '35px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#007bff' : 'white',
    padding: '10px 20px',
    fontSize: '10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: state.isSelected ? '#0056b3' : '#f0f0f0'
    }
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '10px', // Rounder tags in the selection
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3',
      color: 'white',
    }
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#007bff',
    '&:hover': {
      color: '#0056b3'
    }
  }),
};


const Header = ({ appName, onSearch, websites, onWebsiteSelect, articleTypes, onTypeSelect }) => {
  const websiteOptions = websites.map(site => ({ value: site, label: site }));

  return (
    <header style={headerStyle}>
      {appName}
      <div style={searchContainerStyle}>
        <input 
          type="text" 
          placeholder="Search articles..." 
          style={searchInputStyle}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Select
          styles={multiSelectCustomStyles}
          options={websiteOptions}
          isMulti
          onChange={onWebsiteSelect}
          placeholder="Select Websites"
        />
        <Select
          styles={multiSelectCustomStyles}
          options={articleTypes}
          isMulti
          onChange={onTypeSelect}
          placeholder="Select Types"
        />
      </div>
    </header>
  );
};    

export default Header;