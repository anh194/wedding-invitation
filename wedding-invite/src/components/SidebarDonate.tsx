import React, { useState, useRef, useEffect } from 'react';

const SidebarDonate: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the QR code
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSidebarClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        right: '0px',
        top: '28%',
        transform: 'translateY(-50%)',
        zIndex: 1500,
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      {!isExpanded ? (
        // Sidebar button
        <img
          src="sidebar_donate.png"
          alt="Donate"
          onClick={handleSidebarClick}
          style={{
            width: '12vw',
            height: '35vh',
            maxWidth: '200px',
            maxHeight: '600px',
            objectFit: 'contain',
            transition: 'all 0.3s ease',
            filter: 'brightness(1)',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      ) : (
        // QR Code
        <img
          src="qr_code_donate.png"
          alt="Donation QR Code"
          onClick={handleSidebarClick}
          style={{
            width: '25vw',
            height: '25vw',
            maxWidth: '700px',
            maxHeight: '700px',
            objectFit: 'contain',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            marginRight: '10px'
          }}
        />
      )}
    </div>
  );
};

export default SidebarDonate;