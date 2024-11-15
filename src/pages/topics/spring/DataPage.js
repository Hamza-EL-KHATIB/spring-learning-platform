import React, { useState, useRef, useEffect } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import data from '../../../data/spring/data.json';

const DataPage = () => {
    const [activeTab, setActiveTab] = useState(data.topics[0].id);
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
        // Function to scroll tab into view when clicked
        const scrollTabIntoView = (element) => {
            if (!element) return;

            const container = tabsRef.current;
            const scrollLeft = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;

            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        };

        return (
            <div className="relative mb-8">
                {/* Gradient fade effects */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

                {/* Scrollable tabs */}
                <div
                    ref={tabsRef}
                    className="flex overflow-x-auto custom-scrollbar py-2"
                >
                    <div className="flex space-x-2 px-8">
                        {data.topics.map((topic) => (
                            <button
                                key={topic.id}
                                onClick={(e) => {
                                    setActiveTab(topic.id);
                                    scrollTabIntoView(e.currentTarget);
                                }}
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

    const renderCodeBlock = (code, language = 'java') => (
        <div className="relative">
            <CopyBlock
                text={code}
                language={language}
                theme={dracula}
                wrapLines
                customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'rgb(31, 41, 55)',
                    overflow: 'auto'
                }}
            />
        </div>
    );

    const renderMethods = (methods) => (
        <div className="space-y-4">
            {methods.map((method, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-2">{method.name}</h4>
                    <p className="text-gray-300 mb-2">{method.usage}</p>
                    <code className="text-pink-400 text-sm">{method.example}</code>
                </div>
            ))}
        </div>
    );

    const renderOperators = (operators) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operators.map((op, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-2">{op.name}</h4>
                    <code className="text-pink-400 text-sm">{op.example}</code>
                </div>
            ))}
        </div>
    );

    const renderPractices = (categories) => (
        <div className="space-y-6">
            {categories.map((category, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-3">{category.name}</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {category.practices.map((practice, pIndex) => (
                            <li key={pIndex} className="text-gray-300">{practice}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderAttributes = (attributes) => (
        <div className="space-y-6">
            {attributes.map((attr, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-3">@{attr.name}</h4>
                    <div className="grid grid-cols-1 gap-2">
                        {attr.values.map((value, vIndex) => (
                            <div key={vIndex}
                                 className="text-gray-300 bg-gray-700/50 px-3 py-2 rounded">
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Title */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300 mb-4">
                    {data.title}
                </h1>
            </div>

            {/* Navigation Tabs */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {data.topics.map((topic) => (
                    <div key={topic.id} className={activeTab === topic.id ? '' : 'hidden'}>
                        {/* Concepts Section */}
                        {topic.concepts && topic.concepts.map((concept, index) => (
                            <div key={index} className="bg-gray-800/50 p-6 rounded-lg mb-6">
                                <h3 className="text-2xl font-bold text-white mb-4">{concept.name}</h3>
                                <p className="text-gray-300 mb-6">{concept.description}</p>

                                {concept.methods && (
                                    <div className="mb-6">
                                        <h4 className="text-xl font-semibold text-cyan-400 mb-4">Methods</h4>
                                        {renderMethods(concept.methods)}
                                    </div>
                                )}

                                {concept.implementation && (
                                    <div className="mb-6">
                                        <h4 className="text-xl font-semibold text-cyan-400 mb-4">Implementation</h4>
                                        {renderCodeBlock(concept.implementation.code)}
                                    </div>
                                )}

                                {/* Add this section for transaction attributes */}
                                {concept.attributes && (
                                    <div className="mb-6">
                                        <h4 className="text-xl font-semibold text-cyan-400 mb-4">Attributes</h4>
                                        {renderAttributes(concept.attributes)}
                                    </div>
                                )}

                                {concept.example && (
                                    <div className="mb-6">
                                        <h4 className="text-xl font-semibold text-cyan-400 mb-4">Example</h4>
                                        {renderCodeBlock(concept.example.code)}
                                    </div>
                                )}

                                {concept.patterns && (
                                    <div className="mb-6">
                                        <h4 className="text-xl font-semibold text-cyan-400 mb-4">Query Patterns</h4>
                                        <div className="space-y-4">
                                            {concept.patterns.map((pattern, pIndex) => (
                                                <div key={pIndex} className="bg-gray-800 p-4 rounded-lg">
                                                    <h5 className="text-pink-400 font-medium mb-2">{pattern.prefix}</h5>
                                                    <code className="text-gray-300 block mb-2">{pattern.example}</code>
                                                    <code className="text-gray-400 text-sm">{pattern.generates}</code>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {concept.operators && (
                                    <div className="mb-6">
                                        <h4 className="text-xl font-semibold text-cyan-400 mb-4">Query Operators</h4>
                                        {renderOperators(concept.operators)}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Types Section */}
                        {topic.types && topic.types.map((type, index) => (
                            <div key={index} className="bg-gray-800/50 p-6 rounded-lg mb-6">
                                <h3 className="text-2xl font-bold text-white mb-4">{type.name}</h3>
                                <p className="text-gray-300 mb-6">{type.description}</p>

                                {type.examples && (
                                    <div className="space-y-4">
                                        {type.examples.map((example, eIndex) => (
                                            <div key={eIndex}>
                                                <h4 className="text-lg font-medium text-cyan-400 mb-2">
                                                    {example.description}
                                                </h4>
                                                {renderCodeBlock(example.code)}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {type.example && renderCodeBlock(type.example.code)}
                            </div>
                        ))}

                        {/* Features Section */}
                        {topic.features && topic.features.map((feature, index) => (
                            <div key={index} className="bg-gray-800/50 p-6 rounded-lg mb-6">
                                <h3 className="text-2xl font-bold text-white mb-4">{feature.name}</h3>
                                <p className="text-gray-300 mb-6">{feature.description}</p>

                                {feature.example && renderCodeBlock(feature.example.code)}
                                {feature.setup && renderCodeBlock(feature.setup.code)}
                            </div>
                        ))}

                        {/* Best Practices Section */}
                        {topic.categories && (
                            <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
                                <h3 className="text-2xl font-bold text-white mb-6">Best Practices</h3>
                                {renderPractices(topic.categories)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataPage;