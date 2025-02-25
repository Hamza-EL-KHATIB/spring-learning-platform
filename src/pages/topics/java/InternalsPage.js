import React, { useState, useEffect } from 'react';
import internalsJsonEn from '../../../data/java/internals.json';
import internalsJsonFr from '../../../data/java/internals-fr.json';
import CodeBlock from '../../../components/CodeBlock';
import { Book, Terminal, Layers, Globe } from 'lucide-react';

// Simple Language Selector Component
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-purple-400" />
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
                <button
                    onClick={() => onLanguageChange('en')}
                    className={`px-3 py-1.5 text-sm ${
                        currentLanguage === 'en'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => onLanguageChange('fr')}
                    className={`px-3 py-1.5 text-sm ${
                        currentLanguage === 'fr'
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

const InternalsPage = () => {
    // Get the language preference from localStorage if available, otherwise default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('internalsPageLanguage') || 'en';
    });

    const [internalsJson, setInternalsJson] = useState(language === 'en' ? internalsJsonEn : internalsJsonFr);

    // Change the language and save the preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('internalsPageLanguage', lang);
    };

    useEffect(() => {
        // Update content based on selected language
        setInternalsJson(language === 'en' ? internalsJsonEn : internalsJsonFr);
    }, [language]);

    // Render sections for Memory Management (Stack and Heap)
    const renderMemorySections = (sections) => (
        sections.map((section, idx) => (
            <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">{section.type}</h3>
                <ul className="list-disc list-inside text-gray-300 mb-4">
                    {section.characteristics.map((characteristic, idx) => (
                        <li key={idx}>{characteristic}</li>
                    ))}
                </ul>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{section.example.title}</h4>
                    <CodeBlock code={section.example.code} />
                </div>
            </div>
        ))
    );

    // Render OOP concepts
    const renderOOPConcepts = (concepts) => (
        concepts.map((concept, idx) => (
            <div key={idx} className="mb-8 bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">{concept.name}</h3>
                <p className="text-gray-300">{concept.description}</p>
            </div>
        ))
    );

    // Render Java Platform Components
    const renderPlatformComponents = (components) => (
        components.map((component, idx) => (
            <div key={idx} className="mb-8 bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">{component.name}</h3>
                <p className="text-gray-300">{component.description}</p>
            </div>
        ))
    );

    // Render Java Tools
    const renderJavaTools = (tools) => (
        tools.map((tool, idx) => (
            <div key={idx} className="mb-8 bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{tool.name}</h4>
                <p className="text-gray-300">{tool.description}</p>
            </div>
        ))
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
            />

            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{internalsJson.title}</h1>
            </div>

            {/* Memory Management */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Layers className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{internalsJson.topics[0].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{internalsJson.topics[0].description}</p>
                {renderMemorySections(internalsJson.topics[0].sections)}
            </div>

            {/* OOP Concepts */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Book className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{internalsJson.topics[1].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{internalsJson.topics[1].description}</p>
                {renderOOPConcepts(internalsJson.topics[1].concepts)}
            </div>

            {/* Java Platform Components */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Terminal className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{internalsJson.topics[2].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{internalsJson.topics[2].description}</p>
                {renderPlatformComponents(internalsJson.topics[2].components)}
                {renderJavaTools(internalsJson.topics[2].tools)}
            </div>
        </div>
    );
};

export default InternalsPage;