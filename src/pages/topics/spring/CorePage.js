import React, { useState, useRef, useEffect, memo } from 'react';
import coreJson from '../../../data/spring/core.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LifecycleFlowDiagram = ({ keyName, steps }) => {
    const mermaidRef = useRef(null);

    useEffect(() => {
        if (window.mermaid && mermaidRef.current) {
            window.mermaid.init(undefined, mermaidRef.current);
        }
    }, [steps]);

    // Define Mermaid Graph Structure
    const mermaidDefinition = `
        graph TD
        ${steps.map((step, stepIdx) => `step${stepIdx}["${step}"]`).join("\n")}
        ${steps.slice(0, steps.length - 1).map((_, stepIdx) => `step${stepIdx} --> step${stepIdx + 1}`).join("\n")}
    `;

    return (
        <div className="bg-orange-900/50 rounded-xl p-6 mb-8 border border-orange-400 shadow-lg">
            {/* Lifecycle Title */}
            <h3 className="text-2xl font-bold text-orange-300 mb-4">
                {keyName.replace(/([A-Z])/g, ' $1').trim()}
            </h3>

            {/* Original List Representation */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Step-by-Step Flow:</h4>
                <ul className="list-decimal list-inside text-gray-100 space-y-2">
                    {steps.map((step, stepIdx) => (
                        <li key={stepIdx}>{step}</li>
                    ))}
                </ul>
            </div>

            {/* Diagram Representation using Mermaid */}
            <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Diagram Representation:</h4>
                <div ref={mermaidRef} className="mermaid bg-gray-800 rounded-lg p-4">
                    {mermaidDefinition}
                </div>
            </div>
        </div>
    );
};


