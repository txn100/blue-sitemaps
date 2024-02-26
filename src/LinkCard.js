import React from 'react';

const StyledLinkCard = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '15px', // Reduced padding
  margin: '10px auto',
  backgroundColor: '#ffffff',
  border: '1px solid #d0d0d0',
  borderRadius: '10px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  cursor: 'pointer',
  width: '300px',
  height: '200', // Adjusted height
  boxSizing: 'border-box',
  textAlign: 'left',
  transition: 'transform 0.3s ease-in-out',
};

const StyledTitle = {
  fontWeight: 'bold',
  fontSize: '1.1em', // Slightly reduced font size
  marginBottom: '5px', // Reduced margin
};

const StyledContent = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '5px', // Reduced margin
};

const StyledWebsite = {
  color: '#007bff',
  fontSize: '0.9em',
  marginBottom: '10px', // Reduced space before badge
};

const StyledBadge = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '20px',
  fontSize: '0.75em',
};

const getDaysAgo = (date) => {
  const today = new Date();
  const linkDate = new Date(date);
  const differenceInTime = today.getTime() - linkDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
  if (differenceInDays === 0) {
    return 'today';
  } else if (differenceInDays === 1) {
    return '1 day ago';
  } else {
    return `${differenceInDays} days ago`;
  }
};

const LinkCard = ({ title, content, link, badge, website, date }) => {
  const handleClick = () => {
    window.location.href = link;
  };

  const daysAgo = getDaysAgo(date);

  return (
    <div 
      style={StyledLinkCard} 
      onClick={handleClick}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={StyledTitle}>{title}</div>
      <div style={StyledContent}>{content}</div>
      <div style={StyledWebsite}>{website}</div>
      {badge && <div style={StyledBadge}>{badge}</div>}
      <div style={{ fontSize: '0.8em', color: '#888888', marginTop: '5px' }}>
        {daysAgo}
      </div>
    </div>
  );
};

export default LinkCard;