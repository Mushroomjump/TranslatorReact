import React, { useState, useEffect } from 'react';
import OriginalText from './OriginalText';
import TranslationForm from './TranslationForm';

const App = () => {
  const [originalText, setOriginalText] = useState('');

  useEffect(() => {
    // Fetch the original text
    const fetchOriginalText = async () => {
      const response = await fetch('/api/originals');
      const data = await response.json();
      setOriginalText(data.text); // Adjust according to your API response
    };

    fetchOriginalText();
  }, []);

  const handleTranslationSubmit = async (translation) => {
    // Submit translation
    await fetch('/api/translations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ translation }),
    });
    // Optionally, fetch the next original text here
  };

  return (
    <div>
      <OriginalText text={originalText} />
      <TranslationForm onSubmit={handleTranslationSubmit} />
    </div>
  );
};

export default App;

