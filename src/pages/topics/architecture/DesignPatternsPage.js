import React, { useState, useEffect } from 'react';
import designPatternsJsonEn from '../../../data/architecture/design-patterns.json';
import designPatternsJsonFr from '../../../data/architecture/design-patterns-fr.json';
import {
    Box,
    Code,
    Layers,
    Network,
    PackageOpen,
    Settings,
    CheckCircle2,
    XCircle,
    Combine,
    Globe
} from 'lucide-react';
import CodeBlock from '../../../components/CodeBlock';
import visitorImg from '../../../data/images/Visitor.png'
import singletonImg from '../../../data/images/Singleton.png'
import factoryMethodImg from '../../../data/images/Factory Method.png'
import abstractFactoryImg from '../../../data/images/Abstract Factory.png'
import builderImg from '../../../data/images/Builder.png'
import prototypeImg from '../../../data/images/Prototype.png'
import adapterImg from '../../../data/images/Adapter.png'
import bridgeImg from '../../../data/images/Bridge.png'
import compositeImg from '../../../data/images/Composite.png'
import decoratorImg from '../../../data/images/Decorator.png'
import facadeImg from '../../../data/images/Facade.png'
import flyweightImg from '../../../data/images/Flyweight.png'
import proxyImg from '../../../data/images/Proxy.png'
import observerImg from '../../../data/images/Observer.png'
import strategyImg from '../../../data/images/Strategy.png'
import templateMethodImg from '../../../data/images/Template Method.png'
import stateImg from '../../../data/images/State.png'

const patternImages = {
    'Visitor': visitorImg,
    'Singleton': singletonImg,
    'Factory Method': factoryMethodImg,
    'Abstract Factory': abstractFactoryImg,
    'Builder': builderImg,
    'Prototype': prototypeImg,
    'Adapter': adapterImg,
    'Bridge': bridgeImg,
    'Composite': compositeImg,
    'Decorator': decoratorImg,
    'Facade': facadeImg,
    'Flyweight': flyweightImg,
    'Proxy': proxyImg,
    'Observer': observerImg,
    'Strategy': strategyImg,
    'Template Method': templateMethodImg,
    'State': stateImg
};

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

