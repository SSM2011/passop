import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [strength, setStrength] = useState(null);

  const generatePassword = () => {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let characters = lowerCase;
    if (includeUppercase) characters += upperCase;
    if (includeNumbers) characters += numbers;
    if (includeSpecial) characters += special;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);

    const result = zxcvbn(generatedPassword);
    setStrength(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  const renderStrengthIndicator = () => {
    if (!strength) return null;

    const levels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const colors = ['red', 'orange', 'yellow', 'lightgreen', 'green'];

    return (
      <div className="mt-4">
        <p className="font-semibold text-gray-800">
          Strength: <span className={`text-${colors[strength.score]}-600`}>{levels[strength.score]}</span>
        </p>
        <div className="w-full bg-gray-300 rounded h-2 mt-2">
          <div
            style={{ width: `${(strength.score + 1) * 20}%` }}
            className={`h-2 rounded bg-${colors[strength.score]}-500`}
          ></div>
        </div>
        {strength.feedback.suggestions.length > 0 && (
          <ul className="mt-2 text-sm text-gray-600">
            {strength.feedback.suggestions.map((suggestion, index) => (
              <li key={index}>- {suggestion}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full transform transition duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Password Generator</h1>

        <div className="space-y-6">
          {/* Length Slider */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password Length: {length}</label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                className="accent-indigo-500"
              />
              <span className="text-gray-700">Include Uppercase</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="accent-indigo-500"
              />
              <span className="text-gray-700">Include Numbers</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeSpecial}
                onChange={() => setIncludeSpecial(!includeSpecial)}
                className="accent-indigo-500"
              />
              <span className="text-gray-700">Include Special Characters</span>
            </label>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="bg-indigo-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-200"
          >
            Generate Password
          </button>
        </div>

        {/* Display Password */}
        {password && (
          <div className="mt-6">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-gray-800"
            />
            <button
              onClick={copyToClipboard}
              className="bg-green-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            >
              Copy to Clipboard
            </button>
            {renderStrengthIndicator()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
