import React, { useState, useEffect } from 'react';
import { List, Clock, Layers, Database, GitBranch, Globe } from 'lucide-react';
import collectionsJsonEn from '../../../data/java/collections.json';
import collectionsJsonFr from '../../../data/java/collections-fr.json';

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

const CollectionsPage = () => {
    // Get the language preference from localStorage if available, otherwise default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('collectionsPageLanguage') || 'en';
    });

    const [collectionsJson, setCollectionsJson] = useState(
        language === 'en' ? collectionsJsonEn : collectionsJsonFr
    );

    const [activeTab, setActiveTab] = useState('list');

    // Change the language and save the preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('collectionsPageLanguage', lang);
    };

    useEffect(() => {
        // Update content based on selected language
        setCollectionsJson(language === 'en' ? collectionsJsonEn : collectionsJsonFr);
    }, [language]);

    const tabs = [
        { id: 'list', title: 'List', icon: <List className="w-4 h-4" /> },
        { id: 'set', title: 'Set', icon: <Layers className="w-4 h-4" /> },
        { id: 'queue', title: 'Queue', icon: <GitBranch className="w-4 h-4" /> },
        { id: 'map', title: 'Map', icon: <Database className="w-4 h-4" /> },
        {
            id: 'performance',
            title: language === 'en' ? 'Performance' : 'Performance',
            icon: <Clock className="w-4 h-4" />
        }
    ];

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === tab.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    {tab.icon}
                    {tab.title}
                </button>
            ))}
        </div>
    );

    const renderImplementation = (impl) => (
        <div key={impl.name} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{impl.name}</h4>
            <ul className="list-disc list-inside space-y-1">
                {impl.characteristics.map((char, idx) => (
                    <li key={idx} className="text-gray-300">{char}</li>
                ))}
            </ul>
        </div>
    );

    const renderCollectionType = (type) => (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">{type.type}</h3>
            <p className="text-gray-300 mb-4">{type.description}</p>
            <div className="space-y-4">
                {type.implementations.map((impl) => renderImplementation(impl))}
            </div>
        </div>
    );

    const renderPerformanceTable = (performanceData) => (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left p-3 text-gray-400">
                            {language === 'en' ? 'Collection Type' : 'Type de Collection'}
                        </th>
                        <th className="text-left p-3 text-gray-400">
                            {language === 'en' ? 'Access Time' : 'Temps d\'accès'}
                        </th>
                        <th className="text-left p-3 text-gray-400">
                            {language === 'en' ? 'Insert Time' : 'Temps d\'insertion'}
                        </th>
                        <th className="text-left p-3 text-gray-400">
                            {language === 'en' ? 'Delete Time' : 'Temps de suppression'}
                        </th>
                        <th className="text-left p-3 text-gray-400">
                            {language === 'en' ? 'Memory Overhead' : 'Surcharge mémoire'}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {performanceData.map((data) => (
                        <tr key={data.type} className="border-b border-gray-700/50">
                            <td className="p-3 text-purple-300 font-medium">{data.type}</td>
                            <td className="p-3 text-gray-300">{data.accessTime}</td>
                            <td className="p-3 text-gray-300">{data.insertTime}</td>
                            <td className="p-3 text-gray-300">{data.deleteTime}</td>
                            <td className="p-3 text-gray-300">{data.memoryOverhead}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderContent = () => {
        const types = collectionsJson.topics[0].types;

        switch (activeTab) {
            case 'list':
                return renderCollectionType(types.find(t => t.type === 'List'));
            case 'set':
                return renderCollectionType(types.find(t => t.type === 'Set'));
            case 'queue':
                return renderCollectionType(types.find(t => t.type === 'Queue'));
            case 'map':
                return renderCollectionType(types.find(t => t.type === 'Map'));
            case 'performance':
                return (
                    <div>
                        <p className="text-gray-300 mb-6">{collectionsJson.topics[1].description}</p>
                        {renderPerformanceTable(collectionsJson.topics[1].performance)}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
            />

            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{collectionsJson.title}</h1>
                <p className="text-gray-300">{collectionsJson.topics[0].description}</p>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">{renderContent()}</div>
        </div>
    );
};

export default CollectionsPage;