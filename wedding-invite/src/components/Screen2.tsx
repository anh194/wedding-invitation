import React from 'react';

interface Screen2Props {
  onNext: () => void;
  onBack: () => void;
}

const Screen2: React.FC<Screen2Props> = ({ onNext, onBack }) => {
  const handleMapClick = () => {
    const mapUrl = "https://maps.app.goo.gl/tEmFt1ZZaJfNY5LA8";
    window.open(mapUrl, '_blank');
  };

  return (
    <div 
      className="screen slide-in-right"
      style={{
        backgroundImage: 'url(screen_2_without_button.png)',
      }}
    >
      {/* Back button */}
      <button className="back-button" onClick={onBack}>
        <svg viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      {/* Clickable map image positioned at center */}
      <div className="map-button-position">
        <img 
          src="map.png" 
          alt="Map location" 
          onClick={handleMapClick}
          // style={{
          //   cursor: 'pointer',
          //   width: '8vw',
          //   height: '6vh',
          //   maxWidth: '250px',
          //   maxHeight: '150px',
          //   minWidth: '30px',
          //   minHeight: '10px',
          //   transition: 'transform 0.2s ease',
          // }}
          className="map"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      {/* Next button positioned below map button */}
      <div className="button-position-screen-2">
        <button 
          className="wedding-button" 
          onClick={onNext}
              style={{
                backgroundImage: 'url(button.png)'
              }}
            >
          Next
        </button>
      </div>
    </div>
  );
};

export default Screen2; 