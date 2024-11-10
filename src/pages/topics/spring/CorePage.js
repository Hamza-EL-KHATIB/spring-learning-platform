import React, { useEffect, useRef } from 'react';
import coreJson from '../../../data/spring/core.json';
import { Wrench, Settings, Code, LayoutGrid } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LifecycleDiagram = ({ keyName, steps }) => {
    const mermaidRef = useRef(null);

    useEffect(() => {
        if (window.mermaid && mermaidRef.current) {
            window.mermaid.init(undefined, mermaidRef.current);
        }
    }, [steps]);

    const mermaidDefinition = `
        graph TD
        ${steps.map((step, stepIdx) => `step${stepIdx}["${step}"]`).join("\n")}
        ${steps.slice(0, steps.length - 1).map((_, stepIdx) => `step${stepIdx} --> step${stepIdx + 1}`).join("\n")}
    `;

    return (
        <div className="bg-orange-900/50 rounded-xl p-6 mb-8 border border-orange-400 shadow-lg">
            <h3 className="text-2xl font-bold text-orange-300 mb-4">{keyName.replace(/([A-Z])/g, ' $1').trim()}</h3>

            {/* Original List Representation */}
            <ul className="list-decimal list-inside text-gray-100">
                {steps.map((step, stepIdx) => (
                    <li key={stepIdx}>{step}</li>
                ))}
            </ul>

            {/* Diagram Representation using Mermaid */}
            <div ref={mermaidRef} className="mermaid mt-6 bg-gray-800 rounded-lg p-4">
                {mermaidDefinition}
            </div>
        </div>
    );
};

