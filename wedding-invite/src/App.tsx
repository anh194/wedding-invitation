import React, { useState } from 'react';
import './App.css';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';
import Screen4 from './components/Screen4';
import Screen5 from './components/Screen5';
import SidebarDonate from './components/SidebarDonate';

export interface FormData {
  name: string;
  team: 'BRIDE' | 'GROOM' | '';
  plus_one: boolean;
  after_party: boolean;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    team: '',
    plus_one: false,
    after_party: false
  });

  const handleNext = () => {
    setCurrentScreen(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentScreen(prev => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async () => {
    try {
      // Use Vercel API proxy in production, localhost for development
      const backendUrl = process.env.NODE_ENV === 'production'
        ? '/api/guests'  // This will call your Vercel function
        : 'http://localhost:3001/api/guests';
        
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Form submitted successfully');
        setShowSubmitError(false);
        handleNext();
      } else {
        console.error('Form submission failed');
        setShowSubmitError(true);
        setTimeout(() => setShowSubmitError(false), 5000);
        handleNext()
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowSubmitError(true);
      setTimeout(() => setShowSubmitError(false), 5000);
      handleNext()
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="app">
      {/* Global submit error notification */}
      {showSubmitError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#ffebee',
          border: '2px solid #f44336',
          borderRadius: '8px',
          padding: '15px 20px',
          color: '#d32f2f',
          fontSize: '18px',
          fontFamily: 'Pixellari, Courier New, monospace',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-in',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 2000,
          maxWidth: '350px'
        }}>
          Failed to submit. Please contact the Admin.
        </div>
      )}

      {/* Sidebar donate button - appears on all screens */}
      <SidebarDonate />
      
      <div className="screen-container">
        {currentScreen === 1 && (
          <Screen1 onNext={handleNext} onBack={handleBack} />
        )}
        {currentScreen === 2 && (
          <Screen2 onNext={handleNext} onBack={handleBack} />
        )}
        {currentScreen === 3 && (
          <Screen3 
            onNext={handleNext} 
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentScreen === 4 && (
          <Screen4 
            onNext={handleFormSubmit} 
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentScreen === 5 && (
          <Screen5 onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

export default App; 