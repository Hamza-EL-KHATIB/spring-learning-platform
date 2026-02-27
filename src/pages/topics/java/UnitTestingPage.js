import React, { useState, useMemo, useCallback } from 'react';
import {
    Cpu, Code, FileText, Book, GitBranch,
    AlertTriangle, CheckCircle, Shield, Target, Zap,
    Server, Terminal, Package
} from 'lucide-react';
import unitTestingJsonEn from '../../../data/java/unit-testing.json';
import CodeBlock from '../../../components/CodeBlock';
import FloatingMenu from '../../../components/layout/FloatingMenu';

const UnitTestingPage = () => {
    const unitTestingJson = unitTestingJsonEn;

    // Get active topic from the first topic ID or from localStorage
    const defaultTopicId = unitTestingJson.topics?.[0]?.id || 'core-concepts';
    const [activeTopic, setActiveTopic] = useState(() => {
        return localStorage.getItem('unitTestingActiveTopic') || defaultTopicId;
    });

    // Define icon mapping for different topic IDs
    const iconMap = useMemo(() => ({
        'core-concepts': <Cpu />,
        'unit-testing-fundamentals': <Code />,
        'junit5': <Terminal />,
        'tdd': <GitBranch />,
        'mockito': <Shield />,
        'test-doubles': <Package />,
        'spring-boot-testing': <Server />,
        'testing-best-practices': <CheckCircle />,
        'test-coverage': <Target />,
        'interview-questions': <Book />,
        'advanced-testing-topics': <Zap />,
        'interview-coding-challenges': <AlertTriangle />,
        'resources': <FileText />
    }), []);

    // Save active topic to localStorage
    const handleTopicChange = useCallback((topicId) => {
        setActiveTopic(topicId);
        localStorage.setItem('unitTestingActiveTopic', topicId);
    }, []);

    // Generate tabs based on JSON topics
    const tabs = useMemo(() =>
        unitTestingJson.topics?.map(topic => ({
            id: topic.id,
            title: topic.title,
            icon: iconMap[topic.id] || <Code />
        })) || [], [unitTestingJson.topics, iconMap]);

    const TopicNavigation = useCallback(({ activeTopic, onTopicChange, topics }) => (
        <div className="mb-4 flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
                {topics.map((topic) => (
                    <button
                        key={topic.id}
                        onClick={() => onTopicChange(topic.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTopic === topic.id
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-gray-300'
                        }`}
                    >
                        {topic.icon && <span>{topic.icon}</span>}
                        <span>{topic.title}</span>
                    </button>
                ))}
        </div>
    ), []);
    useCallback(({ title, children, className = "" }) => (
        <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 ${className}`}>
            {title && (
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                    {title}
                </h3>
            )}
            {children}
        </div>
    ), []);
// Helper function to safely get string content from code objects
    const getCodeString = useCallback((codeObj) => {
        if (!codeObj) return '';

        // If it's already a string, return it
        if (typeof codeObj === 'string') {
            return codeObj;
        }

        // Check for the specific case mentioned in the error (object with language and snippet)
        if (codeObj.language !== undefined && codeObj.snippet !== undefined) {
            return typeof codeObj.snippet === 'string' ? codeObj.snippet : JSON.stringify(codeObj.snippet);
        }

        // Handle other object formats
        if (codeObj.snippet !== undefined) {
            return typeof codeObj.snippet === 'string' ? codeObj.snippet : JSON.stringify(codeObj.snippet);
        }

        if (codeObj.code !== undefined) {
            return typeof codeObj.code === 'string' ? codeObj.code : JSON.stringify(codeObj.code);
        }

        if (codeObj.content !== undefined) {
            return typeof codeObj.content === 'string' ? codeObj.content : JSON.stringify(codeObj.content);
        }

        // If all else fails, convert the object to a string
        return JSON.stringify(codeObj, null, 2);
    }, []);

    const renderTable = useCallback((table) => {
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
    }, []);

    const renderListItems = useCallback((items) => {
        if (!items || !items.length) return null;

        return (
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                {items.map((item, idx) => (
                    <li key={idx} className="ml-2">
                        {typeof item === 'string' ? item : item?.name || item?.title || JSON.stringify(item)}
                        {item?.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 ml-2"
                            >
                                (Link)
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        );
    }, []);

    const renderFeatures = useCallback((features) => {
        if (!features || !features.length) return null;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-purple-500/20 rounded-md">
                                <Code className="w-4 h-4 text-purple-400" />
                            </div>
                            <h4 className="text-lg font-medium text-purple-300">{feature?.name || 'Feature'}</h4>
                        </div>
                        <p className="text-gray-300 text-sm">{feature?.description || ''}</p>
                        {feature?.interviewRelevance && (
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
        );
    }, []);

    const renderPatterns = useCallback((patterns) => {
        if (!patterns || !patterns.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {patterns.map((pattern, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{pattern?.name || 'Pattern'}</h4>
                        <p className="text-gray-300 mb-3">{pattern?.description || ''}</p>
                        {pattern?.steps && pattern.steps.length > 0 && (
                            <div className="mb-4">
                                <h5 className="text-md font-medium text-cyan-300 mb-2">
                                    {'Steps:'}
                                </h5>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    {pattern.steps.map((step, stepIdx) => (
                                        <li key={stepIdx} className="ml-2">{step}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {pattern?.code && <CodeBlock code={getCodeString(pattern.code)} />}
                    </div>
                ))}
            </div>
        );
    }, [getCodeString]);

    const renderExamples = useCallback((examples) => {
        if (!examples) return null;

        // Convert to array if it's not already
        const examplesArray = Array.isArray(examples) ? examples : [examples];

        return (
            <div className="space-y-4 mb-6">
                {examplesArray.map((example, index) => (
                    <div key={index} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                        {example?.title && (
                            <h4 className="text-lg font-medium text-purple-300 mb-2">{example.title}</h4>
                        )}
                        {example?.description && (
                            <p className="text-gray-300 mb-2">{example.description}</p>
                        )}
                        {(example?.snippet || example?.code) && (
                            <CodeBlock code={getCodeString(example)} />
                        )}
                    </div>
                ))}
            </div>
        );
    }, [getCodeString]);

    const renderQuestions = useCallback((questions) => {
        if (!questions || !questions.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {questions.map((question, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{question?.question || 'Question'}</h4>
                        {question?.answer && (
                            <div className="text-gray-300 whitespace-pre-line mb-4">
                                {question.answer}
                            </div>
                        )}
                        {question?.code && <CodeBlock code={getCodeString(question.code)} />}
                    </div>
                ))}
            </div>
        );
    }, [getCodeString]);

    const renderTopics = useCallback((topics) => {
        if (!topics || !topics.length) return null;

        // Helper to safely convert any value to string
        const safeToString = (value) => {
            if (value === null || value === undefined) return '';
            if (typeof value === 'string') return value;
            return typeof value === 'object' ? JSON.stringify(value) : String(value);
        };

        return (
            <div className="space-y-6 mb-6">
                {topics.map((topic, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{safeToString(topic?.name || 'Topic')}</h4>

                        {topic?.description && (
                            <p className="text-gray-300 mb-3">{safeToString(topic.description)}</p>
                        )}

                        {topic?.benefits && topic.benefits.length > 0 && (
                            <div className="mb-4">
                                <h5 className="text-md font-medium text-cyan-300 mb-2">Benefits:</h5>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    {topic.benefits.map((benefit, benefitIdx) => (
                                        <li key={benefitIdx} className="ml-2">{safeToString(benefit)}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {topic?.implementation && (
                            <div className="mb-4">
                                <h5 className="text-md font-medium text-cyan-300 mb-2">Implementation:</h5>
                                <div className="text-gray-300 mb-2">{safeToString(topic.implementation)}</div>
                            </div>
                        )}

                        {topic?.code && (
                            <div className="mb-4">
                                <h5 className="text-md font-medium text-cyan-300 mb-2">Code Example:</h5>
                                <CodeBlock code={getCodeString(topic.code)} />
                            </div>
                        )}

                        {topic?.configuration && (
                            <div className="mb-4">
                                <h5 className="text-md font-medium text-cyan-300 mb-2">Configuration:</h5>
                                <CodeBlock code={getCodeString(topic.configuration)} />
                            </div>
                        )}

                        {topic?.tool && (
                            <div className="text-gray-300 mb-2">
                                <span className="font-medium">Tool: </span>{safeToString(topic.tool)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }, [getCodeString]);

    const renderBestPractices = useCallback((bestPractices) => {
        if (!bestPractices || !bestPractices.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {bestPractices.map((practice, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{practice?.title || 'Best Practice'}</h4>
                        {practice?.description && (
                            <p className="text-gray-300 mb-3">{practice.description}</p>
                        )}

                        {practice?.items && practice.items.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                {practice.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="ml-2">{item}</li>
                                ))}
                            </ul>
                        )}

                        {practice?.formats && practice.formats.length > 0 && (
                            <div className="mt-4">
                                <h5 className="text-md font-medium text-cyan-300 mb-2">
                                    Formats:
                                </h5>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    {practice.formats.map((format, formatIdx) => (
                                        <li key={formatIdx} className="ml-2">{format}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {practice?.code && (
                            <div className="mt-4">
                                <h5 className="text-md font-medium text-cyan-300 mb-2">
                                    Code Example:
                                </h5>
                                <CodeBlock code={getCodeString(practice.code)} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }, [getCodeString]);

    const renderChallenges = useCallback((challenges) => {
        if (!challenges || !challenges.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {challenges.map((challenge, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{challenge?.title || 'Challenge'}</h4>
                        {challenge?.description && (
                            <p className="text-gray-300 mb-3">{challenge.description}</p>
                        )}

                        {challenge?.code && (
                            <div>
                                <CodeBlock code={getCodeString(challenge.code)} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }, [getCodeString]);

    const renderCategories = useCallback((categories) => {
        if (!categories || !categories.length) return null;

        return (
            <div className="space-y-6 mb-6">
                {categories.map((category, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-5 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-3">{category?.name || 'Category'}</h4>
                        {category?.items && renderListItems(category.items)}
                    </div>
                ))}
            </div>
        );
    }, [renderListItems]);

    const renderTypes = useCallback((types) => {
        if (!types || !types.length) return null;

        return (
            <div className="space-y-4 mb-6">
                {types.map((type, idx) => (
                    <div key={idx} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-medium text-purple-300 mb-2">{type?.name || 'Type'}</h4>
                        {type?.purpose && (
                            <p className="text-gray-300 mb-2">{type.purpose}</p>
                        )}
                        {type?.implementation && (
                            <div className="text-gray-300">
                                <span className="font-medium">Implementation: </span>
                                <code className="bg-gray-900/50 px-2 py-1 rounded text-pink-300 text-sm">
                                    {type.implementation}
                                </code>
                            </div>
                        )}
                        {type?.example && (
                            <div className="mt-3">
                                <h5 className="text-sm font-medium text-cyan-300 mb-1">Example:</h5>
                                <code className="block bg-gray-900/50 px-3 py-2 rounded text-gray-300 text-sm overflow-x-auto whitespace-pre">
                                    {type.example}
                                </code>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }, []);

    const renderTestSlices = useCallback((slices) => {
        if (!slices || !slices.length) return null;

        return (
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-gray-800/70 rounded-lg">
                    <thead>
                    <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-left text-sm text-gray-400">Annotation</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-400">Purpose</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-400">Loads</th>
                    </tr>
                    </thead>
                    <tbody>
                    {slices.map((slice, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                            <td className="py-3 px-4 text-purple-300 font-mono">{slice?.annotation || ''}</td>
                            <td className="py-3 px-4 text-gray-300">{slice?.purpose || ''}</td>
                            <td className="py-3 px-4 text-gray-300">{slice?.loads || ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }, []);

    const renderSubsections = useCallback((subsections) => {
        if (!subsections || !subsections.length) return null;

        return (
            <>
                {subsections.map((subsection, idx) => (
                    <div key={idx} className="mb-8">
                        {subsection?.title && (
                            <h3 className="text-xl font-semibold text-white mb-4">{subsection.title}</h3>
                        )}

                        {subsection?.content && (
                            <p className="text-gray-300 mb-4">{subsection.content}</p>
                        )}

                        {subsection?.tables && subsection.tables.length > 0 && subsection.tables.map((table, tableIdx) => (
                            <div key={tableIdx} className="mb-6">
                                {renderTable(table)}
                            </div>
                        ))}

                        {subsection?.code && (
                            <div className="mb-6">
                                <CodeBlock code={getCodeString(subsection.code)} />
                            </div>
                        )}

                        {subsection?.features && subsection.features.length > 0 && (
                            <div>
                                {subsection.features.map((feature, featureIdx) => (
                                    <div key={featureIdx} className="mb-6">
                                        <h4 className="text-lg font-medium text-cyan-300 mb-3">{feature?.name || 'Feature'}</h4>
                                        {feature?.code && <CodeBlock code={getCodeString(feature.code)} />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </>
        );
    }, [renderTable, getCodeString]);

    const renderContent = useCallback(() => {
        const topic = unitTestingJson.topics?.find(t => t.id === activeTopic);
        if (!topic) return null;

        return (
            <div>
                <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10
                               backdrop-blur rounded-xl border border-purple-500/20 p-8 mb-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text
                                 bg-gradient-to-r from-purple-300 to-pink-300">
                        {topic.title}
                    </h2>
                    <p className="text-gray-300 mt-2">{topic.description}</p>
                </div>

                {/* Core concepts overview */}
                {topic.id === 'core-concepts' && topic.features && (
                    <div className="mb-8">
                        {renderFeatures(topic.features)}
                    </div>
                )}

                {/* Unit testing fundamentals */}
                {topic.id === 'unit-testing-fundamentals' && (
                    <div className="mb-8">
                        {topic.characteristics && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Characteristics'}
                                </h3>
                                {renderListItems(topic.characteristics)}
                            </div>
                        )}
                        {topic.patterns && renderPatterns(topic.patterns)}
                        {topic.example && renderExamples(topic.example)}
                    </div>
                )}

                {/* JUnit 5 */}
                {topic.id === 'junit5' && topic.subsections && (
                    <div className="mb-8">
                        {renderSubsections(topic.subsections)}
                    </div>
                )}

                {/* TDD */}
                {topic.id === 'tdd' && (
                    <div className="mb-8">
                        {topic.process && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'TDD Process'}
                                </h3>
                                {renderListItems(topic.process)}
                            </div>
                        )}
                        {topic.benefits && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Benefits'}
                                </h3>
                                {renderListItems(topic.benefits)}
                            </div>
                        )}
                        {topic.example && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Example'}
                                </h3>
                                {renderExamples(topic.example)}
                            </div>
                        )}
                    </div>
                )}

                {/* Mockito */}
                {topic.id === 'mockito' && (
                    <div className="mb-8">
                        {topic.concepts && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Key Concepts'}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {topic.concepts.map((concept, idx) => (
                                        <div key={idx} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
                                            <h4 className="text-lg font-medium text-purple-300 mb-1">{concept?.name || 'Concept'}</h4>
                                            <p className="text-gray-300 text-sm">{concept?.description || ''}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {topic.examples && topic.examples.length > 0 && topic.examples.map((example, idx) => (
                            <div key={idx} className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">{example?.title || `Example ${idx + 1}`}</h3>
                                {example?.code && <CodeBlock code={getCodeString(example.code)} />}
                            </div>
                        ))}
                    </div>
                )}

                {/* Test Doubles */}
                {topic.id === 'test-doubles' && topic.types && (
                    <div className="mb-8">
                        {renderTypes(topic.types)}
                    </div>
                )}

                {/* Spring Boot Testing */}
                {topic.id === 'spring-boot-testing' && (
                    <div className="mb-8">
                        {topic.testSlices && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Test Slices'}
                                </h3>
                                {renderTestSlices(topic.testSlices)}
                            </div>
                        )}
                        {topic.examples && topic.examples.length > 0 && topic.examples.map((example, idx) => (
                            <div key={idx} className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">{example?.title || `Example ${idx + 1}`}</h3>
                                {example?.code && <CodeBlock code={getCodeString(example.code)} />}
                            </div>
                        ))}
                    </div>
                )}

                {/* Testing Best Practices */}
                {topic.id === 'testing-best-practices' && topic.bestPractices && (
                    <div className="mb-8">
                        {renderBestPractices(topic.bestPractices)}
                    </div>
                )}

                {/* Test Coverage */}
                {topic.id === 'test-coverage' && (
                    <div className="mb-8">
                        {topic.coverageTypes && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Coverage Types'}
                                </h3>
                                {renderListItems(topic.coverageTypes)}
                            </div>
                        )}
                        {topic.tools && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Tools'}
                                </h3>
                                {renderListItems(topic.tools)}
                            </div>
                        )}
                        {topic.configuration && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Configuration Example'}
                                </h3>
                                <CodeBlock code={getCodeString(topic.configuration)} />
                            </div>
                        )}
                        {topic.bestPractices && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {'Best Practices'}
                                </h3>
                                {renderListItems(topic.bestPractices)}
                            </div>
                        )}
                    </div>
                )}

                {/* Interview Questions */}
                {topic.id === 'interview-questions' && topic.questions && (
                    <div className="mb-8">
                        {renderQuestions(topic.questions)}
                    </div>
                )}

                {/* Advanced Testing Topics */}
                {topic.id === 'advanced-testing-topics' && topic.topics && (
                    <div className="mb-8">
                        {renderTopics(topic.topics)}
                    </div>
                )}

                {/* Interview Coding Challenges */}
                {topic.id === 'interview-coding-challenges' && topic.challenges && (
                    <div className="mb-8">
                        {renderChallenges(topic.challenges)}
                    </div>
                )}

                {/* Resources */}
                {topic.id === 'resources' && topic.categories && (
                    <div className="mb-8">
                        {renderCategories(topic.categories)}
                    </div>
                )}
            </div>
        );
    }, [
        unitTestingJson.topics,
        activeTopic,
        renderFeatures,
        renderListItems,
        renderPatterns,
        renderExamples,
        renderSubsections,
        renderTypes,
        renderTestSlices,
        renderQuestions,
        renderTopics,
        renderBestPractices,
        renderChallenges,
        renderCategories,
        getCodeString
    ]);

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-purple-500/30 shadow-md">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {unitTestingJson.title || 'Unit Testing in Java'}
                </h1>
                {unitTestingJson.tags && unitTestingJson.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {unitTestingJson.tags.map((tag, idx) => (
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
                {renderContent()}
            </div>
        </div>
    );
};

export default UnitTestingPage;