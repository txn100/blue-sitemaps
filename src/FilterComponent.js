import React from 'react';

// Styles for the FilterComponent
const filterListStyle = {
  margin: '20px 0',
  padding: '0',
  listStyle: 'none',
};

const filterItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  cursor: 'pointer',
};

const filterIconStyle = {
  marginRight: '10px',
};

const badgeStyle = {
  marginLeft: 'auto',
  padding: '5px 10px',
  backgroundColor: '#e0e0e0',
  borderRadius: '20px',
  fontSize: '0.8em',
};

// Mock data for the filters
const filters = [
  { name: 'powerbi', count: 1, icon: '📘' },
  { name: 'Fabric', icon: '📊' },
  { name: 'Synapse', icon: '🌐' },
  { name: 'D365', icon: '⚡' },
  { name: 'Dataverse', count: 1, icon: '📘' },
  { name: 'Python', icon: '📊' },
  { name: 'git', icon: '🌐' },
  { name: 'Cloud', icon: '⚡' },
  { name: 'Certification', icon: '⚡' },
  { name: 'Unfiltered', icon: '' }
  // ... add all other filters here
];

const FilterComponent = ({ onFilterSelect }) => {
  return (
    <ul style={filterListStyle}>
      {filters.map((filter, index) => (
        <li 
          key={index} 
          style={filterItemStyle}
          onClick={() => onFilterSelect(filter.name)}
        >
          <span style={filterIconStyle}>{filter.icon}</span>
          {filter.name}
          {filter.count && <span style={badgeStyle}>{filter.count}</span>}
        </li>
      ))}
    </ul>
  );
};

export default FilterComponent;
