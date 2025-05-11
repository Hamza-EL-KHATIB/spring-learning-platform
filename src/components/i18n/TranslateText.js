import React from 'react';
import { useLanguage } from '../LanguageContext';
import translations from './translations';

// A component that renders text in the current language
const TranslateText = ({ textKey, fallback = '' }) => {
    const { language } = useLanguage();

    // Parse the nested key path (e.g., "nav.home")
    const keys = textKey.split('.');

    // Find the translation by traversing the nested objects
    let translation = translations[language];
    for (const key of keys) {
        if (translation && translation[key]) {
            translation = translation[key];
        } else {
            translation = null;
            break;
        }
    }

    return <>{translation || fallback || textKey}</>;
};

export default TranslateText;