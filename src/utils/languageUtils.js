import { useLanguage } from '../components/LanguageContext';

// Custom hook for loading localized content
export const useLocalizedContent = (englishContent, frenchContent) => {
    const { language } = useLanguage();

    return language === 'fr' ? frenchContent : englishContent;
};

// Function to get localized string from a dictionary
export const getLocalizedString = (key, translations, language) => {
    if (!translations || !translations[language] || !translations[language][key]) {
        return key; // Fallback to key if translation not found
    }
    return translations[language][key];
};

// Function to get a string in the current language
export const useLocalizedString = (key, translations) => {
    const { language } = useLanguage();
    return getLocalizedString(key, translations, language);
};