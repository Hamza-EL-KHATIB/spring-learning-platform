import React, { useState, memo } from 'react';
import collectionsJsonEn from '../../../data/java/collections.json';
import {
    Database, Code, Box, List, Clock, FileText, GitBranch,Info,
    Cpu, Zap, HelpCircle, ChevronDown, Lock
} from 'lucide-react';
import CodeBlock from '../../../components/CodeBlock';

const CollectionsPage = () => {
    const content = collectionsJsonEn;

    // Define tab structure
    const tabs = [
        { id: 'overview', title: 'Overview', icon: <FileText className="w-4 h-4"/> },
        { id: 'hierarchy', title: 'Hierarchy', icon: <GitBranch className="w-4 h-4"/> },
        { id: 'collection-types', title: 'Collection Types', icon: <Box className="w-4 h-4"/> },
        { id: 'performance', title: 'Performance', icon: <Clock className="w-4 h-4"/> },
        { id: 'best-practices', title: 'Best Practices', icon: <Cpu className="w-4 h-4"/> },
        { id: 'comparable', title: 'Comparable/Comparator', icon: <Code className="w-4 h-4"/> },
        { id: 'utilities', title: 'Utilities', icon: <List className="w-4 h-4"/> },
        { id: 'java8', title: 'Java 8+', icon: <Zap className="w-4 h-4"/> },
        { id: 'concurrent', title: 'Concurrent', icon: <Lock className="w-4 h-4"/> },
        { id: 'interview', title: 'Interview Q&A', icon: <HelpCircle className="w-4 h-4"/> },
    ];

    // Active tab state
    const [activeTab, setActiveTab] = useState('overview');

    // Tab navigation component
    const TabNavigation = () => (
        <div className="mb-4 flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    {tab.id === 'overview' && <Info className="w-4 h-4" />}
                    {tab.id === 'hierarchy' && <GitBranch className="w-4 h-4" />}
                    {tab.id === 'collection-types' && <Box className="w-4 h-4" />}
                    {tab.id === 'performance' && <Clock className="w-4 h-4" />}
                    {tab.id === 'best-practices' && <Cpu className="w-4 h-4" />}
                    {tab.id === 'comparable' && <Code className="w-4 h-4" />}
                    {tab.id === 'utilities' && <List className="w-4 h-4" />}
                    {tab.id === 'java8' && <Zap className="w-4 h-4" />}
                    {tab.id === 'concurrent' && <Lock className="w-4 h-4" />}
                    {tab.id === 'interview' && <HelpCircle className="w-4 h-4" />}
                    {tab.title}
                </button>
            ))}
        </div>
    );

    // Render overview section
    const renderOverview = () => {
        const section = content.topics.find(topic => topic.id === 'overview');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    {section.features && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.features.map((feature, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 bg-purple-500/20 rounded-md">
                                            <Box className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <h4 className="text-lg font-medium text-purple-300">{feature.name}</h4>
                                    </div>
                                    <p className="text-gray-300 text-sm">{feature.description}</p>
                                    {feature.interviewRelevance && (
                                        <div className="mt-2 pt-2 border-t border-gray-700/50">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400">Interview Relevance:</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`w-2 h-2 rounded-full ${i < feature.interviewRelevance ? 'bg-cyan-400' : 'bg-gray-600'} mx-0.5`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render hierarchy section
    const renderHierarchy = () => {
        const section = content.topics.find(topic => topic.id === 'hierarchy');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    {/* Class hierarchy diagram */}
                    {section.structure && (
                        <div className="bg-gray-800/70 rounded-lg p-4 mb-6 overflow-x-auto">
              <pre className="text-gray-300 font-mono whitespace-pre text-sm leading-relaxed">
                {section.structure}
              </pre>
                        </div>
                    )}

                    {/* Core interfaces */}
                    {section.interfaces && (
                        <div className="space-y-6 mt-8">
                            <h4 className="text-lg font-medium text-cyan-300">Core Interfaces</h4>
                            {section.interfaces.map((intf, idx) => (
                                <div key={idx} className="bg-gray-800/70 rounded-lg p-5 border border-gray-700/30">
                                    <h5 className="text-lg font-medium text-purple-300 mb-2">{intf.name}</h5>
                                    <p className="text-gray-300 mb-4">{intf.description}</p>
                                    {intf.code && <CodeBlock code={intf.code} />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Collection Types section
    const renderCollectionTypes = () => {
        const section = content.topics.find(topic => topic.id === 'collection-types');
        if (!section) return null;

        // Collection type renderer
        const renderCollectionType = (type) => (
            <div key={type.type} className="mb-8 bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        {type.type === 'List' ? <List className="w-5 h-5 text-purple-400"/> :
                            type.type === 'Set' ? <Database className="w-5 h-5 text-purple-400"/> :
                                type.type === 'Queue' ? <GitBranch className="w-5 h-5 text-purple-400"/> :
                                    <Box className="w-5 h-5 text-purple-400"/>}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{type.type}</h3>
                </div>

                <p className="text-gray-300 mb-6">{type.description}</p>

                <div className="space-y-6">
                    {type.implementations && type.implementations.map((impl, index) => (
                        <div key={index} className="bg-gray-800/70 rounded-lg p-5 border border-gray-700/30">
                            <h4 className="text-lg font-medium text-purple-300 mb-2">{impl.name}</h4>
                            <p className="text-gray-300 mb-4">{impl.description}</p>

                            {impl.characteristics && (
                                <div className="mb-4">
                                    <h5 className="text-md font-medium text-cyan-300 mb-2">
                                        Characteristics
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {impl.characteristics.map((char, idx) => (
                                            <li key={idx} className="text-gray-300">{char}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {impl.keyPoints && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {impl.keyPoints.map((point, pointIdx) => (
                                        <div key={pointIdx} className="bg-gray-800/50 p-3 rounded-lg">
                                            <h6 className="text-sm font-medium text-cyan-300 mb-1">{point.category}</h6>
                                            <ul className="list-disc list-inside text-sm">
                                                {point.points.map((p, pIdx) => (
                                                    <li key={pIdx} className="text-gray-300">{p}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {impl.code && (
                                <div className="mt-4">
                                    <h5 className="text-md font-medium text-cyan-300 mb-2">
                                        Example Code
                                    </h5>
                                    <CodeBlock code={impl.code} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );

        return (
            <div className="space-y-4">
                {section.types && section.types.map(renderCollectionType)}
            </div>
        );
    };

    // Performance comparison section
    const renderPerformanceComparison = () => {
        const section = content.topics.find(topic => topic.id === 'performance-comparison');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    {/* Performance table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800/70 rounded-lg">
                            <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-3 px-4 text-left text-sm text-gray-400">Collection</th>
                                <th className="py-3 px-4 text-left text-sm text-gray-400">Access</th>
                                <th className="py-3 px-4 text-left text-sm text-gray-400">Insert</th>
                                <th className="py-3 px-4 text-left text-sm text-gray-400">Delete</th>
                                <th className="py-3 px-4 text-left text-sm text-gray-400">Memory</th>
                                <th className="py-3 px-4 text-left text-sm text-gray-400">Notes</th>
                            </tr>
                            </thead>
                            <tbody>
                            {section.collections && section.collections.map((collection, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                                >
                                    <td className="py-3 px-4 text-purple-300 font-medium">{collection.collection}</td>
                                    <td className="py-3 px-4 text-gray-300 font-mono text-sm">{collection.accessTime}</td>
                                    <td className="py-3 px-4 text-gray-300 font-mono text-sm">{collection.insertTime}</td>
                                    <td className="py-3 px-4 text-gray-300 font-mono text-sm">{collection.deleteTime}</td>
                                    <td className="py-3 px-4 text-gray-300">{collection.memoryOverhead}</td>
                                    <td className="py-3 px-4 text-gray-300">{collection.notes}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // Best practices section
    const renderBestPractices = () => {
        const section = content.topics.find(topic => topic.id === 'best-practices');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.issues && section.issues.map((issue, idx) => (
                        <div key={idx} className="bg-gray-800/70 rounded-lg p-5 border border-gray-700/30 mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <Cpu className="w-4 h-4 text-cyan-400" />
                                </div>
                                <h4 className="text-lg font-medium text-purple-300">{issue.name}</h4>
                            </div>

                            <p className="text-gray-300 mb-4">{issue.description}</p>

                            {issue.code && issue.code.incorrect && (
                                <div className="mb-4">
                                    <h5 className="text-md font-medium text-red-400 mb-2">
                                        Incorrect
                                    </h5>
                                    <CodeBlock code={issue.code.incorrect} />
                                </div>
                            )}

                            {issue.code && issue.code.correct && (
                                <div className="mb-4">
                                    <h5 className="text-md font-medium text-green-400 mb-2">
                                        Correct
                                    </h5>
                                    {Array.isArray(issue.code.correct) ? (
                                        issue.code.correct.map((code, codeIdx) => (
                                            <div key={codeIdx} className="mb-4">
                                                <CodeBlock code={code} />
                                            </div>
                                        ))
                                    ) : (
                                        <CodeBlock code={issue.code.correct} />
                                    )}
                                </div>
                            )}

                            {issue.code && issue.code.problematic && (
                                <div className="mb-4">
                                    <h5 className="text-md font-medium text-yellow-400 mb-2">
                                        Problematic Code
                                    </h5>
                                    <CodeBlock code={issue.code.problematic} />
                                </div>
                            )}

                            {issue.bestPractice && (
                                <div className="mt-4 bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                                    <h5 className="text-md font-medium text-green-300 mb-2">
                                        Best Practice
                                    </h5>
                                    <p className="text-gray-300">{issue.bestPractice}</p>
                                </div>
                            )}

                            {issue.recommendations && (
                                <div className="mt-4">
                                    <h5 className="text-md font-medium text-cyan-300 mb-2">
                                        Recommendations
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {issue.recommendations.map((rec, recIdx) => (
                                            <li key={recIdx} className="text-gray-300">{rec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Comparable and Comparator section
    const renderComparableComparator = () => {
        const section = content.topics.find(topic => topic.id === 'comparable-comparator');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    {/* Interfaces */}
                    {section.interfaces && section.interfaces.map((intf, idx) => (
                        <div key={idx} className="bg-gray-800/70 rounded-lg p-5 border border-gray-700/30 mb-6">
                            <h4 className="text-lg font-medium text-purple-300 mb-2">{intf.name}</h4>
                            <p className="text-gray-300 mb-4">{intf.description}</p>
                            {intf.code && <CodeBlock code={intf.code} />}
                        </div>
                    ))}

                    {/* Comparison table */}
                    {section.comparison && (
                        <div className="overflow-x-auto mt-6">
                            <table className="min-w-full bg-gray-800/70 rounded-lg">
                                <thead>
                                <tr className="border-b border-gray-700">
                                    {section.comparison.headers && section.comparison.headers.map((header, idx) => (
                                        <th key={idx} className="py-3 px-4 text-left text-sm text-gray-400">{header}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {section.comparison.rows && section.comparison.rows.map((row, rowIdx) => (
                                    <tr
                                        key={rowIdx}
                                        className={rowIdx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                                    >
                                        {row.map((cell, cellIdx) => (
                                            <td
                                                key={cellIdx}
                                                className={`py-3 px-4 ${cellIdx === 0 ? 'text-purple-300 font-medium' : 'text-gray-300'}`}
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Collections Utility Class section
    const renderUtilities = () => {
        const section = content.topics.find(topic => topic.id === 'collections-utility');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    {/* Methods by category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.methods && section.methods.map((method, idx) => (
                            <div key={idx} className="bg-gray-800/70 rounded-lg p-5 border border-gray-700/30">
                                <h4 className="text-lg font-medium text-purple-300 mb-3">{method.category}</h4>
                                <div className="space-y-2">
                                    {method.examples.map((example, exIdx) => (
                                        <div key={exIdx} className="bg-gray-900/50 p-2 rounded-lg">
                                            <code className="text-cyan-300 font-mono text-sm">{example}</code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Java 8+ Enhancements section
    const renderJava8Enhancements = () => {
        const section = content.topics.find(topic => topic.id === 'java8-enhancements');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.features && section.features.map((feature, idx) => (
                        <div key={idx} className="bg-gray-800/70 rounded-lg p-5 border border-gray-700/30 mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <Zap className="w-4 h-4 text-cyan-400" />
                                </div>
                                <h4 className="text-lg font-medium text-purple-300">{feature.name}</h4>
                            </div>

                            <p className="text-gray-300 mb-4">{feature.description}</p>

                            {feature.code && (
                                <CodeBlock code={feature.code} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Concurrent Collections section
    const renderConcurrentCollections = () => {
        const section = content.topics.find(topic => topic.id === 'concurrent-collections');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    {section.code && (
                        <div className="bg-gray-800/70 rounded-lg p-5 border border-gray-700/30">
                            <h4 className="text-lg font-medium text-purple-300 mb-3">
                                Example Code
                            </h4>
                            <CodeBlock code={section.code} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Interview Questions section
    const renderInterviewQuestions = () => {
        const section = content.topics.find(topic => topic.id === 'interview-questions');
        if (!section) return null;

        // Question card component
        const QuestionCard = memo(({ question, answer }) => {
            const [isExpanded, setIsExpanded] = useState(false);

            return (
                <div className={`bg-gray-800/60 rounded-xl overflow-hidden transition-all duration-300 border border-gray-700/50 ${
                    isExpanded ? 'shadow-lg border-cyan-500/30' : 'hover:border-gray-600'
                }`}>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full text-left p-5 flex justify-between items-start"
                    >
                        <h4 className="text-md font-medium text-cyan-300 pr-6">{question}</h4>
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isExpanded ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
                        }`}>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
                        </div>
                    </button>

                    {isExpanded && (
                        <div className="p-5 pt-1 border-t border-gray-700/30 bg-gray-800/80">
                            <div className="prose prose-dark">
                                {answer.includes('```') ? (
                                    <div className="space-y-3">
                                        {answer.split(/(```[\s\S]*?```)/g).map((part, idx) => {
                                            if (part.startsWith('```')) {
                                                // Extract clean code without backticks
                                                const code = part.replace(/```(?:\w+)?\n|```/g, '');
                                                return (
                                                    <div key={idx} className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                                                        {code}
                                                    </div>
                                                );
                                            }

                                            // Format plain text with possible inline code and markdown
                                            return (
                                                <div key={idx}
                                                     className="text-gray-300 whitespace-pre-line"
                                                     dangerouslySetInnerHTML={{
                                                         __html: part.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                                             .replace(/\n- /g, '<br/>• ')
                                                     }}
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div
                                        className="text-gray-300 whitespace-pre-line"
                                        dangerouslySetInnerHTML={{
                                            __html: answer.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\n- /g, '<br/>• ')
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            );
        });

        QuestionCard.displayName = 'QuestionCard';

        return (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20 shadow-lg mb-6">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-3">
                        Interview Questions & Answers
                    </h3>
                    <p className="text-gray-300">Most commonly asked questions about Java Collections in technical interviews.</p>
                </div>

                <div className="space-y-4">
                    {section.questions && section.questions.map((qa, idx) => (
                        <QuestionCard
                            key={idx}
                            question={qa.question}
                            answer={qa.answer}
                        />
                    ))}
                </div>
            </div>
        );
    };

    // Render the appropriate content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'hierarchy':
                return renderHierarchy();
            case 'collection-types':
                return renderCollectionTypes();
            case 'performance':
                return renderPerformanceComparison();
            case 'best-practices':
                return renderBestPractices();
            case 'comparable':
                return renderComparableComparator();
            case 'utilities':
                return renderUtilities();
            case 'java8':
                return renderJava8Enhancements();
            case 'concurrent':
                return renderConcurrentCollections();
            case 'interview':
                return renderInterviewQuestions();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
                {/* Header */}
            <div className="mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-purple-500/30 shadow-md">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{content.title}</h1>
                <p className="text-gray-300">A comprehensive guide to Java Collections Framework</p>
            </div>

            {/* Tab Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default CollectionsPage;
