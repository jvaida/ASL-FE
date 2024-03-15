import React, { useState } from 'react';

const Test1 = () => {
  const [input, setInput] = useState('');

  const handleSpeechInput = () => {
    console.log(input);
    
  };

  return (
    <div>
      <h2>Test 1</h2>
      {/* Show ASL hand signs and ASL to text conversion */}
    </div>
  );
};

export default Test1;
