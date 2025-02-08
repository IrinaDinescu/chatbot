import React, { useState } from 'react';
import styles from './InputSection.module.css';

export const InputSection = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      console.log('Message sent:', inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className={styles['bottom-container']}>
      <input
        type="text"
        className={styles['input-area']}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Please pick an option."
      />
      <button
        className={styles['send-button']}
        onClick={handleSubmit}
        disabled={!inputValue.trim()}>
        Send
      </button>
    </div>
  );
};
