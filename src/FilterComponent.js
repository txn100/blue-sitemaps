import React, { useState, useEffect, useMemo } from 'react';

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
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortedFilters, setSortedFilters] = useState([]);

  useEffect(() => {
    const calculateFilterCount = filter => {
      const articleMatchesKeywords = (article, keywords) => {
        if (keywords.length === 0) return true;
        return keywords.some(keyword => article.cured_name.toLowerCase().includes(keyword.toLowerCase()));
      };

      return articles.filter(article => articleMatchesKeywords(article, filter.keywords)).length;
    };

    const filtersWithCount = filters.map(filter => ({
      ...filter,
      count: calculateFilterCount(filter)
    }));

    const sorted = filtersWithCount
      .filter(filter => filter.name !== 'All')
      .sort((a, b) => b.count - a.count);

    setSortedFilters([filtersWithCount.find(filter => filter.name === 'All'), ...sorted]);
  }, [articles]);

  const handleFilterClick = filterName => {
    setSelectedFilter(filterName);
    onFilterSelect(filters.find(f => f.name === filterName)?.keywords || []);
  };

  return (
    <ul style={filterListStyle}>
      {sortedFilters.map((filter, index) => (
        <li
          key={index}
          style={filterItemStyle(filter.name === selectedFilter)}
          onClick={() => handleFilterClick(filter.name)}
        >
          <span style={filterIconStyle}>{filter.icon}</span>
          {filter.name}
          <span style={badgeStyle}>{filter.count}</span>
        </li>
      ))}
    </ul>
  );
};

export default FilterComponent;