import React from 'react';

const StyledLinkCard = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '15px',
  margin: '10px auto',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  cursor: 'pointer',
  width: '300px',
  height: '200px',
  boxSizing: 'border-box',
  textAlign: 'left',
  transition: 'transform 0.3s ease-in-out',
};

const StyledTitle = {
  fontWeight: 'bold',
  fontSize: '1.1em',
  marginBottom: '5px',
};

const StyledContent = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '5px',
};

const StyledWebsite = {
  color: '#007bff',
  fontSize: '0.9em',
  marginBottom: '10px',
};

const YouTubeBadge = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  width: '100px', // Adjust size as needed
  height: '30px', // Adjust size as needed
};

const getBorderColorByType = (type) => {
  switch (type) {
    case 'youtube':
      return 'red';
    case 'blog':
      return 'blue';
    default:
      return '#d0d0d0'; // Default border color
  }
};

const getDaysAgo = (date) => {
  const today = new Date();
  const linkDate = new Date(date);
  const differenceInTime = today.getTime() - linkDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
  return differenceInDays === 0 ? 'today' :
         differenceInDays === 1 ? '1 day ago' :
         `${differenceInDays} days ago`;
};

const LinkCard = ({ title, content, link, website, date, type }) => {
  const handleClick = () => {
    window.location.href = link;
  };

  const daysAgo = getDaysAgo(date);

  const dynamicStyle = {
    ...StyledLinkCard,
    border: `1px solid ${getBorderColorByType(type)}`,
  };

  return (
    <div 
      style={dynamicStyle} 
      onClick={handleClick}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={StyledTitle}>{title}</div>
      <div style={StyledContent}>{content}</div>
      <div style={StyledWebsite}>{website}</div>
      {type === 'youtube' && 
        <img 
          src="https://img.shields.io/badge/YouTube-%23FF0000.svg?&logo=YouTube&logoColor=white" 
          alt="YouTube" 
          style={YouTubeBadge} 
        />}
      <div style={{ fontSize: '0.8em', color: '#888888', marginTop: '5px' }}>
        {daysAgo}
      </div>
    </div>
  );
};

export default LinkCard;