const PatternCard = ({ pattern, language }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">{pattern.name}</h3>
                            <p className="text-gray-300">{pattern.description}</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group flex-shrink-0 hover:scale-105 transition-transform duration-200"
                        >
                            <div className="relative">
                                <img
                                    src={patternImages[pattern.name]}
                                    alt={`${pattern.name} diagram`}
                                    className="w-32 h-32 object-contain bg-gray-900/50 rounded-lg p-2 group-hover:ring-2 ring-cyan-500/50"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 rounded-lg transition-colors">
                                    <svg
                                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">
                            {language === 'en' ? 'Use Cases' : 'Cas d\'utilisation'}
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                            {pattern.use_cases.map((useCase, idx) => (
                                <li key={idx} className="text-gray-300">{useCase}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Implementation */}
                    {pattern.implementation && (
                        <div>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                <Code className="w-4 h-4" />
                                {isExpanded
                                    ? (language === 'en' ? 'Hide Implementation' : 'Masquer l\'implémentation')
                                    : (language === 'en' ? 'View Implementation' : 'Voir l\'implémentation')}
                            </button>
                        </div>
                    )}
                </div>

                {/* Expanded Implementation Section */}
                {isExpanded && pattern.implementation && (
                    <div className="border-t border-gray-700/50">
                        <div className="p-6">
                            <CodeBlock code={pattern.implementation.code} />

                            {pattern.considerations && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                                        {language === 'en' ? 'Considerations' : 'Considérations'}
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {pattern.considerations && pattern.considerations.map((consideration, idx) => (
                                            <li key={idx} className="text-gray-300">{consideration}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <PatternModal
                pattern={pattern}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                image={patternImages[pattern.name]}
                language={language}
            />
        </>
    );
};

const PatternModal = ({ pattern, isOpen, onClose, image, language }) => {
    // Move useEffect outside of the conditional
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
            />

            {/* Modal Container with max-height and scrolling */}
            <div className="relative w-full max-w-4xl mx-4 my-6">
                {/* Content wrapper with scrolling */}
                <div className="relative bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
                    {/* Close button - now sticky */}
                    <div className="sticky top-0 right-0 pt-4 pr-4 z-50 flex justify-end bg-gray-800">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700/50"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6 pt-0">
                        {/* Header */}
                        <h2 className="text-2xl font-bold text-white mb-4">{pattern.name}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image Section */}
                            <div className="space-y-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <img
                                        src={image}
                                        alt={`${pattern.name} diagram`}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-6">
                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        {language === 'en' ? 'Description' : 'Description'}
                                    </h3>
                                    <p className="text-gray-400">{pattern.description}</p>
                                </div>

                                {/* Use Cases */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        {language === 'en' ? 'Use Cases' : 'Cas d\'utilisation'}
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {pattern.use_cases.map((useCase, idx) => (
                                            <li key={idx} className="text-gray-400">{useCase}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Considerations */}
                                {pattern.considerations && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-300 mb-2">
                                            {language === 'en' ? 'Considerations' : 'Considérations'}
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            {pattern.considerations.map((consideration, idx) => (
                                                <li key={idx} className="text-gray-400">{consideration}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Implementation Section */}
                        {pattern.implementation && (
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-300 mb-2">
                                    {language === 'en' ? 'Implementation' : 'Implémentation'}
                                </h3>
                                <CodeBlock code={pattern.implementation.code} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BestPracticesSection = ({ bestPractices, language }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-medium text-white">
                        {language === 'en' ? 'Selection Criteria' : 'Critères de sélection'}
                    </h3>
                </div>
                <ul className="space-y-2">
                    {bestPractices.selection_criteria.map((criteria, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                            {criteria}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-medium text-white">
                        {language === 'en' ? 'Implementation Guidelines' : 'Directives d\'implémentation'}
                    </h3>
                </div>
                <ul className="space-y-2">
                    {bestPractices.implementation_guidelines.map((guideline, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                            {guideline}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-medium text-white">
                        {language === 'en' ? 'Common Pitfalls' : 'Pièges courants'}
                    </h3>
                </div>
                <ul className="space-y-2">
                    {bestPractices.common_pitfalls.map((pitfall, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {pitfall}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const PatternRelationships = ({ relationships, language }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Combine className="w-5 h-5 text-purple-400" />
            {language === 'en' ? 'Commonly Combined Patterns' : 'Patrons fréquemment combinés'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relationships.commonly_combined.map((combo, idx) => (
                <div key={idx} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Network className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300">{combo.patterns.join(" + ")}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{combo.use_case}</p>
                </div>
            ))}
        </div>
    </div>
);

const DesignPatternsPage = () => {
    // Get the language preference from localStorage if available, otherwise default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('designPatternsLanguage') || 'en';
    });

    const [designPatternsJson, setDesignPatternsJson] = useState(
        language === 'en' ? designPatternsJsonEn : designPatternsJsonFr
    );

    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = designPatternsJson.categories;

    // Change the language and save the preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('designPatternsLanguage', lang);
    };

    useEffect(() => {
        // Update content based on selected language
        setDesignPatternsJson(language === 'en' ? designPatternsJsonEn : designPatternsJsonFr);
    }, [language]);

    const getCategoryIcon = (categoryName) => {
        const lowerName = categoryName.toLowerCase();
        // Handle both English and French category names
        if (lowerName.includes('creational') || lowerName.includes('création')) {
            return <PackageOpen className="w-5 h-5" />;
        } else if (lowerName.includes('structural') || lowerName.includes('structur')) {
            return <Layers className="w-5 h-5" />;
        } else if (lowerName.includes('behavioral') || lowerName.includes('comportement')) {
            return <Network className="w-5 h-5" />;
        } else {
            return <Box className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
            />

            {/* Header Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{designPatternsJson.title}</h1>
                <p className="text-gray-300">{designPatternsJson.description}</p>
            </div>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-4">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === 'all'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    {language === 'en' ? 'All Patterns' : 'Tous les patrons'}
                </button>
                {categories.map((category, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedCategory === category.name
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                        }`}
                    >
                        {getCategoryIcon(category.name)}
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Patterns Grid */}
            <div className="space-y-8 mb-12">
                {categories.map((category, idx) => (
                    (selectedCategory === 'all' || selectedCategory === category.name) && (
                        <div key={idx}>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                {getCategoryIcon(category.name)}
                                {category.name}
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {category.patterns.map((pattern, patternIdx) => (
                                    <PatternCard
                                        key={patternIdx}
                                        pattern={pattern}
                                        language={language}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>

            {/* Best Practices Section */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {language === 'en'
                        ? 'Best Practices & Relationships'
                        : 'Bonnes pratiques & Relations'}
                </h2>
                <BestPracticesSection
                    bestPractices={designPatternsJson.best_practices}
                    language={language}
                />
                <PatternRelationships
                    relationships={designPatternsJson.relationships}
                    language={language}
                />
            </div>
        </div>
    );
};

export default DesignPatternsPage;