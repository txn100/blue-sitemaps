import React from 'react';

// Enhanced styled component for the LinkCard
const StyledLinkCard = {
  position: 'relative', // Needed to position the badge absolutely within the card
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
  margin: '10px auto',
  backgroundColor: '#ffffff',
  border: '1px solid #d0d0d0',
  borderRadius: '10px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  cursor: 'pointer',
  width: '300px',
  height: '300px',
  boxSizing: 'border-box',
  textAlign: 'center',
};

const StyledTitle = {
  fontWeight: 'bold',
  marginBottom: '15px',
};

const StyledContent = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

// Style for the badge
const StyledBadge = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  backgroundColor: '#007bff', // Example badge color - change as needed
  color: 'white',
  padding: '5px 10px',
  borderRadius: '20px',
  fontSize: '0.75em',
};

const LinkCard = ({ title, content, link, badge, website }) => {
  // Event handler for clicking on the card
  const handleClick = () => {
    window.location.href = link;
  };

  return (
    <div style={StyledLinkCard} onClick={handleClick}>
      <div style={StyledTitle}>{title}</div>
      <div style={StyledContent}>{content}</div>
      <div style={StyledContent}>{website}</div>
      {badge && <div style={StyledBadge}>{badge}</div>} 
    </div>
  );
};

export default LinkCard;
