import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const GlobalLanguageSelector = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-purple-400" />
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
                <button
                    onClick={() => toggleLanguage('en')}
                    className={`px-3 py-1.5 text-sm ${
                        language === 'en'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => toggleLanguage('fr')}
                    className={`px-3 py-1.5 text-sm ${
                        language === 'fr'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    Français
                </button>
            </div>
        </div>
    );
};

export default GlobalLanguageSelector;

