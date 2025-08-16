import React from 'react';

interface Screen5Props {
  onBack: () => void;
}

const Screen5: React.FC<Screen5Props> = ({ onBack }) => {
  return (
    <div 
      className="screen slide-in-right"
      style={{
        backgroundImage: 'url(screen_5.png)',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        // width: '100vw',
        // height: '100vh',
        // backgroundColor: '#efbb63'
      }}
    >
      {/* Back button */}
      <button className="back-button" onClick={onBack}>
        <svg viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      {/* No kids image */}
      <div className="no-kids-image-container">
        <img 
          src="no_kids.png" 
          alt="No kids" 
          // style={{
          //   maxWidth: '150px',
          //   maxHeight: '150px',
          //   objectFit: 'contain'
          // }}
          className="no-kids-image"
        />
      </div>

      {/* This is the final screen - no additional buttons needed */}
    </div>
  );
};

export default Screen5; 