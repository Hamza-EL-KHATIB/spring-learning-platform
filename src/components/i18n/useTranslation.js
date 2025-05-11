import { useLanguage } from '../LanguageContext';
import translations from './translations';

// A hook to get translations
const useTranslation = () => {
    const { language } = useLanguage();

    // Function to get a translated string by key
    const t = (key, fallback = '') => {
        const keys = key.split('.');

        let translation = translations[language];
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                translation = null;
                break;
            }
        }

        return translation || fallback || key;
    };

    return { t, language };
};

export default useTranslation;