const CorePage = () => {
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
                <h4 className="text-2xl font-bold text-purple-300 mb-2">{phase.phase}</h4>
                <p className="text-gray-100 mb-2">{phase.description}</p>
                {phase.events && (
                    <ul className="list-disc list-inside text-gray-100 mt-2">
                        {phase.events.map((event, eventIdx) => (
                            <li key={eventIdx}>{event}</li>
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
                <h4 className="text-2xl font-bold text-green-300 mb-2">{scope.name}</h4>
                <p className="text-gray-100 mb-2">{scope.description}</p>
                <p className="text-sm text-gray-400 mb-2"><strong>Usage:</strong> {scope.usage}</p>
                {scope.bestFor && <p className="text-sm text-gray-400 mb-2"><strong>Best For:</strong> {scope.bestFor}</p>}
            </div>
        ))
    );

    // Render Spring Configurations
    const renderSpringConfigurations = (configs) => (
        configs && configs.map((config, idx) => (
            <div key={idx} className="bg-yellow-900/50 rounded-xl p-6 mb-8 border border-yellow-400 shadow-lg">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">{config.type}</h3>
                <p className="text-gray-100 mb-4">{config.description}</p>
                {config.example && (
                    <div className="mt-4 bg-gray-800/50 rounded-lg p-4 mb-4 border border-yellow-500/20">
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
                        {config.example.advantages && (
                            <div className="mt-4">
                                <h5 className="text-sm font-medium text-yellow-400 mb-2">Advantages:</h5>
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
                <h3 className="text-2xl font-bold text-red-300 mb-4">{concept.term}</h3>
                <p className="text-gray-100 mb-4">{concept.description}</p>
                {concept.example && <p className="text-sm text-gray-400 mb-2"><strong>Example:</strong> {concept.example}</p>}
                {concept.types && concept.types.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {concept.types.map((type, typeIdx) => (
                            <div key={typeIdx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-red-500/20">
                                <h4 className="text-sm font-medium text-red-300 mb-1">{type.name}</h4>
                                <p className="text-gray-100 mb-2">{type.description}</p>
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
                <h3 className="text-2xl font-bold text-teal-300 mb-4">{component.name}</h3>
                <p className="text-gray-100 mb-4">{component.description}</p>
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
                <h3 className="text-2xl font-bold text-indigo-300 mb-4">{key}</h3>
                <p className="text-gray-100 mb-4">{value.description}</p>
                <p className="text-sm text-gray-400 mb-2"><strong>Usage:</strong> {value.usage}</p>
                {value.example && (
                    <div className="mt-4 bg-gray-800/50 rounded-lg p-4 mb-4 border border-indigo-500/20">
                        <h5 className="text-sm font-medium text-indigo-300 mb-1">Example:</h5>
                        <p className="text-gray-100">{value.example}</p>
                    </div>
                )}
            </div>
        ))
    );

    // Render Lifecycle Flow
    const renderLifecycleFlow = (lifecycleFlow) => (
        lifecycleFlow && Object.entries(lifecycleFlow).map(([key, steps]) => (
            <LifecycleDiagram key={key} keyName={key} steps={steps} />
        ))
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20 shadow-lg">
                <h1 className="text-4xl font-extrabold text-white mb-2">{coreJson.title}</h1>
            </div>

            {/* IoC Container & Dependency Injection */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Wrench className="w-8 h-8 mr-3 text-blue-400" />
                    <h2 className="text-3xl font-bold text-white">{coreJson.topics[0]?.title}</h2>
                </div>
                <p className="text-gray-200 mb-6">{coreJson.topics[0]?.description}</p>
                {renderIoCContainerConcepts(coreJson.topics[0]?.concepts)}
            </div>

            {/* Bean Lifecycle */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Settings className="w-8 h-8 mr-3 text-purple-400" />
                    <h2 className="text-3xl font-bold text-white">{coreJson.topics[1]?.title}</h2>
                </div>
                <p className="text-gray-200 mb-6">{coreJson.topics[1]?.description}</p>
                {renderBeanLifecycle(coreJson.topics[1]?.phases)}
            </div>

            {/* Bean Scopes */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <LayoutGrid className="w-8 h-8 mr-3 text-green-400" />
                    <h2 className="text-3xl font-bold text-white">{coreJson.topics[2]?.title}</h2>
                </div>
                <p className="text-gray-200 mb-6">{coreJson.topics[2]?.description}</p>
                {renderBeanScopes(coreJson.topics[2]?.scopes)}
            </div>

            {/* Spring Configurations */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Code className="w-8 h-8 mr-3 text-yellow-400" />
                    <h2 className="text-3xl font-bold text-white">{coreJson.topics[3]?.title}</h2>
                </div>
                <p className="text-gray-200 mb-6">{coreJson.topics[3]?.description}</p>
                {renderSpringConfigurations(coreJson.topics[3]?.methods)}
            </div>

            {/* Aspect-Oriented Programming */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Code className="w-8 h-8 mr-3 text-red-400" />
                    <h2 className="text-3xl font-bold text-white">{coreJson.topics[4]?.title}</h2>
                </div>
                <p className="text-gray-200 mb-6">{coreJson.topics[4]?.description}</p>
                {renderAOPConcepts(coreJson.topics[4]?.concepts)}
            </div>

            {/* Core Components */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Settings className="w-8 h-8 mr-3 text-teal-400" />
                    <h2 className="text-3xl font-bold text-white">{coreJson.topics[5]?.title}</h2>
                </div>
                <p className="text-gray-200 mb-6">{coreJson.topics[5]?.description}</p>
                {renderCoreComponents(coreJson.topics[5]?.components)}
            </div>

            {/* Additional Features */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Wrench className="w-8 h-8 mr-3 text-indigo-400" />
                    <h2 className="text-3xl font-bold text-white">Additional Features</h2>
                </div>
                {renderAdditionalFeatures(coreJson.topics[5]?.additionalFeatures)}
            </div>

            {/* Lifecycle Flow */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Wrench className="w-8 h-8 mr-3 text-orange-400" />
                    <h2 className="text-3xl font-bold text-white">Lifecycle Flow</h2>
                </div>
                {renderLifecycleFlow(coreJson.topics[5]?.lifecycleFlow)}
            </div>
        </div>
    );
};

export default CorePage;
