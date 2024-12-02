import React, { useState } from 'react';
import { List, Zap, Calendar, Code, GitMerge } from 'lucide-react';
import featuresJson from '../../../data/java/features.json';
import CodeBlock from '../../../components/CodeBlock';

const FeaturesPage = () => {
    const [activeTab, setActiveTab] = useState('streams');

    const tabs = [
        { id: 'streams', title: 'Stream API', icon: <List className="w-4 h-4" /> },
        { id: 'completable-future', title: 'CompletableFuture', icon: <Zap className="w-4 h-4" /> },
        { id: 'datetime', title: 'Date/Time API', icon: <Calendar className="w-4 h-4" /> },
        { id: 'method-references', title: 'Method References', icon: <GitMerge className="w-4 h-4" /> },
        { id: 'default-methods', title: 'Default Methods', icon: <Code className="w-4 h-4" /> }
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

    const renderMethods = (methods) => (
        <div className="space-y-6">
            {methods.map((method, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{method.name}</h4>
                    <p className="text-gray-300 mb-4">{method.description}</p>
                    <div className="bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <CodeBlock code={method.example} />
                    </div>
                </div>
            ))}
        </div>
    );

    const renderStreamOperations = (operations) => (
        <div className="space-y-8">
            {operations.map((operation, idx) => (
                <div key={idx}>
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{operation.name}</h3>
                    {renderMethods(operation.methods)}
                </div>
            ))}
        </div>
    );

    const renderCompletableFutureFeatures = (features) => (
        <div className="space-y-8">
            {features.map((feature, idx) => (
                <div key={idx}>
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{feature.category}</h3>
                    {renderMethods(feature.methods)}
                </div>
            ))}
        </div>
    );

    const renderDateTimeClasses = (classes) => (
        <div className="space-y-6">
            {classes.map((cls, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{cls.name}</h4>
                    <p className="text-gray-300 mb-4">{cls.description}</p>
                    <div className="space-y-4">
                        {cls.examples.map((example, exampleIdx) => (
                            <div key={exampleIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <h5 className="text-sm text-gray-400 mb-2">{example.operation}:</h5>
                                <CodeBlock code={example.code} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderMethodReferences = (types, examples) => (
        <div className="space-y-8">
            <div className="space-y-6">
                {types.map((ref, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h4 className="text-lg font-medium text-purple-300 mb-2">{ref.type}</h4>
                        <p className="text-gray-300 mb-4"><strong>Syntax:</strong> {ref.syntax}</p>
                        <div className="bg-gray-900/50 rounded-lg border border-gray-700/50">
                            <CodeBlock code={ref.example} />
                        </div>
                    </div>
                ))}
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-4">Examples</h3>
            <div className="space-y-6">
                {examples.map((example, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h4 className="text-lg font-medium text-purple-300 mb-2">{example.scenario}</h4>
                        <div className="bg-gray-900/50 rounded-lg border border-gray-700/50">
                            <CodeBlock code={example.code} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'streams': {
                const topic = featuresJson.topics[0];
                return (
                    <div>
                        <p className="text-gray-300 mb-6">{topic.description}</p>
                        {renderStreamOperations(topic.operations)}
                    </div>
                );
            }
            case 'completable-future': {
                const topic = featuresJson.topics[1];
                return (
                    <div>
                        <p className="text-gray-300 mb-6">{topic.description}</p>
                        {renderCompletableFutureFeatures(topic.features)}
                    </div>
                );
            }
            case 'datetime': {
                const topic = featuresJson.topics[2];
                return (
                    <div>
                        <p className="text-gray-300 mb-6">{topic.description}</p>
                        {renderDateTimeClasses(topic.classes)}
                    </div>
                );
            }
            case 'method-references': {
                const topic = featuresJson.topics[3];
                return (
                    <div>
                        <p className="text-gray-300 mb-6">{topic.description}</p>
                        {renderMethodReferences(topic.types, topic.examples)}
                    </div>
                );
            }
            case 'default-methods': {
                const topic = featuresJson.topics[4];
                return (
                    <div>
                        <p className="text-gray-300 mb-6">{topic.description}</p>
                        <div className="space-y-6">
                            {topic.examples.map((example, idx) => (
                                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">{example.title}</h4>
                                    <div className="bg-gray-900/50 rounded-lg border border-gray-700/50">
                                        <CodeBlock code={example.code} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{featuresJson.title}</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">{renderContent()}</div>
        </div>
    );
};

export default FeaturesPage;