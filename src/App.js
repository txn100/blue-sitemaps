import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import LinkCard from './LinkCard';
import Header from './header';
import FilterComponent from './FilterComponent';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentFilter, setCurrentFilter] = useState('Unfiltered');

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch('/sitemap.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          const articlesWithDates = results.data.map((article) => ({
            ...article,
            date: new Date(article.lastmod)
          }));
          setArticles(articlesWithDates);
        }
      });
    };

    fetchCSV();
  }, []);

  useEffect(() => {
    // Filter and sort logic
    const sortedArticles = [...articles].sort((a, b) => sortOrder === 'asc' ? a.date - b.date : b.date - a.date);
    
    if (currentFilter === 'Unfiltered') {
      setFilteredArticles(sortedArticles);
    } else {
      const filtered = sortedArticles.filter(article => 
        article.cured_name && article.cured_name.toLowerCase().includes(currentFilter.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [sortOrder, articles, currentFilter]);

  const handleFilterSelection = (filterName) => {
    setCurrentFilter(filterName);
  };

  return (
    <>
      <Header appName="Real-Time Articles" />

      <div style={{ display: 'flex' }}>
        <div style={{ width: '20%', minWidth: '200px' }}>
          <FilterComponent onFilterSelect={handleFilterSelection} />
          <div style={{ padding: '0 20px' }}>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {filteredArticles.map((article, index) => (
            <LinkCard 
              key={index}
              title={article.cured_name || 'No Title'}
              content={article.lastmod ? new Date(article.lastmod).toLocaleDateString() : 'No Date'}
              link={article.loc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;

