import React, { useState } from 'react';

const TranslationForm = ({ onSubmit }) => {
  const [translation, setTranslation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(translation);
    setTranslation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        required
      ></textarea>
      <button type="submit">Submit Translation</button>
    </form>
  );
};

export default TranslationForm;
