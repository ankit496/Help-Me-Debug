import { useState } from 'react';
import { LANGUAGE_VERSIONS } from './constants';  // Assuming this is the correct path
import { fetchData } from './constants';

const available_languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
    // Handle language change
    const handleLanguageChange = (e) => {
        onSelect(e.target.value);  // Pass the selected language to the parent
    };

    return (
        <div className="flex items-center space-x-4 mr-4">
            <label htmlFor="language" className="text-sm">
                Language:
            </label>
            <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="bg-blue-700 text-white p-2 rounded"
            >
                {available_languages.map(([code_language, version], index) => (
                    <option
                        key={index}
                        value={code_language}
                        className={`p-2 ${language === code_language ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-300'}`}
                    >
                        {code_language} ({version || 'v1'})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