const CorePage = () => {
    const [activeTab, setActiveTab] = useState(coreJson.topics[0].id);
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
                {/* Gradient fade effects */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

                {/* Scrollable tabs */}
                <div
                    ref={tabsRef}
                    className="flex overflow-x-auto custom-scrollbar py-2"
                >
                    <div className="flex space-x-2 px-8">
                        {coreJson.topics.map((topic) => (
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

    // Render IoC Container & Dependency Injection
    const renderIoCContainerConcepts = (concepts) => (
        concepts && concepts.map((concept, idx) => (
            <div key={idx} className="mb-8 bg-blue-900/50 rounded-xl p-6 border border-blue-400 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">{concept.name}</h3>
                <p className="text-gray-100 mb-4">{concept.description}</p>
                {concept.benefits && concept.benefits.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-yellow-300 mb-2">Benefits:</h4>
                        <ul className="list-disc list-inside text-gray-100">
                            {concept.benefits.map((benefit, benefitIdx) => (
                                <li key={benefitIdx}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {concept.types && concept.types.length > 0 && concept.types.map((type, typeIdx) => (
                    <div key={typeIdx} className="mt-6">
                        <h4 className="text-lg font-semibold text-green-300 mb-2">{type.type}</h4>
                        <p className="text-gray-100 mb-2">{type.description}</p>
                        {type.example && (
                            <div className="mt-4 bg-gray-800/50 rounded-lg p-4 mb-4 border border-green-500/20">
                                <h5 className="text-sm font-medium text-green-300 mb-1">Example Code:</h5>
                                <SyntaxHighlighter
                                    language="java"
                                    style={oneDark}
                                    customStyle={{
                                        padding: '1em',
                                        borderRadius: '0.5em',
                                        overflow: 'auto',
                                        backgroundColor: '#282c34',
                                    }}
                                >
                                    {type.example.code}
                                </SyntaxHighlighter>
                                {type.example.advantages && (
                                    <div className="mt-4">
                                        <h5 className="text-sm font-medium text-yellow-400 mb-2">Advantages:</h5>
                                        <ul className="list-disc list-inside text-gray-100">
                                            {type.example.advantages.map((advantage, advIdx) => (
                                                <li key={advIdx}>{advantage}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {type.example.disadvantages && (
                                    <div className="mt-4">
                                        <h5 className="text-sm font-medium text-red-400 mb-2">Disadvantages:</h5>
                                        <ul className="list-disc list-inside text-gray-100">
                                            {type.example.disadvantages.map((disadvantage, disadvIdx) => (
                                                <li key={disadvIdx}>{disadvantage}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ))
    );

    // Render Bean Lifecycle
    const renderBeanLifecycle = (lifecycle) => (
        lifecycle && lifecycle.map((phase, idx) => (
            <div key={idx} className="bg-purple-900/50 rounded-lg p-6 mb-6 border border-purple-400 shadow-lg">
                {/* Phase Name */}
                <h4 className="text-2xl font-bold text-purple-300 mb-2">{phase.phase}</h4>

                {/* Phase Description */}
                <p className="text-gray-100 mb-2">{phase.description}</p>

                {/* Phase Events (if available) */}
                {phase.events && phase.events.length > 0 && (
                    <ul className="list-disc list-inside text-gray-100 mt-4">
                        {phase.events.map((event, eventIdx) => (
                            <li key={eventIdx} className="mb-1">{event}</li>
                        ))}
                    </ul>
                )}
            </div>
        ))
    );


    // Render Bean Scopes
    const renderBeanScopes = (scopes) => (
        scopes && scopes.map((scope, idx) => (
            <div key={idx} className="bg-green-900/50 rounded-lg p-6 mb-6 border border-green-400 shadow-lg">
                {/* Scope Name */}
                <h4 className="text-2xl font-bold text-green-300 mb-2">{scope.name}</h4>

                {/* Scope Description */}
                <p className="text-gray-100 mb-4">{scope.description}</p>

                {/* Scope Usage (if available) */}
                {scope.usage && (
                    <p className="text-sm text-gray-400 mb-4">
                        <strong>Usage:</strong> <code className="text-yellow-300">{scope.usage}</code>
                    </p>
                )}

                {/* Best For (if available) */}
                {scope.bestFor && (
                    <p className="text-sm text-gray-400 mb-2">
                        <strong>Best For:</strong> {scope.bestFor}
                    </p>
                )}

                {/* Default Scope Indicator */}
                {scope.defaultScope && (
                    <div className="mt-4">
                    <span className="inline-block bg-teal-600 text-teal-100 text-xs font-semibold px-2 py-1 rounded-lg">
                        Default Scope
                    </span>
                    </div>
                )}
            </div>
        ))
    );


    // Render Spring Configurations
    const renderSpringConfigurations = (configs) => (
        configs && configs.map((config, idx) => (
            <div key={idx} className="bg-yellow-900/50 rounded-xl p-6 mb-8 border border-yellow-400 shadow-lg">
                {/* Configuration Type */}
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">{config.type}</h3>

                {/* Configuration Description */}
                <p className="text-gray-100 mb-4">{config.description}</p>

                {/* Example Code Block */}
                {config.example && (
                    <div className="mt-4 bg-gray-800/50 rounded-lg p-4 mb-4 border border-yellow-500/20">
                        <h5 className="text-lg font-medium text-yellow-300 mb-2">Example Code:</h5>
                        <SyntaxHighlighter
                            language="java"
                            style={oneDark}
                            customStyle={{
                                padding: '1em',
                                borderRadius: '0.5em',
                                overflow: 'auto',
                                backgroundColor: '#282c34',
                            }}
                        >
                            {config.example.code}
                        </SyntaxHighlighter>

                        {/* Advantages of this Configuration */}
                        {config.example.advantages && (
                            <div className="mt-4">
                                <h5 className="text-lg font-medium text-green-300 mb-2">Advantages:</h5>
                                <ul className="list-disc list-inside text-gray-100">
                                    {config.example.advantages.map((advantage, advIdx) => (
                                        <li key={advIdx}>{advantage}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        ))
    );


    // Render AOP Concepts
    const renderAOPConcepts = (aopConcepts) => (
        aopConcepts && aopConcepts.map((concept, idx) => (
            <div key={idx} className="bg-red-900/50 rounded-xl p-6 mb-8 border border-red-400 shadow-lg">
                {/* Concept Term */}
                <h3 className="text-2xl font-bold text-red-300 mb-4">{concept.term}</h3>

                {/* Concept Description */}
                <p className="text-gray-100 mb-4">{concept.description}</p>

                {/* Example */}
                {concept.example && (
                    <div className="mb-4">
                        <h5 className="text-lg font-medium text-yellow-300 mb-2">Example:</h5>
                        <p className="text-gray-100 mb-2">{concept.example}</p>
                    </div>
                )}

                {/* Advice Types if Available */}
                {concept.types && concept.types.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {concept.types.map((type, typeIdx) => (
                            <div key={typeIdx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-red-500/20">
                                <h4 className="text-lg font-medium text-red-300 mb-1">{type.name}</h4>
                                <p className="text-gray-100 mb-2">{type.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Additional Examples (like Logging Aspect or Other Code Examples) */}
                {concept.examples && concept.examples.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-yellow-300 mb-4">Code Examples:</h4>
                        {concept.examples.map((example, exampleIdx) => (
                            <div key={exampleIdx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-yellow-500/20">
                                <h5 className="text-sm font-medium text-yellow-300 mb-1">{example.title}</h5>
                                <SyntaxHighlighter
                                    language="java"
                                    style={oneDark}
                                    customStyle={{
                                        padding: '1em',
                                        borderRadius: '0.5em',
                                        overflow: 'auto',
                                        backgroundColor: '#282c34',
                                    }}
                                >
                                    {example.code}
                                </SyntaxHighlighter>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))
    );


    // Render Core Components
    const renderCoreComponents = (components) => (
        components && components.map((component, idx) => (
            <div key={idx} className="bg-teal-900/50 rounded-xl p-6 mb-8 border border-teal-400 shadow-lg">
                {/* Component Name */}
                <h3 className="text-2xl font-bold text-teal-300 mb-4">{component.name}</h3>

                {/* Component Description */}
                <p className="text-gray-100 mb-4">{component.description}</p>

                {/* Characteristics */}
                {component.characteristics && (
                    <div className="mt-4">
                        <h5 className="text-lg font-medium text-teal-300 mb-2">Characteristics:</h5>
                        <ul className="list-disc list-inside text-gray-100">
                            {component.characteristics.map((char, charIdx) => (
                                <li key={charIdx}>{char}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Relationships */}
                {component.relationships && (
                    <div className="mt-4">
                        <h5 className="text-lg font-medium text-teal-300 mb-2">Relationships:</h5>
                        <ul className="list-disc list-inside text-gray-100">
                            {component.relationships.map((rel, relIdx) => (
                                <li key={relIdx}><strong>{rel.component}:</strong> {rel.description}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Features */}
                {component.features && (
                    <div className="mt-4">
                        <h5 className="text-lg font-medium text-teal-300 mb-2">Features:</h5>
                        <ul className="list-disc list-inside text-gray-100">
                            {component.features.map((feature, featureIdx) => (
                                <li key={featureIdx}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Methods */}
                {component.methods && (
                    <div className="mt-4">
                        <h5 className="text-lg font-medium text-teal-300 mb-2">Methods:</h5>
                        <ul className="list-disc list-inside text-gray-100">
                            {component.methods.map((method, methodIdx) => (
                                <li key={methodIdx}><strong>{method.name}:</strong> {method.description}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Properties */}
                {component.properties && (
                    <div className="mt-4">
                        <h5 className="text-lg font-medium text-teal-300 mb-2">Properties:</h5>
                        <ul className="list-disc list-inside text-gray-100">
                            {component.properties.map((property, propIdx) => (
                                <li key={propIdx}>{property}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Usage and Example */}
                {component.usage && component.example && (
                    <div className="mt-4">
                        <h5 className="text-lg font-medium text-teal-300 mb-2">Usage:</h5>
                        <p className="text-gray-100 mb-2">{component.usage}</p>
                        <div className="mt-4 bg-gray-800/50 rounded-lg p-4 mb-4 border border-teal-500/20">
                            <h5 className="text-sm font-medium text-teal-300 mb-1">Example Code:</h5>
                            <SyntaxHighlighter
                                language="java"
                                style={oneDark}
                                customStyle={{
                                    padding: '1em',
                                    borderRadius: '0.5em',
                                    overflow: 'auto',
                                    backgroundColor: '#282c34',
                                }}
                            >
                                {component.example.code}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                )}
            </div>
        ))
    );


    // Render Additional Features
    const renderAdditionalFeatures = (features) => (
        features && Object.entries(features).map(([key, value], idx) => (
            <div key={idx} className="bg-indigo-900/50 rounded-xl p-6 mb-8 border border-indigo-400 shadow-lg">
                {/* Feature Title */}
                <h3 className="text-2xl font-bold text-indigo-300 mb-4">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>

                {/* Feature Description */}
                <p className="text-gray-100 mb-4">{value.description}</p>

                {/* Usage */}
                {value.usage && (
                    <p className="text-sm text-gray-400 mb-2">
                        <strong>Usage:</strong> {value.usage}
                    </p>
                )}

                {/* Example */}
                {value.example && (
                    <div className="mt-4 bg-gray-800/50 rounded-lg p-4 mb-4 border border-indigo-500/20">
                        <h5 className="text-sm font-medium text-indigo-300 mb-1">Example Code:</h5>
                        <SyntaxHighlighter
                            language="java"
                            style={oneDark}
                            customStyle={{
                                padding: '1em',
                                borderRadius: '0.5em',
                                overflow: 'auto',
                                backgroundColor: '#282c34',
                            }}
                        >
                            {value.example}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        ))
    );

    // Render Lifecycle Flow
    const renderLifecycleFlow = (lifecycleFlow) => (
        lifecycleFlow && Object.entries(lifecycleFlow).map(([key, steps], idx) => (
            <LifecycleFlowDiagram key={idx} keyName={key} steps={steps} />
        ))
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20 shadow-lg">
                <h1 className="text-4xl font-extrabold text-white mb-2">{coreJson.title}</h1>
            </div>

            {/* Navigation Tabs */}
            <TabNavigation />

            {/* Content Section */}
            <div className="space-y-8">
                {activeTab === 'ioc-container' && (
                    <div>
                        {renderIoCContainerConcepts(coreJson.topics[0]?.concepts)}
                    </div>
                )}

                {activeTab === 'bean-lifecycle' && (
                    <div>
                        {renderBeanLifecycle(coreJson.topics[1]?.phases)}
                    </div>
                )}

                {activeTab === 'bean-scopes' && (
                    <div>
                        {renderBeanScopes(coreJson.topics[2]?.scopes)}
                    </div>
                )}

                {activeTab === 'configuration' && (
                    <div>
                        {renderSpringConfigurations(coreJson.topics[3]?.methods)}
                    </div>
                )}

                {activeTab === 'aop' && (
                    <div>
                        {renderAOPConcepts(coreJson.topics[4]?.concepts)}
                    </div>
                )}

                {activeTab === 'spring-components' && (
                    <div>
                        {renderCoreComponents(coreJson.topics[5]?.components)}
                    </div>
                )}

                {activeTab === 'additional-features' && (
                    <div>
                        {renderAdditionalFeatures(coreJson.topics[5]?.additionalFeatures)}
                    </div>
                )}

                {activeTab === 'lifecycle-flow' && (
                    <div>
                        {renderLifecycleFlow(coreJson.topics[5]?.lifecycleFlow)}
                    </div>
                )}
            </div>


        </div>
    );
};

export default CorePage;