import React, { useState, useEffect } from 'react';
import {
    Box, Database, GitMerge, Settings, Shield, Code, Layers, Globe,
    BookOpen, FileText, CheckCircle, List, AlertTriangle, Terminal,
    Code2, Cpu, ArrowRight
} from 'lucide-react';
import coreConceptsEn from '../../../data/spring/core-concepts.json';
import coreConceptsFr from '../../../data/spring/core-concepts-fr.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Language Selector Component
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

const CorePage = () => {
    // Get the language preference from localStorage or default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('corePageLanguage') || 'en';
    });

    // State for the content based on language
    const [coreConcepts, setCoreConcepts] = useState(language === 'en' ? coreConceptsEn : coreConceptsFr);

    // Active tab state - default to first topic
    const [activeTopic, setActiveTopic] = useState(() => {
        return coreConcepts.topics?.[0]?.title || '';
    });

    // Change the language and save the preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('corePageLanguage', lang);
    };

    useEffect(() => {
        // Update content based on selected language
        const newContent = language === 'en' ? coreConceptsEn : coreConceptsFr;
        setCoreConcepts(newContent);

        // Ensure active topic exists in the new content
        if (!newContent.topics.some(t => t.title === activeTopic)) {
            setActiveTopic(newContent.topics?.[0]?.title || '');
        }
    }, [language]);

    // Helper function to get icon for a topic
    const getTopicIcon = (topicTitle) => {
        switch (topicTitle) {
            case 'IoC':
            case 'DependencyInjection':
                return <Box className="w-5 h-5" />;
            case 'BeanLifecycle':
                return <GitMerge className="w-5 h-5" />;
            case 'BeanScopes':
                return <Layers className="w-5 h-5" />;
            case 'SpringConfiguration':
            case 'ComponentScanning':
                return <Settings className="w-5 h-5" />;
            case 'AOP':
                return <Shield className="w-5 h-5" />;
            case 'ApplicationContext':
            case 'SpringBootVsFramework':
                return <Database className="w-5 h-5" />;
            case 'DependencyResolution':
            case 'CircularDependencies':
                return <Code className="w-5 h-5" />;
            case 'SpringExceptions':
                return <AlertTriangle className="w-5 h-5" />;
            default:
                return <Code className="w-5 h-5" />;
        }
    };

    // Navigation tabs component with enhanced styling
    const TopicNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-3 p-1 bg-gray-800/50 rounded-xl border border-gray-700/50">
            {coreConcepts.topics?.map((topic) => (
                <button
                    key={topic.title}
                    onClick={() => setActiveTopic(topic.title)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                        activeTopic === topic.title
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-900/20 transform scale-105'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-gray-300'
                    }`}
                >
                    {getTopicIcon(topic.title)}
                    {topic.title}
                </button>
            ))}
        </div>
    );

    // Component to render code blocks with enhanced styling
    const CodeBlock = ({ code, title }) => {
        if (!code) return null;

        return (
            <div className="bg-gray-900/70 rounded-lg border border-gray-700/70 overflow-hidden">
                {title && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700/70">
                        <Code2 className="w-4 h-4 text-pink-400" />
                        <span className="text-sm font-medium text-gray-300">{title}</span>
                    </div>
                )}
                <SyntaxHighlighter
                    language="java"
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        borderRadius: title ? '0 0 0.5rem 0.5rem' : '0.5rem',
                        padding: '1rem',
                        backgroundColor: '#1e1e2f',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        );
    };

    // Get section icon based on title
    const getSectionIcon = (title) => {
        const lowerTitle = title?.toLowerCase() || '';

        if (lowerTitle.includes('definition')) return <BookOpen className="w-5 h-5 text-purple-400" />;
        if (lowerTitle.includes('description')) return <FileText className="w-5 h-5 text-cyan-400" />;
        if (lowerTitle.includes('benefit')) return <CheckCircle className="w-5 h-5 text-green-400" />;
        if (lowerTitle.includes('example')) return <Terminal className="w-5 h-5 text-pink-400" />;
        if (lowerTitle.includes('code')) return <Code2 className="w-5 h-5 text-pink-400" />;
        if (lowerTitle.includes('types') || lowerTitle.includes('type')) return <Layers className="w-5 h-5 text-yellow-400" />;
        if (lowerTitle.includes('phase') || lowerTitle.includes('lifecycle')) return <GitMerge className="w-5 h-5 text-blue-400" />;
        if (lowerTitle.includes('keys') || lowerTitle.includes('features')) return <Cpu className="w-5 h-5 text-teal-400" />;

        return <List className="w-5 h-5 text-gray-400" />;
    };

    // Styled content card
    const ContentCard = ({ title, children, className = "", contentType = "default" }) => {
        // Get color scheme based on content type
        let colorClasses = "bg-gray-800/70 border-gray-700/50";

        switch(contentType) {
            case "definition":
                colorClasses = "bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/30";
                break;
            case "example":
            case "code":
                colorClasses = "bg-gradient-to-br from-pink-900/20 to-pink-800/10 border-pink-500/30";
                break;
            case "benefits":
            case "advantages":
                colorClasses = "bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/30";
                break;
            case "types":
                colorClasses = "bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-500/30";
                break;
            case "features":
            case "properties":
                colorClasses = "bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/30";
                break;
            case "drawbacks":
            case "disadvantages":
                colorClasses = "bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-500/30";
                break;
        }

        if (!title && !children) return null;

        const icon = getSectionIcon(title);
        const derivedContentType =
            title?.toLowerCase().includes('definition') ? 'definition' :
                title?.toLowerCase().includes('benefit') || title?.toLowerCase().includes('advantages') ? 'benefits' :
                    title?.toLowerCase().includes('example') || title?.toLowerCase().includes('code') ? 'example' :
                        title?.toLowerCase().includes('type') ? 'types' :
                            title?.toLowerCase().includes('feature') || title?.toLowerCase().includes('properties') ? 'features' :
                                title?.toLowerCase().includes('drawback') || title?.toLowerCase().includes('disadvantages') ? 'drawbacks' :
                                    contentType;

        return (
            <div className={`rounded-lg p-5 border backdrop-blur-sm transition-all ${colorClasses} ${className} hover:shadow-lg`}>
                {title && (
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gray-800/70 rounded-lg">
                            {icon}
                        </div>
                        <h4 className="text-lg font-semibold text-white">{title}</h4>
                    </div>
                )}
                <div className={title ? "ml-11" : ""}>{children}</div>
            </div>
        );
    };

    // Renders a list item with a styled bullet
    const StyledListItem = ({ children, type = "default" }) => {
        let bulletColor = "bg-gray-400";

        switch(type) {
            case "benefits":
            case "advantages":
                bulletColor = "bg-green-400";
                break;
            case "drawbacks":
            case "disadvantages":
                bulletColor = "bg-red-400";
                break;
            case "features":
                bulletColor = "bg-blue-400";
                break;
            case "examples":
                bulletColor = "bg-pink-400";
                break;
        }

        return (
            <li className="flex items-start gap-2 text-gray-300 mb-2">
                <div className={`w-1.5 h-1.5 ${bulletColor} rounded-full mt-2`}></div>
                <span>{children}</span>
            </li>
        );
    };

    // Special handler for code examples
    const renderCodeExamples = (codeExamples) => {
        if (!codeExamples || !codeExamples['multi-content']) return null;

        return (
            <div className="space-y-4">
                {codeExamples['multi-content'].map((example, idx) => (
                    <div key={idx} className="mb-4">
                        <CodeBlock
                            code={example['simple-content']}
                            title={example.title}
                        />
                    </div>
                ))}
            </div>
        );
    };

    // Recursive content rendering function - enhanced with better visual separation
    const renderContent = (content, contentType = "default") => {
        if (!content) return null;

        // String content
        if (typeof content === 'string') {
            return <p className="text-gray-300">{content}</p>;
        }

        // Array content
        if (Array.isArray(content)) {
            // Array of strings becomes a list
            if (content.every(item => typeof item === 'string')) {
                return (
                    <ul className="space-y-1">
                        {content.map((item, idx) => (
                            <StyledListItem key={idx} type={contentType}>{item}</StyledListItem>
                        ))}
                    </ul>
                );
            }

            // Mixed array content
            return (
                <div className="space-y-4">
                    {content.map((item, idx) => (
                        <div key={idx}>{renderContent(item, contentType)}</div>
                    ))}
                </div>
            );
        }

        // Object content
        if (typeof content === 'object' && content !== null) {
            // Special case for code_examples
            if (content.title === 'code_examples' && content['multi-content']) {
                return (
                    <div className="mb-4">
                        <ContentCard title={language === 'en' ? 'Code Examples' : 'Exemples de Code'} contentType="code">
                            {renderCodeExamples(content)}
                        </ContentCard>
                    </div>
                );
            }

            // Simple content with title
            if (content.title && content['simple-content']) {
                // Special handling for code examples
                if (content.title.includes('code') || content.title.includes('example')) {
                    return (
                        <div className="mb-4">
                            <CodeBlock code={content['simple-content']} title={content.title} />
                        </div>
                    );
                }

                // Determine content type for styling
                let derivedType =
                    content.title.toLowerCase().includes('benefit') || content.title.toLowerCase().includes('advantage') ? 'benefits' :
                        content.title.toLowerCase().includes('drawback') || content.title.toLowerCase().includes('disadvantage') ? 'drawbacks' :
                            content.title.toLowerCase().includes('example') || content.title.toLowerCase().includes('code') ? 'example' :
                                content.title.toLowerCase().includes('type') ? 'types' :
                                    content.title.toLowerCase().includes('feature') ? 'features' :
                                        content.title.toLowerCase().includes('definition') ? 'definition' :
                                            contentType;

                // Regular content
                return (
                    <ContentCard title={content.title} contentType={derivedType} className="mb-4">
                        <p className="text-gray-300">{content['simple-content']}</p>
                    </ContentCard>
                );
            }

            // Multi-content with title
            if (content.title && content['multi-content']) {
                // Determine content type for styling
                let derivedType =
                    content.title.toLowerCase().includes('benefit') || content.title.toLowerCase().includes('advantage') ? 'benefits' :
                        content.title.toLowerCase().includes('drawback') || content.title.toLowerCase().includes('disadvantage') ? 'drawbacks' :
                            content.title.toLowerCase().includes('example') || content.title.toLowerCase().includes('code') ? 'example' :
                                content.title.toLowerCase().includes('type') ? 'types' :
                                    content.title.toLowerCase().includes('feature') ? 'features' :
                                        content.title.toLowerCase().includes('definition') ? 'definition' :
                                            contentType;

                return (
                    <ContentCard title={content.title} contentType={derivedType} className="mb-4">
                        {renderContent(content['multi-content'], derivedType)}
                    </ContentCard>
                );
            }

            // Generic object content
            const entries = Object.entries(content).filter(([key]) => key !== 'title');
            if (entries.length > 0) {
                return (
                    <div className="space-y-4">
                        {entries.map(([key, value], idx) => {
                            // Skip rendering title
                            if (key === 'title') return null;

                            // Determine content type for nested content
                            let nestedType =
                                key.toLowerCase().includes('benefit') || key.toLowerCase().includes('advantage') ? 'benefits' :
                                    key.toLowerCase().includes('drawback') || key.toLowerCase().includes('disadvantage') ? 'drawbacks' :
                                        key.toLowerCase().includes('example') || key.toLowerCase().includes('code') ? 'example' :
                                            key.toLowerCase().includes('type') ? 'types' :
                                                key.toLowerCase().includes('feature') ? 'features' :
                                                    key.toLowerCase().includes('definition') ? 'definition' :
                                                        contentType;

                            // For nested objects with no simple/multi content
                            if (typeof value === 'object' && value !== null && !Array.isArray(value) &&
                                !value['simple-content'] && !value['multi-content']) {
                                return (
                                    <ContentCard key={idx} title={key} contentType={nestedType}>
                                        {renderContent(value, nestedType)}
                                    </ContentCard>
                                );
                            }

                            return <div key={idx}>{renderContent(value, nestedType)}</div>;
                        })}
                    </div>
                );
            }
        }

        return null;
    };

    // Handle the special structure of topic sections with enhanced styling
    const renderTopicSections = (topic) => {
        if (!topic || !topic['multi-content']) return null;

        // Extract descriptions and definitions for introduction
        const introSections = topic['multi-content'].filter(content =>
            content.title === 'description' || content.title === 'definition'
        );

        // Get remaining sections
        const contentSections = topic['multi-content'].filter(content =>
            content.title !== 'description' && content.title !== 'definition'
        );

        return (
            <>
                {/* Introduction with enhanced styling */}
                {introSections.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-xl p-6 border border-purple-500/30 mb-8 shadow-lg">
                        {introSections.map((section, idx) => {
                            const isDefinition = section.title === 'definition';
                            const icon = isDefinition ?
                                <BookOpen className="w-5 h-5 text-purple-400" /> :
                                <FileText className="w-5 h-5 text-cyan-400" />;

                            return (
                                <div key={idx} className={`mb-4 ${idx > 0 ? 'mt-4' : ''}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-gray-800/70 rounded-lg">
                                            {icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {isDefinition ?
                                                (language === 'en' ? 'Definition' : 'Définition') :
                                                (language === 'en' ? 'Description' : 'Description')}
                                        </h3>
                                    </div>
                                    <p className="text-gray-300 ml-11">{section['simple-content']}</p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Main content sections with improved grid layout for multiple items */}
                <div className="grid grid-cols-1 gap-6">
                    {contentSections.map((section, idx) => {
                        // Determine content type for styling
                        let contentType =
                            section.title.toLowerCase().includes('benefit') || section.title.toLowerCase().includes('advantage') ? 'benefits' :
                                section.title.toLowerCase().includes('drawback') || section.title.toLowerCase().includes('disadvantage') ? 'drawbacks' :
                                    section.title.toLowerCase().includes('example') || section.title.toLowerCase().includes('code') ? 'example' :
                                        section.title.toLowerCase().includes('type') ? 'types' :
                                            section.title.toLowerCase().includes('feature') ? 'features' :
                                                section.title.toLowerCase().includes('definition') ? 'definition' :
                                                    'default';

                        // Special case for code_examples section
                        if (section.title === 'code_examples') {
                            return (
                                <div key={idx} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 border border-pink-500/30 shadow-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gray-800/70 rounded-lg">
                                            <Code2 className="w-5 h-5 text-pink-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-pink-300">
                                            {language === 'en' ? 'Code Examples' : 'Exemples de Code'}
                                        </h3>
                                    </div>

                                    <div className="space-y-6">
                                        {section['multi-content'].map((example, exIdx) => (
                                            <div key={exIdx} className="bg-gray-800/70 rounded-lg p-4 border border-gray-700/50">
                                                <h4 className="text-lg font-medium text-pink-300 mb-3">
                                                    {example.title}
                                                </h4>
                                                <CodeBlock code={example['simple-content']} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={idx} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 border border-gray-700/50 shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gray-800/70 rounded-lg">
                                        {getSectionIcon(section.title)}
                                    </div>
                                    <h3 className="text-xl font-semibold text-purple-300">{section.title}</h3>
                                </div>
                                {renderContent(section['multi-content'], contentType)}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    // Get the active topic
    const getActiveTopic = () => {
        return coreConcepts.topics?.find(topic => topic.title === activeTopic);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
            />

            {/* Header with enhanced styling */}
            <div className="mb-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/30 shadow-lg">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {coreConcepts.title}
                </h1>
            </div>

            {/* Navigation Tabs */}
            <TopicNavigation />

            {/* Content with improved styling */}
            <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 border border-purple-500/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gray-800/70 rounded-lg">
                            {getTopicIcon(activeTopic)}
                        </div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {activeTopic}
                        </h2>
                    </div>
                    {renderTopicSections(getActiveTopic())}
                </div>
            </div>
        </div>
    );
};

export default CorePage;