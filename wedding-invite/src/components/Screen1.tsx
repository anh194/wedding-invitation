import React, { useState, useEffect } from 'react';

interface Screen1Props {
  onNext: () => void;
  onBack: () => void;
}

interface Firework {
  id: number;
  left: string;
  top: string;
  opacity: number;
}

const Screen1: React.FC<Screen1Props> = ({ onNext, onBack }) => {
  const [backgroundImage, setBackgroundImage] = useState('screen_1_without_button_and_bride_groom.png');
  const [bridePosition, setBridePosition] = useState({ left: '10%', bottom: '2%' });
  const [groomPosition, setGroomPosition] = useState({ right: '10%', bottom: '2%' });
  const [animationComplete, setAnimationComplete] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    // Preload both background images
    const img1 = new Image();
    const img2 = new Image();
    img1.src = 'screen_1_without_button_and_bride_groom.png';
    img2.src = 'screen_1_without_button.png';

    // Start animation after a short delay
    const timer = setTimeout(() => {
      // Animate bride and groom moving horizontally to center, staying at bottom
      // Position them so their edges touch at the center
      setBridePosition({ left: '40%', bottom: '2%' });
      setGroomPosition({ right: '40%', bottom: '2%' });
    }, 1000);

    // Fireworks and background transition
    const backgroundTimer = setTimeout(() => {
      // Create fireworks at random locations - 18 total
      const newFireworks: Firework[] = Array.from({ length: 36 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 80 + 10}%`, // Random position between 10% and 90%
        top: `${Math.random() * 60 + 20}%`,  // Random position between 20% and 80%
        opacity: 0 // Start invisible
      }));
      setFireworks(newFireworks);

      // Gradually appear fireworks in groups
      const appearGroups = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // 12 groups of 3 fireworks each
      appearGroups.forEach((group, groupIndex) => {
        setTimeout(() => {
          setFireworks(prev => prev.map((fw, index) => 
            index >= group * 3 && index < (group + 1) * 3 
              ? { ...fw, opacity: 1 }
              : fw
          ));
        }, groupIndex * 120); // 120ms delay between each group (was 180ms)
      });

      // After all fireworks have appeared, start fading them out gradually
      setTimeout(() => {
        // Gradually fade out fireworks in reverse groups
        const fadeGroups = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]; // Reverse order
        fadeGroups.forEach((group, groupIndex) => {
          setTimeout(() => {
            setFireworks(prev => prev.map((fw, index) => 
              index >= group * 3 && index < (group + 1) * 3 
                ? { ...fw, opacity: 0 }
                : fw
            ));
          }, groupIndex * 120); // 120ms delay between each group (was 180ms)
        });

        // After all fireworks fade out, start background transition
        setTimeout(() => {
          setBackgroundOpacity(0);
          
          // After fade out, switch background and fade in
          setTimeout(() => {
            setBackgroundImage('screen_1_without_button.png');
            setBackgroundOpacity(1);
            setAnimationComplete(true);
          }, 300); // Wait for fade out to complete
        }, 1440); // Wait for all fireworks to fade out (12 groups * 120ms)
      }, 1440); // Wait for all fireworks to appear (12 groups * 120ms)
    }, 2160);

    return () => {
      clearTimeout(timer);
      clearTimeout(backgroundTimer);
    };
  }, []);

  return (
    <div 
      className="screen slide-in-right"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        opacity: backgroundOpacity,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {/* Back button */}
      <button className="back-button" onClick={onBack}>
        <svg viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      {/* Fireworks */}
      {fireworks.map(firework => (
        <img
          key={firework.id}
          src="firework.png"
          alt="Firework"
          className="firework-image"
          style={{
            position: 'absolute',
            left: firework.left,
            top: firework.top,
            transform: 'translate(-50%, -50%)',
            opacity: firework.opacity,
            transition: 'opacity 0.5s ease-in-out',
            zIndex: 15
          }}
        />
      ))}

      {/* Bride image */}
      {!animationComplete && (
        <img 
          src="bride.png" 
          alt="Bride" 
          className="bride-image"
          style={{
            position: 'absolute',
            left: bridePosition.left,
            bottom: bridePosition.bottom,
            transform: 'translateX(-50%)',
            transition: 'all 2s ease-in-out',
            zIndex: 5
          }}
        />
      )}

      {/* Groom image */}
      {!animationComplete && (
        <img 
          src="groom.png" 
          alt="Groom" 
          className="groom-image"
          style={{
            position: 'absolute',
            right: groomPosition.right,
            bottom: groomPosition.bottom,
            transform: 'translateX(50%)',
            transition: 'all 2s ease-in-out',
            zIndex: 5
          }}
        />
      )}

      {/* Next button with responsive positioning */}
      {animationComplete && (
        <div className="button-position-screen-1">
          <button 
            className="wedding-button" 
            onClick={onNext}
            style={{
              backgroundImage: 'url(button.png)'
            }}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default Screen1; 