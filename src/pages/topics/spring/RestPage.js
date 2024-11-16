import React, { useState, useRef, useEffect } from 'react';
import restJson from '../../../data/spring/rest.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RestPage = () => {
    const [activeTab, setActiveTab] = useState(restJson.topics[0].id);
    const tabsRef = useRef(null);

    // Add custom scrollbar styles
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
           .custom-scrollbar {
               scroll-behavior: smooth;
               -webkit-overflow-scrolling: touch;
           }
           
           .custom-scrollbar::-webkit-scrollbar {
               height: 6px;
               background: transparent;
           }
           
           .custom-scrollbar::-webkit-scrollbar-thumb {
               background: #4fd1c5;
               border-radius: 3px;
           }
           
           .custom-scrollbar::-webkit-scrollbar-track {
               background: rgba(255, 255, 255, 0.1);
               border-radius: 3px;
           }
       `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const TabNavigation = () => {
        return (
            <div className="relative mb-8">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

                <div
                    ref={tabsRef}
                    className="flex overflow-x-auto custom-scrollbar py-2"
                >
                    <div className="flex space-x-2 px-8">
                        {restJson.topics.map((topic) => (
                            <button
                                key={topic.id}
                                onClick={() => setActiveTab(topic.id)}
                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors shadow-lg ${
                                    activeTab === topic.id
                                        ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 shadow-cyan-500/50'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 shadow-gray-900/50'
                                }`}
                            >
                                {topic.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderRestFundamentals = (concepts) => (
        concepts && concepts.map((concept, idx) => (
            <div key={idx} className="mb-8 bg-blue-900/50 rounded-xl p-6 border border-blue-400 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">{concept.name}</h3>

                {concept.principles && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {concept.principles.map((principle, pIdx) => (
                            <div key={pIdx} className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/20">
                                <h4 className="text-lg font-semibold text-cyan-400 mb-2">{principle.name}</h4>
                                <p className="text-gray-300">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {concept.methods && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {concept.methods.map((method, mIdx) => (
                            <div key={mIdx} className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/20">
                                <h4 className="text-lg font-semibold text-cyan-400 mb-2">{method.method}</h4>
                                <p className="text-gray-300 mb-2">{method.usage}</p>
                                <div className="text-sm">
                                    <span className="text-pink-400">{method.annotation}</span>
                                    <span className="text-gray-400 ml-2">
                                   {method.idempotent ? '(Idempotent)' : '(Non-idempotent)'}
                               </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))
    );

    const renderRestControllers = (components) => (
        components && components.map((component, idx) => (
            <div key={idx} className="mb-8 bg-purple-900/50 rounded-xl p-6 border border-purple-400 shadow-lg">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">{component.name}</h3>
                <p className="text-gray-100 mb-6">{component.description}</p>

                {component.example && (
                    <div className="mb-6">
                        <SyntaxHighlighter
                            language="java"
                            style={oneDark}
                            customStyle={{
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                backgroundColor: 'rgb(31, 41, 55)',
                            }}
                        >
                            {component.example.code}
                        </SyntaxHighlighter>
                    </div>
                )}

                {component.types && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {component.types.map((type, tIdx) => (
                            <div key={tIdx} className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20">
                                <h4 className="text-lg font-semibold text-pink-400 mb-2">{type.annotation}</h4>
                                <p className="text-gray-300 mb-2">{type.description}</p>
                                {type.example && (
                                    <code className="text-sm text-gray-400">{type.example}</code>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {component.annotations && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {component.annotations.map((annotation, aIdx) => (
                            <div key={aIdx} className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20">
                                <h4 className="text-lg font-semibold text-pink-400 mb-2">{annotation.name}</h4>
                                <p className="text-gray-300 mb-2">{annotation.description}</p>
                                {annotation.example && (
                                    <code className="text-sm text-gray-400">{annotation.example}</code>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))
    );

    const renderResponseHandling = (features) => (
        features && features.map((feature, idx) => (
            <div key={idx} className="mb-8 bg-teal-900/50 rounded-xl p-6 border border-teal-400 shadow-lg">
                <h3 className="text-2xl font-bold text-teal-300 mb-4">{feature.name}</h3>
                <p className="text-gray-100 mb-6">{feature.description}</p>

                {feature.example && (
                    <div className="mb-6">
                        <SyntaxHighlighter
                            language="java"
                            style={oneDark}
                            customStyle={{
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                backgroundColor: 'rgb(31, 41, 55)',
                            }}
                        >
                            {feature.example.code}
                        </SyntaxHighlighter>
                    </div>
                )}

                {feature.commonCodes && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {feature.commonCodes.map((code, cIdx) => (
                            <div key={cIdx} className="bg-gray-800/50 p-4 rounded-lg border border-teal-500/20">
                                <h4 className="text-lg font-semibold text-cyan-400 mb-2">{code.code}</h4>
                                <p className="text-gray-300">{code.usage}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))
    );

    const renderErrorHandling = (components) => (
        components && components.map((component, idx) => (
            <div key={idx} className="mb-8 bg-red-900/50 rounded-xl p-6 border border-red-400 shadow-lg">
                <h3 className="text-2xl font-bold text-red-300 mb-4">{component.name}</h3>
                <p className="text-gray-100 mb-6">{component.description}</p>

                {component.example && (
                    <div className="mb-6">
                        <SyntaxHighlighter
                            language="java"
                            style={oneDark}
                            customStyle={{
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                backgroundColor: 'rgb(31, 41, 55)',
                            }}
                        >
                            {component.example.code}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        ))
    );

    const renderContentNegotiation = (features) => (
        features && features.map((feature, idx) => (
            <div key={idx} className="mb-8 bg-indigo-900/50 rounded-xl p-6 border border-indigo-400 shadow-lg">
                <h3 className="text-2xl font-bold text-indigo-300 mb-4">{feature.name}</h3>

                {feature.types && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {feature.types.map((type, tIdx) => (
                            <div key={tIdx} className="bg-gray-800/50 p-4 rounded-lg border border-indigo-500/20">
                                <h4 className="text-lg font-semibold text-cyan-400 mb-2">{type.type}</h4>
                                <p className="text-gray-300 mb-2">{type.description}</p>
                                {type.example && (
                                    <code className="text-sm text-pink-400">{type.example}</code>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {feature.headers && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feature.headers.map((header, hIdx) => (
                            <div key={hIdx} className="bg-gray-800/50 p-4 rounded-lg border border-indigo-500/20">
                                <h4 className="text-lg font-semibold text-cyan-400 mb-2">{header.name}</h4>
                                <p className="text-gray-300">{header.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))
    );

    const renderSecurity = (features) => (
        features && features.map((feature, idx) => (
            <div key={idx} className="mb-8 bg-green-900/50 rounded-xl p-6 border border-green-400 shadow-lg">
                <h3 className="text-2xl font-bold text-green-300 mb-4">{feature.name}</h3>

                {Array.isArray(feature.methods) && (
                    <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {feature.methods.map((method, mIdx) => (
                                <div key={mIdx} className="bg-gray-800/50 p-3 rounded-lg border border-green-500/20">
                                    <span className="text-gray-300">{method}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {feature.annotations && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feature.annotations.map((annotation, aIdx) => (
                            <div key={aIdx} className="bg-gray-800/50 p-4 rounded-lg border border-green-500/20">
                                <h4 className="text-lg font-semibold text-cyan-400 mb-2">{annotation.name}</h4>
                                <code className="text-sm text-pink-400">{annotation.example}</code>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))
    );

    const renderTesting = (types) => (
        types && types.map((type, idx) => (
            <div key={idx} className="mb-8 bg-yellow-900/50 rounded-xl p-6 border border-yellow-400 shadow-lg">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">{type.name}</h3>
                <p className="text-gray-100 mb-6">{type.description}</p>

                {type.example && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/20">
                        <SyntaxHighlighter
                            language="java"
                            style={oneDark}
                            customStyle={{
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                backgroundColor: 'rgb(31, 41, 55)',
                            }}
                        >
                            {type.example.code}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        ))
    );

    const renderBestPractices = (practices) => (
        practices && practices.map((practice, idx) => (
            <div key={idx} className="mb-8 bg-cyan-900/50 rounded-xl p-6 border border-cyan-400 shadow-lg">
                {practice.category && (
                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">{practice.category}</h3>
                )}

                {practice.recommendations && (
                    <div className="mb-6">
                        <ul className="list-disc list-inside text-gray-100 space-y-2">
                            {practice.recommendations.map((rec, rIdx) => (
                                <li key={rIdx}>{rec}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {practice.strategies && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {practice.strategies.map((strategy, sIdx) => (
                            <div key={sIdx} className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/20">
                                <h4 className="text-lg font-semibold text-pink-400 mb-2">{strategy.name}</h4>
                                <code className="text-sm text-gray-300">{strategy.example}</code>
                            </div>
                        ))}
                    </div>
                )}

                {practice.tools && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {practice.tools.map((tool, tIdx) => (
                            <div key={tIdx} className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/20">
                                <h4 className="text-lg font-semibold text-pink-400 mb-2">{tool.name}</h4>
                                <p className="text-gray-300">{tool.usage}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20 shadow-lg">
                <h1 className="text-4xl font-extrabold text-white mb-2">{restJson.title}</h1>
            </div>

            {/* Navigation Tabs */}
            <TabNavigation />

            {/* Content Section */}
            <div className="space-y-8">
                {activeTab === 'rest-basics' && (
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{restJson.topics[0].title}</h2>
                        </div>
                        <p className="text-gray-200 mb-6">{restJson.topics[0].description}</p>
                        {renderRestFundamentals(restJson.topics[0].concepts)}
                    </div>
                )}

                {activeTab === 'rest-controllers' && (
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{restJson.topics[1].title}</h2>
                        </div>
                        <p className="text-gray-200 mb-6">{restJson.topics[1].description}</p>
                        {renderRestControllers(restJson.topics[1].components)}
                    </div>
                )}

                {activeTab === 'response-handling' && (
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{restJson.topics[2].title}</h2>
                        </div>
                        <p className="text-gray-200 mb-6">{restJson.topics[2].description}</p>
                        {renderResponseHandling(restJson.topics[2].features)}
                    </div>
                )}

                {activeTab === 'error-handling' && (
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{restJson.topics[3].title}</h2>
                        </div>
                        <p className="text-gray-200 mb-6">{restJson.topics[3].description}</p>
                        {renderErrorHandling(restJson.topics[3].components)}
                    </div>
                )}

                {activeTab === 'content-negotiation' && (
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{restJson.topics[4].title}</h2>
                        </div>
                        <p className="text-gray-200 mb-6">{restJson.topics[4].description}</p>
                        {renderContentNegotiation(restJson.topics[4].features)}
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{restJson.topics[5].title}</h2>
                        </div>
                        <p className="text-gray-200 mb-6">{restJson.topics[5].description}</p>
                        {renderSecurity(restJson.topics[5].features)}
                    </div>
                )}

                {activeTab === 'testing' && (
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{restJson.topics[6].title}</h2>
                        </div>
                        <p className="text-gray-200 mb-6">{restJson.topics[6].description}</p>
                        {renderTesting(restJson.topics[6].types)}
                    </div>
                )}

                {activeTab === 'best-practices' && (
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{restJson.topics[7].title}</h2>
                        </div>
                        <p className="text-gray-200 mb-6">{restJson.topics[7].description}</p>
                        {renderBestPractices(restJson.topics[7].practices)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestPage;