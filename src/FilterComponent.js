import React, { useState } from 'react';

// Styles for the FilterComponent
const filterListStyle = {
  margin: '20px 0',
  padding: '0',
  listStyle: 'none',
};

const filterItemStyle = (isSelected) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
  boxShadow: isSelected ? '0px 0px 8px rgba(0, 0, 0, 0.2)' : 'none',
});

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

// Updated filters with keyword variations
const filters = [
  { name: 'All', keywords: [], icon: '' },
  { name: 'PowerBI', keywords: ['power bi', 'powerbi', 'Power BI'], icon: '📘' },
  { name: 'Fabric', keywords: ['Fabric', 'fabric'], icon: '📊' },
  { name: 'Synapse', keywords: ['Synapse', 'synapse'], icon: '🌐' },
  { name: 'D365', keywords: ['D365', 'd365'], icon: '⚡' },
  { name: 'Dataverse', keywords: ['Dataverse', 'dataverse'], icon: '📘' },
  { name: 'Python', keywords: ['Python', 'python'], icon: '📊' },
  { name: 'Git', keywords: ['git', 'Git'], icon: '🌐' },
  { name: 'Cloud', keywords: ['Cloud', 'cloud'], icon: '☁️' },
  { name: 'Certification', keywords: ['Certification', 'certification'], icon: '⚡' },
 
];

const FilterComponent = ({ articles, onFilterSelect }) => {
  const [selectedFilter, setSelectedFilter] = useState('Unfiltered');

  const articleMatchesKeywords = (article, keywords) => {
    if (keywords.length === 0) return true; // Match all for Unfiltered
    const articleLower = article.cured_name.toLowerCase();
    return keywords.some(keyword => articleLower.includes(keyword.toLowerCase()));
  };

  const calculateFilterCount = (filterKeywords) => {
    return articles.filter(article => 
      article.cured_name && articleMatchesKeywords(article, filterKeywords)
    ).length;
  };

  const handleFilterClick = (filterName) => {
    setSelectedFilter(filterName);
    const filterKeywords = filters.find(f => f.name === filterName)?.keywords || [];
    onFilterSelect(filterKeywords);
  };

  return (
    <ul style={filterListStyle}>
      {filters.map((filter, index) => {
        const count = calculateFilterCount(filter.keywords);
        const isSelected = filter.name === selectedFilter;

        return (
          <li 
            key={index} 
            style={filterItemStyle(isSelected)}
            onClick={() => handleFilterClick(filter.name)}
          >
            <span style={filterIconStyle}>{filter.icon}</span>
            {filter.name}
            <span style={badgeStyle}>{count}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default FilterComponent;
