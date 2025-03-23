import React, {useState, useEffect} from 'react';
import {Book, Code, Database, Server, Layout, Box, Cpu, MemoryStick, Clock, GitBranch, Globe} from 'lucide-react';
import javaFundamentalsJsonEn from '../../../data/java/java-fundamentals.json';
import javaFundamentalsJsonFr from '../../../data/java/java-fundamentals-fr.json';
import CodeBlock from '../../../components/CodeBlock';

const JavaFundamentalsPage = () => {
    // Language state (get from localStorage or default to English)
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('javaFundamentalsLanguage') || 'en';
    });

    // Set the correct JSON data based on language
    const [javaFundamentalsJson, setJavaFundamentalsJson] = useState(
        language === 'en' ? javaFundamentalsJsonEn : javaFundamentalsJsonFr
    );

    // State for active section
    const [activeSection, setActiveSection] = useState(0);

    // Update JSON data when language changes
    useEffect(() => {
        setJavaFundamentalsJson(language === 'en' ? javaFundamentalsJsonEn : javaFundamentalsJsonFr);
        localStorage.setItem('javaFundamentalsLanguage', language);
    }, [language]);

    // Language Selector Component
    const LanguageSelector = () => (
        <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-cyan-400"/>
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
                <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 text-sm ${
                        language === 'en'
                            ? 'bg-cyan-500/30 text-cyan-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1.5 text-sm ${
                        language === 'fr'
                            ? 'bg-cyan-500/30 text-cyan-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    Français
                </button>
            </div>
        </div>
    );

    // Icons mapping for sections
    const sectionIcons = {
        'Core Concepts': <Cpu className="w-5 h-5"/>,
        'Data Types and Variables': <Database className="w-5 h-5"/>,
        'Object-Oriented Programming Concepts': <Box className="w-5 h-5"/>,
        'Memory Management': <MemoryStick className="w-5 h-5"/>,
        'Constructors': <Layout className="w-5 h-5"/>,
        'Keywords and Modifiers': <Code className="w-5 h-5"/>,
        'Classes and Interfaces': <Server className="w-5 h-5"/>,
        'String Handling': <Book className="w-5 h-5"/>,
        'Packages and Access Control': <GitBranch className="w-5 h-5"/>,
        'Best Practices': <Clock className="w-5 h-5"/>,
        'Interview Focus Areas': <Box className="w-5 h-5"/>,
        'Interview FAQs': <Book className="w-5 h-5"/>
    };

    // TabNavigation component
    const TabNavigation = () => (
        <div className="relative overflow-x-auto mb-8">
            <div
                className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
            <div
                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

            <div className="flex space-x-2 py-2 px-8 overflow-x-auto custom-scrollbar">
                {javaFundamentalsJson.sections.map((section, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSection(index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors shadow-lg ${
                            activeSection === index
                                ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 shadow-cyan-500/50'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 shadow-gray-900/50'
                        }`}
                    >
                        {sectionIcons[section.title] || <Box className="w-5 h-5"/>}
                        {section.title}
                    </button>
                ))}
            </div>
        </div>
    );

    // Render Core Concepts section
    const renderCoreConceptsSection = (section) => {
        <div className="space-y-8">
            <p className="text-gray-300">This section will render classes and interfaces information</p>
        </div>
    };

    // Render Data Types and Variables section
    const renderDataTypesSection = (section) => {
        <div className="space-y-8">
            <p className="text-gray-300">This section will render classes and interfaces information</p>
        </div>
    };

    // Render Object-Oriented Programming section
    const renderOOPSection = (section) => {
        <div className="space-y-8">
            <p className="text-gray-300">This section will render classes and interfaces information</p>
        </div>
    };

    // Render Memory Management section
    const renderMemoryManagementSection = (section) => {
        <div className="space-y-8">
            <p className="text-gray-300">This section will render classes and interfaces information</p>
        </div>
    };

    const renderConstructorsSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render constructors information</p>
        </div>
    );

    const renderKeywordsModifiersSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render keywords and modifiers</p>
        </div>
    );

    const renderClassesInterfacesSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render classes and interfaces information</p>
        </div>
    );

    const renderStringHandlingSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render string handling information</p>
        </div>
    );

    const renderPackagesAccessSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render packages and access control information</p>
        </div>
    );

    const renderBestPracticesSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render best practices</p>
        </div>
    );

    const renderInterviewFocusSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render interview focus areas</p>
        </div>
    );

    const renderInterviewFAQsSection = (section) => (
        <div className="space-y-8">
            <p className="text-gray-300">This section will render interview FAQs</p>
        </div>
    );

    // Helper function to render a subsection
    const renderSubsection = (subsection) => (
        <div key={subsection.title} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">{subsection.title}</h3>
            {subsection.content && <p className="text-gray-300 mb-4">{subsection.content}</p>}

            {/* We'll implement rendering for specific subsection types later */}
            <p className="text-gray-400 italic">Content rendering to be implemented</p>
        </div>
    );

    // Render the current active section
    const renderActiveSection = () => {
        const section = javaFundamentalsJson.sections[activeSection];

        // Choose the appropriate rendering function based on section title
        switch (section.title) {
            case 'Core Concepts':
                return renderCoreConceptsSection(section);
            case 'Data Types and Variables':
                return renderDataTypesSection(section);
            case 'Object-Oriented Programming Concepts':
                return renderOOPSection(section);
            case 'Memory Management':
                return renderMemoryManagementSection(section);
            case 'Constructors':
                return renderConstructorsSection(section);
            case 'Keywords and Modifiers':
                return renderKeywordsModifiersSection(section);
            case 'Classes and Interfaces':
                return renderClassesInterfacesSection(section);
            case 'String Handling':
                return renderStringHandlingSection(section);
            case 'Packages and Access Control':
                return renderPackagesAccessSection(section);
            case 'Best Practices':
                return renderBestPracticesSection(section);
            case 'Interview Focus Areas':
                return renderInterviewFocusSection(section);
            case 'Interview FAQs':
                return renderInterviewFAQsSection(section);
            default:
                // Simple fallback rendering
                return (
                    <div className="space-y-6">
                        {section.subsections && section.subsections.map(renderSubsection)}
                    </div>
                );
        }
    };

    // Reusable card component for consistent styling
    const Card = ({title, children, icon, className = ""}) => (
        <div className={`bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 ${className}`}>
            {title && (
                <div className="flex items-center gap-3 mb-4">
                    {icon && <div className="p-2 bg-gray-700/50 rounded-lg">{icon}</div>}
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );

    // Helper components for rendering common patterns
    const CodeExample = ({code, title}) => (
        <div className="mt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">{title || "Example"}:</h4>
            <CodeBlock code={code}/>
        </div>
    );

    const List = ({items, title, className = ""}) => (
        <div className="mt-4">
            {title && <h4 className="text-sm font-medium text-gray-400 mb-2">{title}:</h4>}
            <ul className={`list-disc list-inside space-y-1 ${className}`}>
                {items.map((item, idx) => (
                    <li key={idx} className="text-gray-300">{item}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector/>

            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{javaFundamentalsJson.title}</h1>
                <p className="text-gray-300">
                    Comprehensive guide to Java programming fundamentals
                </p>
            </div>

            {/* Navigation */}
            <TabNavigation/>

            {/* Content */}
            <div className="space-y-8">
                {renderActiveSection()}
            </div>
        </div>
    );
};

export default JavaFundamentalsPage;
