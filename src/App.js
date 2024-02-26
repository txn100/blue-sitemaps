import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import LinkCard from './LinkCard';
import Header from './header';
import FilterComponent from './FilterComponent';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentFilterKeywords, setCurrentFilterKeywords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWebsite, setSelectedWebsite] = useState('');
  const [uniqueWebsites, setUniqueWebsites] = useState([]);

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
          const articlesWithDates = results.data.map(article => ({
            ...article,
            date: new Date(article.lastmod),
            cured_name: article.cured_name || 'No Title'
          }));
          setArticles(articlesWithDates);
          const websites = [...new Set(articlesWithDates.map(article => article.website))].filter(Boolean);
          setUniqueWebsites(websites);
        }
      });
    };
    fetchCSV();
  }, []);

  useEffect(() => {
    const filteredArticles = articles.filter(article => {
      const articleLower = article.cured_name.toLowerCase();
      return (currentFilterKeywords.length === 0 || currentFilterKeywords.some(keyword => articleLower.includes(keyword.toLowerCase())))
        && (!searchQuery || articleLower.includes(searchQuery.toLowerCase()))
        && (!selectedWebsite || article.website === selectedWebsite);
    }).sort((a, b) => sortOrder === 'asc' ? a.date - b.date : b.date - a.date);

    setDisplayedArticles(filteredArticles);
  }, [sortOrder, articles, currentFilterKeywords, searchQuery, selectedWebsite]);

  const handleFilterSelection = (keywords) => {
    setCurrentFilterKeywords(keywords);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
  };

  return (
    <>
      <Header 
        appName="Real-Time Articles" 
        onSearch={handleSearch} 
        websites={uniqueWebsites} 
        onWebsiteSelect={handleWebsiteSelect}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '20%', minWidth: '200px' }}>
          <FilterComponent articles={articles} onFilterSelect={handleFilterSelection} />
          <div style={{ padding: '0 20px' }}>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {displayedArticles.map((article, index) => (
            <LinkCard 
              key={index}
              title={article.cured_name}
              content={article.lastmod ? new Date(article.lastmod).toLocaleDateString() : 'No Date'}
              link={article.loc}
              website={article.website}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
