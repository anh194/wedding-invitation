import React from 'react';
import { FormData } from '../App';

interface Screen3Props {
  onNext: () => void;
  onBack: () => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const Screen3: React.FC<Screen3Props> = ({ onNext, onBack, formData, updateFormData }) => {
  const [showError, setShowError] = React.useState(false);

  const handleNext = () => {
    if (formData.name.trim() && formData.team) {
      setShowError(false);
      onNext();
    } else {
      setShowError(true);
      // Hide error after 3 seconds
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div 
      className="screen slide-in-right"
      style={{
        backgroundImage: 'url(screen_3_without_button.png)',
      }}
    >
      {/* Back button */}
      <button className="back-button" onClick={onBack}>
        <svg viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      {/* Floating error notification */}
      {showError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#ffebee',
          border: '2px solid #f44336',
          borderRadius: '8px',
          padding: '15px 20px',
          color: '#d32f2f',
          fontSize: '20px',
          fontFamily: 'Pixellari, Courier New, monospace',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-in',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxWidth: '300px'
        }}>
          Please enter your name and select a team!
        </div>
      )}

      {/* Form container positioned at 2/3 from top, horizontally centered */}
      <div style={{ position: 'absolute', top: '46%', left: '49%', transform: 'translate(-50%, -50%)' }}>
        <div className="form-container">
          {/* Name input with custom background */}
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            style={{
              backgroundImage: 'url(name_box.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              border: 'none',
              width: '900px',
              height: '180px',
              fontSize: '16px',
              fontFamily: 'Pixellari, Courier New, monospace',
              color: '#5a3b1e',
              textAlign: 'center',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
          />

          {/* Team selection */}
          <div className="button-group">
            <button
              className={`wedding-button ${formData.team === 'BRIDE' ? 'selected' : ''}`}
              onClick={() => updateFormData({ team: 'BRIDE' })}
              style={{
                backgroundImage: 'url(button.png)'
              }}
            >
              Bride
            </button>
            <button
              className={`wedding-button ${formData.team === 'GROOM' ? 'selected' : ''}`}
              onClick={() => updateFormData({ team: 'GROOM' })}
              style={{
                backgroundImage: 'url(button.png)'
              }}
            >
              Groom
            </button>
          </div>

          {/* Next button */}
          <button 
            className="wedding-button" 
            onClick={handleNext}
            style={{
              backgroundImage: 'url(button.png)'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Screen3; 