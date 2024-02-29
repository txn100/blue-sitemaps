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
  const [selectedWebsites, setSelectedWebsites] = useState([]); // Changed to array
  const [uniqueWebsites, setUniqueWebsites] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]); // Changed to array
  const [uniqueTypes, setUniqueTypes] = useState([]);


  const websiteDescription = 
  [{ name: 'www.kevinrchant.com', description: 'Kevin Le King'},
  { name: 'thomas-leblanc.com', description:  'Thomas Le bLANC' },
  { name: 'www.oliviertravers.com', description: 'test'},
  { name: 'data-mozart.com', description: 'test'},
  { name: 'www.sqlbi.com', description: 'test'},
  { name: 'en.brunner.bi', description: 'test'},
  { name: 'pragmaticworks.com', description: 'test' },
  { name: 'data-marc.com', description: 'test' },
  { name: 'www.data-travelling.com', description: 'test' },
  { name: 'datasavyy.com', description: 'test'},
  { name: 'www.thatbluecloud.com', description: 'test'},
  { name: 'GuyInACube', description: 'test'},
  { name: 'HowToPowerBI', description: 'test' },
  { name: 'ClubPowerBI', description: 'test'},
 
]; 
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/sitemap.csv');
        const reader = response.body.getReader();
        let receivedLength = 0;
        let chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          receivedLength += value.length;
        }
        const chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (let chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }
        const resultString = new TextDecoder("utf-8").decode(chunksAll);
        Papa.parse(resultString, {

          encoding: 'utf-8',
          header: true,
          complete: (results) => {
            const articlesWithDates = results.data.map(article => ({
              ...article,
              date: new Date(article.lastmod || ''),
              cured_name: article.cured_name || 'No Title',
              website: article.website || 'No Website'
            }));
            setArticles(articlesWithDates);
            const websites = [...new Set(articlesWithDates.map(article => article.website))].filter(Boolean);
            setUniqueWebsites(websites);

            const types = [...new Set(articlesWithDates.map(article => article.type))].filter(Boolean);
            setUniqueTypes(types.map(type => ({ value: type, label: type })));
          }
        });
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };
    fetchCSV();
  }, []);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };


  useEffect(() => {
    const filteredArticles = articles.filter(article => {
      const articleLower = article.cured_name.toLowerCase();
      const matchesKeywords = currentFilterKeywords.length === 0 || currentFilterKeywords.some(keyword => articleLower.includes(keyword.toLowerCase()));
      const matchesSearchQuery = !searchQuery || articleLower.includes(searchQuery.toLowerCase());
      const matchesWebsites = selectedWebsites.length === 0 || selectedWebsites.includes(article.website);
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.includes(article.type);

      return matchesKeywords && matchesSearchQuery && matchesWebsites && matchesTypes;
    }).sort((a, b) => sortOrder === 'asc' ? a.date - b.date : b.date - a.date);

    setDisplayedArticles(filteredArticles);
  }, [sortOrder, articles, currentFilterKeywords, searchQuery, selectedWebsites, selectedTypes]);

  const handleFilterSelection = (keywords) => {
    setCurrentFilterKeywords(keywords);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleWebsiteSelect = (websites) => {
    setSelectedWebsites(websites.map(website => website.value));
  };


  /*function important */
  
  function decodeHtml(html) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  }
  

  const handleTypeSelect = (types) => {
    setSelectedTypes(types.map(type => type.value));
  };

  const containerStyle = {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: displayedArticles.length === 1 ? 'flex-start' : 'space-between',
    alignContent: 'flex-start',
    // Add other necessary styles
  };


  const getWebsiteDescription = (websiteName) => {
    const matchingWebsite = websiteDescription.find(w => w.name === websiteName);
    return matchingWebsite ? matchingWebsite.description : 'No Description';
  };
  
  return (
    <>
      <Header 
     
        onSearch={handleSearch} 
        websites={uniqueWebsites} 
        onWebsiteSelect={handleWebsiteSelect}
        articleTypes={uniqueTypes}
        onTypeSelect={handleTypeSelect}
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
        <div style={containerStyle}>
        {displayedArticles.map((article, index) => (
          <LinkCard 
            key={index}
            title={decodeHtml(capitalizeFirstLetter(article.cured_name))} //actually displays weird caracters, and capitalizes the first letter
            content={article.lastmod ? new Date(article.lastmod).toLocaleDateString() : 'No Date'}
            link={article.loc}
            website={article.website}
            date={article.date}
            type={article.type}
            description={getWebsiteDescription(article.website)} // Add this line to pass the type
          />
))}
        </div>
      </div>
    </>
  );
};

export default App;
