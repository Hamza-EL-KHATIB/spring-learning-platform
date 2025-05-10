import React, { useState, useEffect, useMemo } from 'react';
import {
    Code, Hash, Filter, Terminal, GitBranch, Box, Sigma,
    ArrowUpDown, Lightbulb, List, Server, Package, Globe,
    FileCode, FileText, Layers, Lock
} from 'lucide-react';
import functionalProgrammingJsonEn from '../../../data/java/functional-programming.json';
import functionalProgrammingJsonFr from '../../../data/java/functional-programming-fr.json';
import CodeBlock from '../../../components/CodeBlock';
import FloatingMenu from '../../../components/layout/FloatingMenu';

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

const FunctionalProgrammingPage = () => {
    // Get the language preference from localStorage if available, otherwise default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('functionalProgrammingLanguage') || 'en';
    });

    // Set content data based on language
    const [content, setContent] = useState(language === 'en' ? functionalProgrammingJsonEn : functionalProgrammingJsonFr);

    // Get active topic from the first section ID or from localStorage
    const defaultTopicId = content.topics[0]?.id || 'introduction';
    const [activeTopic, setActiveTopic] = useState(() => {
        return localStorage.getItem('functionalProgrammingActiveTopic') || defaultTopicId;
    });

    // Define icon mapping for different topic IDs
    const iconMap = useMemo(() => ({
        introduction: <Lightbulb />,
        'core-concepts': <Box />,
        'functional-interfaces': <Sigma />,
        'lambda-expressions': <Hash />,
        'method-references': <GitBranch />,
        'function-composition': <ArrowUpDown />,
        'exception-handling': <FileText />,
        streams: <Filter />,
        immutability: <Lock />,
        monads: <Layers />,
        'design-patterns': <FileCode />,
        'spring-boot': <Server />,
        testing: <Terminal />,
        'interview-questions': <List />,
        'advanced-topics': <Code />,
        'learning-resources': <Package />
    }), []);

    // Change the language and save the preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('functionalProgrammingLanguage', lang);
    };

    // Save active topic to localStorage
    const handleTopicChange = (topicId) => {
        setActiveTopic(topicId);
        localStorage.setItem('functionalProgrammingActiveTopic', topicId);
    };

    // Update content based on selected language
    useEffect(() => {
        setContent(language === 'en' ? functionalProgrammingJsonEn : functionalProgrammingJsonFr);
    }, [language]);

    // Generate tabs based on topics
    const tabs = useMemo(() =>
        content.topics.map(topic => ({
            id: topic.id,
            title: topic.title,
            icon: iconMap[topic.id] || <Code />
        })), [content.topics, iconMap]);

    const TopicNavigation = ({ activeTopic, onTopicChange, topics }) => (
        <div className="hidden lg:block bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 mb-8">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
                {topics.map((topic) => (
                    <button
                        key={topic.id}
                        onClick={() => onTopicChange(topic.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium 
                        transition-all duration-300 text-left
                        ${activeTopic === topic.id
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                        }
                        border border-gray-700/50 hover:border-purple-500/30`}
                    >
                        {topic.icon && <span>{topic.icon}</span>}
                        <span>{topic.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    // Render a table from the JSON data
    const renderTable = (table) => {
        if (!table || !table.headers || !table.rows) return null;

        return (
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-gray-800/70 rounded-lg">
                    <thead>
                    <tr className="border-b border-gray-700">
                        {table.headers.map((header, idx) => (
                            <th key={idx} className="py-3 px-4 text-left text-sm text-gray-400">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {table.rows.map((row, rowIdx) => (
                        <tr
                            key={rowIdx}
                            className={rowIdx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                        >
                            {row.map((cell, cellIdx) => (
                                <td key={cellIdx} className={`py-3 px-4 text-gray-300 ${cell.includes('★') ? 'text-yellow-300' : ''}`}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // Render code examples
    const renderCode = (code) => {
        if (!code) return null;
        return (
            <div className="mb-6">
                <CodeBlock code={code} />
            </div>
        );
    };

    // Render quotes
    const renderQuotes = (quotes) => {
        if (!quotes || !quotes.length) return null;

        return (
            <div className="space-y-4 mb-6">
                {quotes.map((quote, idx) => (
                    <div key={idx} className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
                        <p className="text-gray-300 italic">{quote}</p>
                    </div>
                ))}
            </div>
        );
    };

    // Render patterns
    const renderPatterns = (patterns) => {
        if (!patterns || !patterns.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {patterns.map((pattern, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{pattern.name}</h4>
                        {pattern.code && <CodeBlock code={pattern.code} />}
                    </div>
                ))}
            </div>
        );
    };

    // Render implementation examples
    const renderImplementations = (implementations) => {
        if (!implementations || !implementations.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {implementations.map((implementation, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{implementation.title}</h4>
                        {implementation.code && <CodeBlock code={implementation.code} />}
                    </div>
                ))}
            </div>
        );
    };

    // Render test types
    const renderTestTypes = (testTypes) => {
        if (!testTypes || !testTypes.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {testTypes.map((testType, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{testType.title}</h4>
                        {testType.code && <CodeBlock code={testType.code} />}
                    </div>
                ))}
            </div>
        );
    };

    // Render subtopics
    const renderSubtopics = (subtopics) => {
        if (!subtopics || !subtopics.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {subtopics.map((subtopic, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{subtopic.title}</h4>
                        {subtopic.description && <p className="text-gray-300 mb-4">{subtopic.description}</p>}
                        {subtopic.table && renderTable(subtopic.table)}
                        {subtopic.code && renderCode(subtopic.code)}
                    </div>
                ))}
            </div>
        );
    };

    // Render questions
    const renderQuestions = (questions) => {
        if (!questions || !questions.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {questions.map((question, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{question.question}</h4>
                        <div className="whitespace-pre-line text-gray-300">
                            {question.answer}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Render learning resources
    const renderResources = (resources) => {
        if (!resources) return null;

        return (
            <div className="space-y-6 mb-6">
                {resources.map((resourceGroup, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{resourceGroup.category}</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {resourceGroup.items.map((item, itemIdx) => (
                                <li key={itemIdx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    // Render the content of the active topic
    const renderTopicContent = () => {
        const topic = content.topics.find(t => t.id === activeTopic);
        if (!topic) return null;

        return (
            <div>
                <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10
                               backdrop-blur rounded-xl border border-purple-500/20 p-8 mb-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text
                                 bg-gradient-to-r from-purple-300 to-pink-300">
                        {topic.title}
                    </h2>
                    {topic.description && (
                        <p className="text-gray-300 mt-2">{topic.description}</p>
                    )}
                </div>

                {/* Render specific content based on the topic */}
                {topic.quotes && renderQuotes(topic.quotes)}
                {topic.conceptTable && renderTable(topic.conceptTable)}
                {topic.subtopics && renderSubtopics(topic.subtopics)}
                {topic.code && renderCode(topic.code)}
                {topic.patterns && renderPatterns(topic.patterns)}
                {topic.implementations && renderImplementations(topic.implementations)}
                {topic.testTypes && renderTestTypes(topic.testTypes)}
                {topic.questions && renderQuestions(topic.questions)}
                {topic.resources && renderResources(topic.resources)}
                {topic.table && renderTable(topic.table)}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
            />

            {/* Header */}
            <div className="mb-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50
                      rounded-xl p-6 border border-purple-500/20 shadow-lg">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text
                         bg-gradient-to-r from-purple-400 to-pink-500">
                    {content.title}
                </h1>
                {content.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {content.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <TopicNavigation
                activeTopic={activeTopic}
                onTopicChange={handleTopicChange}
                topics={tabs}
            />

            {/* Floating Menu - Only visible on small screens */}
            <FloatingMenu
                tabs={tabs}
                activeTab={activeTopic}
                onTabChange={handleTopicChange}
            />

            {/* Content */}
            <div className="space-y-8">
                {renderTopicContent()}
            </div>

            {/* Related Topics */}
            {content.relatedTopics && (
                <div className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">
                        {language === 'en' ? 'Related Topics' : 'Sujets Connexes'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {content.relatedTopics.map((topic, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-sm"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FunctionalProgrammingPage;