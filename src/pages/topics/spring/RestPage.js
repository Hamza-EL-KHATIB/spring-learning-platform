import React, { useState, useEffect } from 'react';
import {
    Box, Database, GitMerge, Settings, Shield, Code, Layers,
    BookOpen, FileText, CheckCircle, List, AlertTriangle, Terminal,
    Code2, Cpu, Globe, Server, ArrowRight, FileJson, TestTube, CheckSquare
} from 'lucide-react';
import restApisEn from '../../../data/spring/rest-apis.json';
import restApisFr from '../../../data/spring/rest-apis-fr.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLanguage } from '../../../components/LanguageContext';
import GlobalLanguageSelector from '../../../components/GlobalLanguageSelector';

const RestPage = () => {
    // Use the global language context
    const { language } = useLanguage();

    // State for the content based on language
    const [restApis, setRestApis] = useState(language === 'en' ? restApisEn : restApisFr);

    // Active tab state - default to first topic
    const [activeTopic, setActiveTopic] = useState(() => {
        return restApis.topics?.[0]?.title || '';
    });

    useEffect(() => {
        // Update content based on selected language
        const newContent = language === 'en' ? restApisEn : restApisFr;
        setRestApis(newContent);

        // Ensure active topic exists in the new content
        if (!newContent.topics.some(t => t.title === activeTopic)) {
            setActiveTopic(newContent.topics?.[0]?.title || '');
        }
    }, [language, activeTopic]);

    // Helper function to get icon for a topic
    const getTopicIcon = (topicTitle) => {
        // English titles
        if (topicTitle === 'Core Concepts' || topicTitle === 'Concepts Fondamentaux')
            return <Globe className="w-4 h-4" />;
        if (topicTitle === 'HTTP Methods' || topicTitle === 'Méthodes HTTP')
            return <ArrowRight className="w-4 h-4" />;
        if (topicTitle === 'HTTP Request & Response Structure' || topicTitle === 'Structure des Requêtes et Réponses HTTP')
            return <Box className="w-4 h-4" />;
        if (topicTitle === 'Status Codes' || topicTitle === 'Codes d\'État')
            return <CheckSquare className="w-4 h-4" />;
        if (topicTitle === 'Content Negotiation' || topicTitle === 'Négociation de Contenu')
            return <FileJson className="w-4 h-4" />;
        if (topicTitle === 'Advanced REST Concepts' || topicTitle === 'Concepts REST Avancés')
            return <Cpu className="w-4 h-4" />;
        if (topicTitle === 'Spring MVC Implementation' || topicTitle === 'Implémentation Spring MVC')
            return <Server className="w-4 h-4" />;
        if (topicTitle === 'Error Handling' || topicTitle === 'Gestion des Erreurs')
            return <AlertTriangle className="w-4 h-4" />;
        if (topicTitle === 'REST API Testing' || topicTitle === 'Tests d\'API REST')
            return <TestTube className="w-4 h-4" />;
        if (topicTitle === 'REST API Best Practices' || topicTitle === 'Bonnes Pratiques pour les API REST')
            return <CheckCircle className="w-4 h-4" />;
        if (topicTitle === 'Differences Between REST and Other APIs' || topicTitle === 'Différences Entre REST et Autres API')
            return <Database className="w-4 h-4" />;

        // Default icon
        return <Code className="w-4 h-4" />;
    };

    // Navigation tabs component with more compact styling
    const TopicNavigation = () => (
        <div className="mb-4 flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
            {restApis.topics?.map((topic) => (
                <button
                    key={topic.title}
                    onClick={() => setActiveTopic(topic.title)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        activeTopic === topic.title
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-gray-300'
                    }`}
                >
                    {getTopicIcon(topic.title)}
                    <span className="ml-1">{topic.title}</span>
                </button>
            ))}
        </div>
    );

    // Component to render code blocks with more compact styling
    const CodeBlock = ({ code, title }) => {
        if (!code) return null;

        return (
            <div className="bg-gray-900/70 rounded-md border border-gray-700/70 overflow-hidden text-sm">
                {title && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-gray-800 border-b border-gray-700/70">
                        <Code2 className="w-3 h-3 text-pink-400" />
                        <span className="text-xs font-medium text-gray-300">{title}</span>
                    </div>
                )}
                <SyntaxHighlighter
                    language="java"
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        borderRadius: title ? '0 0 0.25rem 0.25rem' : '0.25rem',
                        padding: '0.75rem',
                        fontSize: '0.8rem',
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

        // English and French terminology
        if (lowerTitle.includes('definition') || lowerTitle.includes('what is') || lowerTitle.includes('qu\'est-ce') || lowerTitle.includes('définition'))
            return <BookOpen className="w-4 h-4 text-purple-400" />;
        if (lowerTitle.includes('description'))
            return <FileText className="w-4 h-4 text-cyan-400" />;
        if (lowerTitle.includes('benefit') || lowerTitle.includes('advantage') || lowerTitle.includes('avantage'))
            return <CheckCircle className="w-4 h-4 text-green-400" />;
        if (lowerTitle.includes('example') || lowerTitle.includes('exemple'))
            return <Terminal className="w-4 h-4 text-pink-400" />;
        if (lowerTitle.includes('code'))
            return <Code2 className="w-4 h-4 text-pink-400" />;
        if (lowerTitle.includes('types') || lowerTitle.includes('type'))
            return <Layers className="w-4 h-4 text-yellow-400" />;
        if (lowerTitle.includes('key') || lowerTitle.includes('principles') || lowerTitle.includes('clés') || lowerTitle.includes('principe'))
            return <CheckSquare className="w-4 h-4 text-blue-400" />;
        if (lowerTitle.includes('vs') || lowerTitle.includes('comparison') || lowerTitle.includes('entre'))
            return <GitMerge className="w-4 h-4 text-orange-400" />;
        if (lowerTitle.includes('authentication') || lowerTitle.includes('security') || lowerTitle.includes('authentification') || lowerTitle.includes('sécurité'))
            return <Shield className="w-4 h-4 text-red-400" />;
        if (lowerTitle.includes('http') || lowerTitle.includes('requête') || lowerTitle.includes('réponse'))
            return <ArrowRight className="w-4 h-4 text-indigo-400" />;
        if (lowerTitle.includes('practice') || lowerTitle.includes('best') || lowerTitle.includes('pratique') || lowerTitle.includes('bonne'))
            return <CheckCircle className="w-4 h-4 text-green-400" />;
        if (lowerTitle.includes('méthode'))
            return <ArrowRight className="w-4 h-4 text-indigo-400" />;
        if (lowerTitle.includes('stratégie') || lowerTitle.includes('strategie'))
            return <Cpu className="w-4 h-4 text-blue-400" />;
        if (lowerTitle.includes('test') || lowerTitle.includes('essai'))
            return <TestTube className="w-4 h-4 text-purple-400" />;
        if (lowerTitle.includes('gestion') || lowerTitle.includes('handling'))
            return <AlertTriangle className="w-4 h-4 text-orange-400" />;

        return <List className="w-4 h-4 text-gray-400" />;
    };

    // Styled content card - more compact version
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

        return (
            <div className={`rounded-md p-3 border backdrop-blur-sm transition-all ${colorClasses} ${className} hover:shadow-md text-sm`}>
                {title && (
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-gray-800/70 rounded-md">
                            {icon}
                        </div>
                        <h4 className="text-base font-semibold text-white">{title}</h4>
                    </div>
                )}
                <div className={title ? "ml-8" : ""}>{children}</div>
            </div>
        );
    };

    // Renders a list item with a styled bullet - more compact
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
            <li className="flex items-start gap-1.5 text-gray-300 mb-1 text-sm">
                <div className={`w-1 h-1 ${bulletColor} rounded-full mt-1.5`}></div>
                <span>{children}</span>
            </li>
        );
    };

    // Special handler for code examples
    const renderCodeExamples = (codeExamples) => {
        if (!codeExamples || !codeExamples['multi-content']) return null;

        return (
            <div className="space-y-3">
                {codeExamples['multi-content'].map((example, idx) => (
                    <div key={idx} className="mb-3">
                        <CodeBlock
                            code={example['simple-content']}
                            title={example.title}
                        />
                    </div>
                ))}
            </div>
        );
    };

    // Recursive content rendering function - enhanced for compact view
    const renderContent = (content, contentType = "default") => {
        if (!content) return null;

        // String content
        if (typeof content === 'string') {
            // Handle string content with proper formatting for newlines
            const formattedContent = content.split('\n').map((text, i) => (
                <React.Fragment key={i}>
                    {text}
                    {i < content.split('\n').length - 1 && <br />}
                </React.Fragment>
            ));
            return <p className="text-gray-300 text-sm">{formattedContent}</p>;
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
                <div className="space-y-3">
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
                    <div className="mb-3">
                        <ContentCard title={language === 'en' ? 'Code Examples' : 'Exemples de Code'} contentType="code">
                            {renderCodeExamples(content)}
                        </ContentCard>
                    </div>
                );
            }

            // Simple content with title
            if (content.title && content['simple-content']) {
                // Special handling for code examples
                if (content.title.includes('code') || content.title.includes('example') || content.title.includes('Example')) {
                    return (
                        <div className="mb-3">
                            <CodeBlock code={content['simple-content']} title={content.title} />
                        </div>
                    );
                }

                // Determine content type for styling
                let derivedType =
                    content.title.toLowerCase().includes('benefit') || content.title.toLowerCase().includes('advantage') ? 'benefits' :
                        content.title.toLowerCase().includes('drawback') || content.title.toLowerCase().includes('disadvantage') ? 'drawbacks' :
                            content.title.toLowerCase().includes('example') ? 'example' :
                                content.title.toLowerCase().includes('type') ? 'types' :
                                    content.title.toLowerCase().includes('feature') ? 'features' :
                                        content.title.toLowerCase().includes('definition') ? 'definition' :
                                            contentType;

                // Regular content
                return (
                    <ContentCard title={content.title} contentType={derivedType} className="mb-3">
                        <p className="text-gray-300 text-sm">{content['simple-content']}</p>
                    </ContentCard>
                );
            }

            // Multi-content with title
            if (content.title && content['multi-content']) {
                // Determine content type for styling
                let derivedType =
                    content.title.toLowerCase().includes('benefit') || content.title.toLowerCase().includes('advantage') ? 'benefits' :
                        content.title.toLowerCase().includes('drawback') || content.title.toLowerCase().includes('disadvantage') ? 'drawbacks' :
                            content.title.toLowerCase().includes('example') ? 'example' :
                                content.title.toLowerCase().includes('type') ? 'types' :
                                    content.title.toLowerCase().includes('feature') ? 'features' :
                                        content.title.toLowerCase().includes('definition') ? 'definition' :
                                            contentType;

                return (
                    <ContentCard title={content.title} contentType={derivedType} className="mb-3">
                        {renderContent(content['multi-content'], derivedType)}
                    </ContentCard>
                );
            }

            // Generic object content
            const entries = Object.entries(content).filter(([key]) => key !== 'title');
            if (entries.length > 0) {
                return (
                    <div className="space-y-3">
                        {entries.map(([key, value], idx) => {
                            // Skip rendering title
                            if (key === 'title') return null;

                            // Determine content type for nested content
                            let nestedType =
                                key.toLowerCase().includes('benefit') || key.toLowerCase().includes('advantage') ? 'benefits' :
                                    key.toLowerCase().includes('drawback') || key.toLowerCase().includes('disadvantage') ? 'drawbacks' :
                                        key.toLowerCase().includes('example') ? 'example' :
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

    // Handle the special structure of topic sections
    const renderTopicSections = (topic) => {
        if (!topic || !topic['multi-content']) return null;

        // Extract descriptions and definitions for introduction
        const introSections = topic['multi-content'].filter(content =>
            content.title === 'description' || content.title === 'Description' ||
            content.title === 'definition' || content.title === 'définition' ||
            content.title === 'What is REST?' || content.title === 'Qu\'est-ce que REST?' ||
            content.title === 'RESTful APIs' || content.title === 'API RESTful'
        );

        // Get remaining sections
        const contentSections = topic['multi-content'].filter(content =>
            content.title !== 'description' && content.title !== 'Description' &&
            content.title !== 'definition' && content.title !== 'définition' &&
            content.title !== 'What is REST?' && content.title !== 'Qu\'est-ce que REST?' &&
            content.title !== 'RESTful APIs' && content.title !== 'API RESTful'
        );

        return (
            <>
                {/* Introduction with more compact styling */}
                {introSections.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg p-4 border border-purple-500/30 mb-4 shadow-md">
                        {introSections.map((section, idx) => {
                            const isDefinition = section.title === 'definition' ||
                                section.title === 'définition' ||
                                section.title === 'What is REST?' ||
                                section.title === 'Qu\'est-ce que REST?';

                            const icon = isDefinition ?
                                <BookOpen className="w-4 h-4 text-purple-400" /> :
                                <FileText className="w-4 h-4 text-cyan-400" />;

                            // Handle multiline content
                            const formattedContent = section['simple-content']?.split('\n').map((text, i) => (
                                <React.Fragment key={i}>
                                    {text}
                                    {i < section['simple-content'].split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ));

                            return (
                                <div key={idx} className={`mb-2 ${idx > 0 ? 'mt-2' : ''}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="p-1.5 bg-gray-800/70 rounded-md">
                                            {icon}
                                        </div>
                                        <h3 className="text-base font-semibold text-white">
                                            {section.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-300 ml-8 text-sm">{formattedContent}</p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Main content sections with simplified layout */}
                <div className="space-y-3">
                    {contentSections.map((section, idx) => {
                        // Determine content type for styling
                        let contentType =
                            section.title.toLowerCase().includes('benefit') || section.title.toLowerCase().includes('advantage') ? 'benefits' :
                                section.title.toLowerCase().includes('drawback') || section.title.toLowerCase().includes('disadvantage') ? 'drawbacks' :
                                    section.title.toLowerCase().includes('example') ? 'example' :
                                        section.title.toLowerCase().includes('type') ? 'types' :
                                            section.title.toLowerCase().includes('feature') ? 'features' :
                                                section.title.toLowerCase().includes('definition') ? 'definition' :
                                                    'default';

                        // Special case for code_examples section
                        if (section.title === 'code_examples') {
                            return (
                                <div key={idx} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-4 border border-pink-500/30 shadow-md">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-gray-800/70 rounded-md">
                                            <Code2 className="w-4 h-4 text-pink-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-pink-300">
                                            {language === 'en' ? 'Code Examples' : 'Exemples de Code'}
                                        </h3>
                                    </div>

                                    <div className="space-y-3">
                                        {section['multi-content'].map((example, exIdx) => (
                                            <div key={exIdx} className="bg-gray-800/70 rounded-md p-3 border border-gray-700/50">
                                                <h4 className="text-sm font-medium text-pink-300 mb-2">
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
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-4 border border-gray-700/50 shadow-md"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-1.5 bg-gray-800/70 rounded-md">
                                        {getSectionIcon(section.title)}
                                    </div>
                                    <h3 className="text-base font-semibold text-purple-300">{section.title}</h3>
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
        return restApis.topics?.find(topic => topic.title === activeTopic);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Use the global language selector */}
            <div className="mb-4">
                <GlobalLanguageSelector />
            </div>

            {/* Header with more compact styling */}
            <div className="mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-purple-500/30 shadow-md">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {restApis.title}
                </h1>
            </div>

            {/* Navigation Tabs */}
            <TopicNavigation />

            {/* Content with more compact styling */}
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-4 border border-purple-500/20 shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-gray-800/70 rounded-md">
                            {getTopicIcon(activeTopic)}
                        </div>
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {activeTopic}
                        </h2>
                    </div>
                    {renderTopicSections(getActiveTopic())}
                </div>
            </div>
        </div>
    );
};

export default RestPage;
