import React, { useState, useMemo } from 'react';
import {
    List, Zap, Calendar, Code, GitMerge, KeyRound, Box,
    Terminal, Database, Hash, BookOpen, Cpu, FileText,
    ArrowDownUp, Lock, Server, Package
} from 'lucide-react';
import featuresJsonEn from '../../../data/java/java-8-plus-features.json';
import CodeBlock from '../../../components/CodeBlock';
import FloatingMenu from '../../../components/layout/FloatingMenu';

const FeaturesPage = () => {
    const featuresJson = featuresJsonEn;

    // Get active section from the first section ID or from localStorage
    const defaultSectionId = featuresJson.sections[0]?.id || 'lambdaExpressions';
    const [activeSection, setActiveSection] = useState(() => {
        return localStorage.getItem('featuresActiveSection') || defaultSectionId;
    });

    // Define icon mapping for different section IDs
    const iconMap = useMemo(() => ({
        lambdaExpressions: <Terminal />,
        functionalInterfaces: <Box />,
        methodReferences: <GitMerge />,
        streams: <List />,
        optional: <KeyRound />,
        defaultMethods: <Code />,
        completableFuture: <Zap />,
        dateTime: <Calendar />,
        base64: <BookOpen />,
        modulesystem: <Package />,
        nashorn: <Server />,
        annotations: <Hash />,
        concurrency: <Lock />,
        additionalFeatures: <FileText />,
        practicalExample: <ArrowDownUp />,
        interviewFAQs: <Cpu />,
        advancedTopics: <Database />
    }), []);

    // Save active section to localStorage
    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
        localStorage.setItem('featuresActiveSection', sectionId);
    };

    // Generate tabs based on JSON sections
    const tabs = useMemo(() =>
        featuresJson.sections.map(section => ({
            id: section.id,
            title: section.title,
            icon: iconMap[section.id] || <Code />
        })), [featuresJson.sections, iconMap]);

    const TopicNavigation = ({ activeSection, onSectionChange, topics }) => (
        <div className="hidden lg:block bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 mb-8">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
                {topics.map((topic) => (
                    <button
                        key={topic.id}
                        onClick={() => onSectionChange(topic.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium 
                    transition-all duration-300 text-left
                    ${activeSection === topic.id
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

    const renderTable = (table) => {
        if (!table || !table.headers || !table.rows) return null;

        return (
            <div className="overflow-x-auto mb-4">
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
                                <td key={cellIdx} className="py-3 px-4 text-gray-300">
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

    const renderMethods = (methods) => {
        if (!methods || !methods.length) return null;

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {methods.map((method, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-2">{method.name}</h4>
                        <p className="text-gray-300 mb-2">{method.description}</p>
                        {method.example && (
                            <div className="bg-gray-900/50 p-2 rounded">
                                <code className="text-pink-300 font-mono text-sm">{method.example}</code>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderCodeSnippets = (code) => {
        if (!code || !code.length) return null;

        return (
            <div className="space-y-4 mb-6">
                {code.map((snippet, idx) => (
                    <div key={idx}>
                        {snippet.title && (
                            <h4 className="text-lg font-medium text-purple-300 mb-2">{snippet.title}</h4>
                        )}
                        <CodeBlock code={snippet.snippet || snippet.code} />
                    </div>
                ))}
            </div>
        );
    };

    const renderListItems = (items) => {
        if (!items || !items.length) return null;

        return (
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
        );
    };

    const renderExamples = (examples) => {
        if (!examples || !examples.length) return null;

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {examples.map((example, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                        <h4 className="text-base font-medium text-purple-300 mb-2">
                            {example.scenario || example.title || example.name}
                        </h4>
                        {example.description && (
                            <p className="text-gray-300 mb-2">{example.description}</p>
                        )}
                        {example.code && (
                            <CodeBlock code={example.code} />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderSubsection = (subsection) => {
        return (
            <div className="mb-8">
                {subsection.title && (
                    <h3 className="text-xl font-semibold text-white mb-4">{subsection.title}</h3>
                )}

                {subsection.content && (
                    <p className="text-gray-300 mb-4">{subsection.content}</p>
                )}

                {subsection.list && renderListItems(subsection.list)}

                {subsection.syntax && (
                    <div className="text-gray-400 mb-6 text-lg">
                        Syntax:
                        <code className="text-pink-400 bg-gray-800/50 px-2 py-1 rounded ml-2">{subsection.syntax}</code>
                    </div>
                )}

                {subsection.methods && renderMethods(subsection.methods)}

                {subsection.tables && subsection.tables.map((table, idx) => (
                    <div key={idx}>
                        {renderTable(table)}
                    </div>
                ))}

                {subsection.code && renderCodeSnippets(subsection.code)}

                {subsection.examples && renderExamples(subsection.examples)}

                {subsection.features && renderExamples(subsection.features)}

                {subsection.classes && renderExamples(subsection.classes)}
            </div>
        );
    };

    const renderSectionContent = (section) => {
        if (!section) return null;

        return (
            <div>
                {section.content && (
                    <p className="text-gray-300 mb-6">{section.content}</p>
                )}

                {section.subsections && section.subsections.map((subsection, idx) => (
                    <div key={idx}>
                        {renderSubsection(subsection)}
                    </div>
                ))}

                {/* Handle sections that don't have subsections */}
                {section.methods && renderMethods(section.methods)}
                {section.examples && renderExamples(section.examples)}
                {section.features && renderExamples(section.features)}
                {section.classes && renderExamples(section.classes)}
                {section.list && renderListItems(section.list)}
                {section.code && renderCodeSnippets(section.code)}
            </div>
        );
    };

    const renderContent = () => {
        const section = featuresJson.sections.find(s => s.id === activeSection);
        if (!section) return null;

        return (
            <div>
                <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10
                               backdrop-blur rounded-xl border border-purple-500/20 p-8 mb-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text
                                 bg-gradient-to-r from-purple-300 to-pink-300">
                        {section.title}
                    </h2>
                    <p className="text-gray-300 mt-2">{section.description || section.content}</p>
                </div>

                {renderSectionContent(section)}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50
                      rounded-xl p-6 border border-purple-500/20 shadow-lg">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text
                         bg-gradient-to-r from-purple-400 to-pink-500">
                    {featuresJson.title}
                </h1>
                {featuresJson.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {featuresJson.tags.map((tag, idx) => (
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
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                topics={tabs}
            />

            {/* Floating Menu - Only visible on small screens */}
            <FloatingMenu
                tabs={tabs}
                activeTab={activeSection}
                onTabChange={handleSectionChange}
            />

            {/* Content */}
            <div className="space-y-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default FeaturesPage;