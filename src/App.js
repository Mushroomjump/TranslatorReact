import React, { useState, useEffect } from 'react';
import OriginalText from './OriginalText';
import TranslationForm from './TranslationForm';

const App = () => {
  const [item, setItem] = useState(null);

  // Fetch the current item on component mount
  useEffect(() => {
    fetchCurrentItem();
  }, []);

  const fetchCurrentItem = async () => {
    const response = await fetch('/api/items/current');
    const data = await response.json();
    setItem(data);
  };

  const fetchNextItem = async () => {
    const response = await fetch(`/api/items/next/${item._id}`);
    const data = await response.json();
    setItem(data);
  };

  const fetchPrevItem = async () => {
    const response = await fetch(`/api/items/prev/${item._id}`);
    const data = await response.json();
    setItem(data);
  };

  const handleTranslationSubmit = async (translation) => {
    await fetch('/api/items/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalId: item._id, translation }),
    });
    // Fetch the next item after submission
    fetchNextItem();
  };

  return (
    <div>
      {item && (
        <>
          <OriginalText text={item.originalText} />
          <TranslationForm onSubmit={handleTranslationSubmit} />
          <button onClick={fetchPrevItem}>Previous</button>
          <button onClick={fetchNextItem}>Next</button>
        </>
      )}
    </div>
  );
};

export default App;
