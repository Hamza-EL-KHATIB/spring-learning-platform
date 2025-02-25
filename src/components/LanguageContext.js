import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
    // Default to English, but check localStorage for user preference
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        return savedLanguage || 'en';
    });

    // Save language preference to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
    }, [language]);

    // Function to toggle language
    const toggleLanguage = (lang) => {
        setLanguage(lang);
    };

    // Value to be provided to consumers
    const value = {
        language,
        toggleLanguage,
        isEnglish: language === 'en',
        isFrench: language === 'fr'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook for using the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;