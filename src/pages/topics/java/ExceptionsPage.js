import React, { useState, memo, useCallback } from 'react';
import exceptionsJsonEn from '../../../data/java/exceptions.json';
// Import the diagram image for visual representation
import exceptionsDiagram from '../../../data/images/Untitled diagram-2025-03-24-233855.png';

import {
    AlertTriangle, FileWarning, Layers, Info, HelpCircle,
    GitBranch, Box, List, ChevronDown, Zap,
    CheckCircle2, XCircle
} from 'lucide-react';
import CodeBlock from '../../../components/CodeBlock';

const ExceptionsPage = () => {
    const content = exceptionsJsonEn;

    // Define tab structure based on the content sections
    const tabs = [
        { id: 'overview', title: 'Overview', icon: <Info className="w-4 h-4"/> },
        { id: 'hierarchy', title: 'Hierarchy', icon: <GitBranch className="w-4 h-4"/> },
        { id: 'types', title: 'Exception Types', icon: <Layers className="w-4 h-4"/> },
        { id: 'handling', title: 'Handling', icon: <FileWarning className="w-4 h-4"/> },
        { id: 'custom', title: 'Custom Exceptions', icon: <Box className="w-4 h-4"/> },
        { id: 'best-practices', title: 'Best Practices', icon: <CheckCircle2 className="w-4 h-4"/> },
        { id: 'multi-threaded', title: 'Multi-Threaded', icon: <Zap className="w-4 h-4"/> },
        { id: 'try-catch-order', title: 'try-catch Order', icon: <List className="w-4 h-4"/> },
        { id: 'interview', title: 'Interview Q&A', icon: <HelpCircle className="w-4 h-4"/> }
    ];

    // Active tab state
    const [activeTab, setActiveTab] = useState('overview');


    // Tab navigation component - memoized for performance
    const TabNavigation = memo(() => (
        <div className="mb-8 flex flex-wrap gap-4 overflow-x-auto py-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
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
    ));

    TabNavigation.displayName = 'TabNavigation';

    // Render overview section with optimized lookup
    const renderOverview = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'core-concepts');
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
                                            <AlertTriangle className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <h4 className="text-lg font-medium text-purple-300">{feature.name}</h4>
                                    </div>
                                    <p className="text-gray-300 text-sm">{feature.purpose}</p>
                                    {feature.interviewRelevance && (
                                        <div className="mt-2 pt-2 border-t border-gray-700/50">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400">
                                                    {'Interview Relevance:'}
                                                </span>
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
    }, [content]);

    // Render exception hierarchy section with diagram image
    const renderHierarchy = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'exception-hierarchy');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {/* Visual diagram */}
                    <div className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                        <h4 className="text-lg font-medium text-cyan-300 mb-3">
                            Exception Class Hierarchy
                        </h4>
                        <div className="flex justify-center mb-4">
                            <img
                                src={exceptionsDiagram}
                                alt="Java Exceptions Hierarchy"
                                className="max-w-full rounded-lg border border-gray-700/30"
                            />
                        </div>
                    </div>

                    {/* Main classes */}
                    {section.classes && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-cyan-300 mb-2">
                                Key Exception Classes
                            </h4>
                            {section.classes.map((exClass, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/30">
                                    <h5 className="text-lg font-medium text-purple-300 mb-2">{exClass.name}</h5>
                                    <p className="text-gray-300 mb-2">{exClass.description}</p>

                                    {exClass.subclasses && (
                                        <div className="mt-3 pl-4 border-l-2 border-gray-700">
                                            <h6 className="text-md font-medium text-cyan-300 mb-2">
                                                {'Subclasses'}
                                            </h6>
                                            <div className="space-y-2">
                                                {exClass.subclasses.map((subclass, subIdx) => (
                                                    <div key={subIdx} className="bg-gray-800/50 p-3 rounded-lg">
                                                        <h6 className="text-pink-300 font-medium mb-1">{subclass.name}</h6>
                                                        <p className="text-gray-300 text-sm">{subclass.description}</p>
                                                    </div>
                                                ))}
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
    }, [content]);

    // Render exception types section
    const renderExceptionTypes = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'exception-types');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.types && section.types.map((type, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{type.type}</h4>
                            <p className="text-gray-300 mb-4">{type.description}</p>

                            {type.properties && (
                                <div className="mb-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        {'Properties'}
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {type.properties.map((prop, propIdx) => (
                                            <li key={propIdx} className="text-gray-300">{prop}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Examples */}
                            {type.examples && (
                                <div className="mb-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        {'Common Examples'}
                                    </h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {type.examples.map((example, exIdx) => (
                                            <div key={exIdx} className="bg-gray-800/50 p-3 rounded-lg">
                                                <h6 className="text-pink-300 font-medium mb-1">
                                                    {example.exception || example.error}
                                                </h6>
                                                <p className="text-gray-300 text-sm">{example.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Code examples */}
                            {type.code && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        {'Code Examples'}
                                    </h5>
                                    <div className="space-y-4">
                                        {type.code.map((codeExample, codeIdx) => (
                                            <div key={codeIdx}>
                                                <CodeBlock code={codeExample.snippet} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }, [content]);

    // Render exception handling mechanisms
    const renderHandlingMechanisms = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'handling-exceptions');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    {section.methods && section.methods.map((method, idx) => (
                        <div key={idx} className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-xl font-semibold text-purple-300 mb-3">{method.method}</h4>
                            <p className="text-gray-300 mb-4">{method.description}</p>

                            {method.components && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                    {method.components.map((component, compIdx) => (
                                        <div key={compIdx} className="bg-gray-800/50 p-3 rounded-lg">
                                            <h6 className="text-pink-300 font-medium mb-1">{component.name}</h6>
                                            <p className="text-gray-300 text-sm">{component.purpose}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {method.properties && (
                                <div className="mb-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        {'Key Points'}
                                    </h5>
                                    <ul className="list-disc list-inside space-y-1">
                                        {method.properties.map((prop, propIdx) => (
                                            <li key={propIdx} className="text-gray-300">{prop}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {method.code && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-medium text-cyan-300 mb-2">
                                        {'Example'}
                                    </h5>
                                    <CodeBlock code={method.code.snippet} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }, [content]);

    // Render custom exceptions section
    const renderCustomExceptions = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'custom-exceptions');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    {/* Steps to create custom exceptions */}
                    {section.steps && (
                        <div className="bg-gray-800/70 p-5 rounded-lg mb-6 border border-gray-700/30">
                            <h4 className="text-lg font-medium text-cyan-300 mb-3">
                                {'Steps to Create'}
                            </h4>
                            <ul className="list-decimal list-inside space-y-2">
                                {section.steps.map((step, stepIdx) => (
                                    <li key={stepIdx} className="text-gray-300">{step}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Best practices */}
                    {section.bestPractices && (
                        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 mb-6">
                            <h4 className="text-lg font-medium text-cyan-300 mb-2">
                                {'Best Practices'}
                            </h4>
                            <ul className="list-disc list-inside space-y-1">
                                {section.bestPractices.map((practice, practiceIdx) => (
                                    <li key={practiceIdx} className="text-gray-300">{practice}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Examples */}
                    {section.examples && (
                        <div className="space-y-6">
                            <h4 className="text-lg font-medium text-cyan-300 mb-3">
                                Example Implementations
                            </h4>
                            {section.examples.map((example, exIdx) => (
                                <div key={exIdx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/30">
                                    <div className="flex items-center mb-3">
                                        <span className="bg-purple-500/20 rounded-md px-2 py-1 text-xs text-purple-300 mr-2">
                                            {example.type}
                                        </span>
                                        <h5 className="text-lg font-medium text-purple-300">{example.name}</h5>
                                    </div>
                                    <CodeBlock code={example.code} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }, [content]);

    // Render best practices section
    const renderBestPractices = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'best-practices');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.practices && (
                        <div className="space-y-6">
                            {section.practices.map((practice, idx) => (
                                <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/30">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        <h4 className="text-lg font-medium text-purple-300">{practice.practice}</h4>
                                    </div>
                                    <p className="text-gray-300 mb-4">{practice.description}</p>

                                    {practice.code && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {practice.code.bad && (
                                                <div>
                                                    <h5 className="flex items-center gap-2 mb-2">
                                                        <XCircle className="w-4 h-4 text-red-400" />
                                                        <span className="text-red-400 font-medium">
                                                            {'Bad Practice'}
                                                        </span>
                                                    </h5>
                                                    <div className="bg-red-900/10 border border-red-500/20 rounded-lg">
                                                        <CodeBlock code={practice.code.bad} />
                                                    </div>
                                                </div>
                                            )}

                                            {practice.code.good && (
                                                <div>
                                                    <h5 className="flex items-center gap-2 mb-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                        <span className="text-green-400 font-medium">
                                                            {'Good Practice'}
                                                        </span>
                                                    </h5>
                                                    <div className="bg-green-900/10 border border-green-500/20 rounded-lg">
                                                        <CodeBlock code={practice.code.good} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {practice.code && practice.code.language && !practice.code.bad && !practice.code.good && (
                                        <div className="mt-4">
                                            <CodeBlock code={practice.code.snippet} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }, [content]);

    // Render multithreaded exceptions section
    const renderMultiThreadedExceptions = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'multi-threaded-exceptions');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>

                    {section.concepts && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {section.concepts.map((concept, conceptIdx) => (
                                <div key={conceptIdx} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/30">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">{concept.name}</h4>
                                    <p className="text-gray-300 text-sm">{concept.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {section.code && (
                        <div className="space-y-6">
                            {section.code.map((codeExample, codeIdx) => (
                                <div key={codeIdx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/30">
                                    <h4 className="text-lg font-medium text-cyan-300 mb-3">{codeExample.description}</h4>
                                    <CodeBlock code={codeExample.snippet} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }, [content]);

    // Render try-catch order section
    const renderTryCatchOrder = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'try-catch-order');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-300 mb-6">{section.description}</p>

                    <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            <h4 className="text-lg font-medium text-yellow-400">
                                {'Important Rule'}
                            </h4>
                        </div>
                        <p className="text-gray-300">{section.rule}</p>
                    </div>

                    {section.code && (
                        <div className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/30">
                            <h4 className="text-lg font-medium text-cyan-300 mb-3">
                                {'Example'}
                            </h4>
                            <CodeBlock code={section.code} />
                        </div>
                    )}
                </div>
            </div>
        );
    }, [content]);

    // Optimized QuestionCard component with memo
    const QuestionCard = memo(({ question, answer, code }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        const toggleExpanded = useCallback(() => {
            setIsExpanded(prev => !prev);
        }, []);

        return (
            <div className={`bg-gray-800/60 rounded-xl overflow-hidden transition-all duration-300 border border-gray-700/50 ${
                isExpanded ? 'shadow-lg border-cyan-500/30' : 'hover:border-gray-600'
            }`}>
                <button
                    onClick={toggleExpanded}
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

                                        // Format plain text with possible markdown
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

                        {/* Render code examples if provided separately */}
                        {code && (
                            <div className="mt-4">
                                {typeof code === 'string' ? (
                                    <CodeBlock code={code} />
                                ) : Array.isArray(code) ? (
                                    <div className="space-y-4">
                                        {code.map((codeEx, codeIdx) => (
                                            <div key={codeIdx}>
                                                {codeEx.name && (
                                                    <h5 className="text-sm font-medium text-cyan-300 mb-2">{codeEx.name}</h5>
                                                )}
                                                <CodeBlock code={codeEx.snippet} />
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    });

    QuestionCard.displayName = 'QuestionCard';

    // Render interview questions section
    const renderInterviewQuestions = useCallback(() => {
        const section = content.topics.find(topic => topic.id === 'interview-questions');
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20 shadow-lg">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-3">
                        {section.title}
                    </h3>
                    <p className="text-gray-300">
                        Common Java exception-related questions in technical interviews.
                    </p>
                </div>

                <div className="space-y-4">
                    {section.questions && section.questions.map((qa, idx) => (
                        <QuestionCard
                            key={idx}
                            question={qa.question}
                            answer={qa.answer}
                            code={qa.code}
                        />
                    ))}
                </div>
            </div>
        );
    }, [content]);

    // Optimized content rendering with memoized section getter
    const getContent = useCallback(() => {
        switch (activeTab) {
            case 'overview': return renderOverview();
            case 'hierarchy': return renderHierarchy();
            case 'types': return renderExceptionTypes();
            case 'handling': return renderHandlingMechanisms();
            case 'custom': return renderCustomExceptions();
            case 'best-practices': return renderBestPractices();
            case 'multi-threaded': return renderMultiThreadedExceptions();
            case 'try-catch-order': return renderTryCatchOrder();
            case 'interview': return renderInterviewQuestions();
            default: return renderOverview();
        }
    }, [
        activeTab, renderOverview, renderHierarchy, renderExceptionTypes,
        renderHandlingMechanisms, renderCustomExceptions, renderBestPractices,
        renderMultiThreadedExceptions, renderTryCatchOrder, renderInterviewQuestions
    ]);

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{content.title}</h1>
                <p className="text-gray-300">
                    A comprehensive guide to Java exceptions and error handling
                </p>
            </div>

            {/* Tab Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {getContent()}
            </div>
        </div>
    );
};

export default ExceptionsPage;
