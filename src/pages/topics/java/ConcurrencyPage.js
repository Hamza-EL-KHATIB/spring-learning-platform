import React, { useState } from 'react';
import { Activity, Code, LayoutGrid, Shield, Database, GitBranch } from 'lucide-react';
import concurrencyJson from '../../../data/java/concurrency.json';
import CodeBlock from "../../../components/CodeBlock"

const ConcurrencyPage = () => {
    const [activeTab, setActiveTab] = useState('lifecycle');

    const tabs = [
        { id: 'lifecycle', title: 'Thread Lifecycle', icon: <Activity className="w-4 h-4" /> },
        { id: 'creation', title: 'Thread Creation', icon: <Code className="w-4 h-4" /> },
        { id: 'executor', title: 'Executor Framework', icon: <LayoutGrid className="w-4 h-4" /> },
        { id: 'safety', title: 'Thread Safety', icon: <Shield className="w-4 h-4" /> },
        { id: 'collections', title: 'Thread-Safe Collections', icon: <Database className="w-4 h-4" /> },
        { id: 'patterns', title: 'Concurrency Patterns', icon: <GitBranch className="w-4 h-4" /> }
    ];

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
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
    );

    const renderLifecycleStates = (states) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {states.map((state) => (
                <div key={state.state} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{state.state}</h4>
                    <p className="text-gray-300">{state.description}</p>
                </div>
            ))}
        </div>
    );

    const renderThreadCreation = (method) => (
        <div key={method.method} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-lg font-medium text-purple-300 mb-3">{method.method}</h4>
            <div className="bg-gray-900/50 rounded-lg border border-gray-700/50 mb-4">
                <CodeBlock code={method.example}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h5 className="text-sm font-medium text-green-400 mb-2">Pros</h5>
                    <ul className="list-disc list-inside space-y-1">
                        {method.pros.map((pro, idx) => (
                            <li key={idx} className="text-gray-300">{pro}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
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

    const renderExecutorType = (type) => (
        <div key={type.type} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{type.type}</h4>
            <div className="bg-gray-900/50 rounded-lg border border-gray-700/50 mb-4">
                <CodeBlock code={type.creation} />
            </div>
            <p className="text-gray-300 mb-4">{type.usage}</p>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <h5 className="text-sm font-medium text-gray-400 mb-2">Best Practices:</h5>
                <ul className="list-disc list-inside space-y-1">
                    {type.bestPractices.map((practice, idx) => (
                        <li key={idx} className="text-gray-300">{practice}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const renderSafetyMechanism = (mechanism) => (
        <div key={mechanism.type} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-lg font-medium text-purple-300 mb-3">{mechanism.type}</h4>
            {mechanism.methods ? (
                <div className="space-y-4">
                    {mechanism.methods.map((method, idx) => (
                        <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h5 className="text-md font-medium text-purple-300 mb-2">{method.name}</h5>
                            <p className="text-gray-300 mb-2">{method.usage}</p>
                            <CodeBlock code={method.example} />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <p className="text-gray-300 mb-3">{mechanism.description}</p>
                    <p className="text-gray-300 mb-2">{mechanism.usage}</p>
                    <div className="bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <CodeBlock code={mechanism.example} />
                    </div>
                </>
            )}
        </div>
    );

    const renderCollection = (collection) => (
        <div key={collection.name} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-lg font-medium text-purple-300 mb-3">{collection.name}</h4>
            {collection.characteristics && (
                <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-400 mb-2">Characteristics:</h5>
                    <ul className="list-disc list-inside space-y-1">
                        {collection.characteristics.map((char, idx) => (
                            <li key={idx} className="text-gray-300">{char}</li>
                        ))}
                    </ul>
                </div>
            )}
            {collection.implementations && (
                <div className="space-y-2 mb-4">
                    {collection.implementations.map((impl, idx) => (
                        <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h5 className="text-purple-300 font-medium mb-1">{impl.name}</h5>
                            <p className="text-gray-300 text-sm">{impl.description}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="bg-gray-900/50 rounded-lg border border-gray-700/50">
                <CodeBlock code={collection.usage} />
            </div>
        </div>
    );

    const renderPattern = (pattern) => (
        <div key={pattern.name} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{pattern.name}</h4>
            <p className="text-gray-300 mb-4">{pattern.description}</p>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-2">Implementation using {pattern.implementation.using}:</p>
                <CodeBlock code={pattern.implementation.example} />
            </div>
        </div>
    );

    const renderContent = () => {
        const topic = concurrencyJson.topics.find(t => {
            switch (activeTab) {
                case 'lifecycle': return t.id === 'thread-lifecycle';
                case 'creation': return t.id === 'thread-creation';
                case 'executor': return t.id === 'executors';
                case 'safety': return t.id === 'thread-safety';
                case 'collections': return t.id === 'concurrent-collections';
                case 'patterns': return t.id === 'concurrency-patterns';
                default: return false;
            }
        });

        if (!topic) return null;

        const content = (
            <div>
                <p className="text-gray-300 mb-6">{topic.description}</p>
                <div className="space-y-6">
                    {activeTab === 'lifecycle' && renderLifecycleStates(topic.states)}
                    {activeTab === 'creation' && topic.methods.map(renderThreadCreation)}
                    {activeTab === 'executor' && topic.types.map(renderExecutorType)}
                    {activeTab === 'safety' && topic.mechanisms.map(renderSafetyMechanism)}
                    {activeTab === 'collections' && topic.collections.map(renderCollection)}
                    {activeTab === 'patterns' && topic.patterns.map(renderPattern)}
                </div>
            </div>
        );

        return content;
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{concurrencyJson.title}</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">{renderContent()}</div>
        </div>
    );
};

export default ConcurrencyPage;