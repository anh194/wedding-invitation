import React from 'react';
import { FormData } from '../App';

interface Screen4Props {
  onNext: () => void;
  onBack: () => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const Screen4: React.FC<Screen4Props> = ({ onNext, onBack, formData, updateFormData }) => {
  const [showError, setShowError] = React.useState(false);

  const handleSubmit = () => {
    // Check if both plus_one and after_party have been selected (are boolean values)
    if (typeof formData.plus_one === 'boolean' && typeof formData.after_party === 'boolean') {
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
        backgroundImage: 'url(screen_4_without_button.png)',
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
          Please answer both questions!
        </div>
      )}

      {/* Form container positioned at center */}
      <div className="screen4-form">
        <div className="form-container">
          {/* Plus One selection */}
          <div className="button-group">
            <button
              className={`wedding-button plus-one-yes-button ${formData.plus_one ? 'selected' : ''}`}
              onClick={() => updateFormData({ plus_one: true })}
              style={{
                backgroundImage: 'url(button.png)'
              }}
            >
              Yes
            </button>
            <button
              className={`wedding-button plus-one-no-button ${!formData.plus_one ? 'selected' : ''}`}
              onClick={() => updateFormData({ plus_one: false })}
              style={{
                backgroundImage: 'url(button.png)'
              }}
            >
              No
            </button>
          </div>

          {/* After Party selection */}
          <div className="button-group">
            <button
              className={`wedding-button after_party_yes-button ${formData.after_party ? 'selected' : ''}`}
              onClick={() => updateFormData({ after_party: true })}
              style={{
                backgroundImage: 'url(button.png)'
              }}
            >
              Yes
            </button>
            <button
              className={`wedding-button after_party_no-button ${!formData.after_party ? 'selected' : ''}`}
              onClick={() => updateFormData({ after_party: false })}
              style={{
                backgroundImage: 'url(button.png)'
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
      {/* Submit button */}
      <div className="submit-container">
      <button 
        className="wedding-button" 
        onClick={handleSubmit}
        style={{
          backgroundImage: 'url(button.png)'
        }}
      >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Screen4; 