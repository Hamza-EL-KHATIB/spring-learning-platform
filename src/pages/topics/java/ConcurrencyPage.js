import React from 'react';
import { Activity, Code, LayoutGrid, Shield, Database, GitBranch } from 'lucide-react';
import concurrencyJson from '../../../data/java/concurrency.json';
import CodeBlock from "../../../components/CodeBlock"

const ConcurrencyPage = () => {
    // Render thread lifecycle states
    const renderLifecycleStates = (states) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {states.map((state) => (
                <div key={state.state} className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{state.state}</h4>
                    <p className="text-gray-300">{state.description}</p>
                </div>
            ))}
        </div>
    );

    // Render thread creation methods
    const renderThreadCreation = (method) => (
        <div key={method.method} className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-3">{method.method}</h4>
            <CodeBlock code={method.example}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                    <h5 className="text-sm font-medium text-green-400 mb-2">Pros</h5>
                    <ul className="list-disc list-inside space-y-1">
                        {method.pros.map((pro, idx) => (
                            <li key={idx} className="text-gray-300">{pro}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h5 className="text-sm font-medium text-red-400 mb-2">Cons</h5>
                    <ul className="list-disc list-inside space-y-1">
                        {method.cons.map((con, idx) => (
                            <li key={idx} className="text-gray-300">{con}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    // Update renderExecutorType to use CodeBlock
    const renderExecutorType = (type) => (
        <div key={type.type} className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{type.type}</h4>
            <CodeBlock code={type.creation} />  {/* Use CodeBlock here */}
            <p className="text-gray-300 mb-3">{type.usage}</p>
            <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-400 mb-2">Best Practices:</h5>
                <ul className="list-disc list-inside space-y-1">
                    {type.bestPractices.map((practice, idx) => (
                        <li key={idx} className="text-gray-300">{practice}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

// Update renderSafetyMechanism to use CodeBlock
    const renderSafetyMechanism = (mechanism) => (
        <div key={mechanism.type} className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-3">{mechanism.type}</h4>
            {mechanism.methods ? (
                <div className="space-y-4">
                    {mechanism.methods.map((method, idx) => (
                        <div key={idx} className="bg-gray-900 rounded-lg p-4">
                            <h5 className="text-md font-medium text-purple-300 mb-2">{method.name}</h5>
                            <p className="text-gray-300 mb-2">{method.usage}</p>
                            <CodeBlock code={method.example} />  {/* Use CodeBlock here */}
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <p className="text-gray-300 mb-3">{mechanism.description}</p>
                    <p className="text-gray-300 mb-2">{mechanism.usage}</p>
                    <CodeBlock code={mechanism.example} />  {/* Use CodeBlock here */}
                </>
            )}
        </div>
    );

// Update renderCollection to use CodeBlock
    const renderCollection = (collection) => (
        <div key={collection.name} className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-3">{collection.name}</h4>
            {collection.characteristics && (
                <ul className="list-disc list-inside space-y-1 mb-4">
                    {collection.characteristics.map((char, idx) => (
                        <li key={idx} className="text-gray-300">{char}</li>
                    ))}
                </ul>
            )}
            {collection.implementations && (
                <div className="space-y-2 mb-4">
                    {collection.implementations.map((impl, idx) => (
                        <div key={idx} className="bg-gray-900 rounded-lg p-3">
                            <span className="text-purple-300 font-medium">{impl.name}</span>
                            <p className="text-gray-300 text-sm">{impl.description}</p>
                        </div>
                    ))}
                </div>
            )}
            <CodeBlock code={collection.usage} />  {/* Use CodeBlock here */}
        </div>
    );

// Update renderPattern to use CodeBlock
    const renderPattern = (pattern) => (
        <div key={pattern.name} className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{pattern.name}</h4>
            <p className="text-gray-300 mb-4">{pattern.description}</p>
            <div className="bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">Implementation using {pattern.implementation.using}:</p>
                <CodeBlock code={pattern.implementation.example} />  {/* Use CodeBlock here */}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{concurrencyJson.title}</h1>
            </div>

            {/* Thread Lifecycle */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Activity className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{concurrencyJson.topics[0].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{concurrencyJson.topics[0].description}</p>
                {renderLifecycleStates(concurrencyJson.topics[0].states)}
            </div>

            {/* Thread Creation */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Code className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{concurrencyJson.topics[1].title}</h2>
                </div>
                <div className="space-y-6">
                    {concurrencyJson.topics[1].methods.map(renderThreadCreation)}
                </div>
            </div>

            {/* Executor Framework */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <LayoutGrid className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{concurrencyJson.topics[2].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{concurrencyJson.topics[2].description}</p>
                <div className="space-y-6">
                    {concurrencyJson.topics[2].types.map(renderExecutorType)}
                </div>
            </div>

            {/* Thread Safety */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Shield className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{concurrencyJson.topics[3].title}</h2>
                </div>
                <div className="space-y-6">
                    {concurrencyJson.topics[3].mechanisms.map(renderSafetyMechanism)}
                </div>
            </div>

            {/* Thread-Safe Collections */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Database className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{concurrencyJson.topics[4].title}</h2>
                </div>
                <div className="space-y-6">
                    {concurrencyJson.topics[4].collections.map(renderCollection)}
                </div>
            </div>

            {/* Concurrency Patterns */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <GitBranch className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{concurrencyJson.topics[5].title}</h2>
                </div>
                <div className="space-y-6">
                    {concurrencyJson.topics[5].patterns.map(renderPattern)}
                </div>
            </div>
        </div>
    );
};

export default ConcurrencyPage;