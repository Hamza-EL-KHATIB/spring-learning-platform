import React, { useState } from 'react';
import {
    List, Zap, Calendar, Code, GitMerge, KeyRound, Box,
    Terminal, Database, Hash, BookOpen
} from 'lucide-react';
import featuresJson from '../../../data/java/features.json';
import CodeBlock from '../../../components/CodeBlock';
import FloatingMenu from '../../../components/layout/FloatingMenu';

const FeaturesPage = () => {
    const [activeTab, setActiveTab] = useState('streams');
    const [selectedStreamCategory, setSelectedStreamCategory] = useState(null);

    const tabs = [
        { id: 'streams', title: 'Stream API', icon: <List /> },
        { id: 'completableFuture', title: 'CompletableFuture', icon: <Zap /> },
        { id: 'dateTime', title: 'Date/Time API', icon: <Calendar /> },
        { id: 'methodReferences', title: 'Method References', icon: <GitMerge /> },
        { id: 'defaultMethods', title: 'Default Methods', icon: <Code /> },
        { id: 'lambdaExpressions', title: 'Lambda Expressions', icon: <Terminal /> },
        { id: 'functionalInterfaces', title: 'Functional Interfaces', icon: <Box /> },
        { id: 'optional', title: 'Optional', icon: <KeyRound /> },
        { id: 'annotations', title: 'Annotations', icon: <Hash /> },
        { id: 'base64', title: 'Base64', icon: <BookOpen /> },
        { id: 'concurrency', title: 'Concurrency', icon: <Database /> }
    ];

    const TopicNavigation = ({ activeTab, onTabChange, topics }) => (
        <div className="hidden lg:block bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 mb-8">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
                {topics.map((topic) => (
                    <button
                        key={topic.id}
                        onClick={() => onTabChange(topic.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium 
                    transition-all duration-300 text-left
                    ${activeTab === topic.id
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                        }
                    border border-gray-700/50 hover:border-purple-500/30`}
                    >
                        {topic.icon && <span>{topic.icon}</span>}
                        <span>{topic.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderDefaultMethods = ({ features, examples }) => (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                    <ContentCard key={idx}>
                        <h4 className="text-lg font-medium text-purple-300 mb-2">
                            {feature.aspect}
                        </h4>
                        <p className="text-gray-400 mb-4">
                            {feature.description}
                        </p>
                        {feature.points && (
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                {feature.points.map((point, pointIdx) => (
                                    <li key={pointIdx}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </ContentCard>
                ))}
            </div>

            <ContentCard title="Examples">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {examples.map((example, idx) => (
                        <div key={idx} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                            <h4 className="text-base font-medium text-purple-300 mb-3">
                                {example.title}
                            </h4>
                            <CodeBlock code={example.code} />
                        </div>
                    ))}
                </div>
            </ContentCard>
        </div>
    );

    const renderCompletableFutureFeatures = (features) => (
        <div className="grid grid-cols-1 gap-8">
            {features.map((feature, idx) => (
                <ContentCard key={idx} title={feature.category}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {feature.methods.map((method, methodIdx) => (
                            <div key={methodIdx}
                                 className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50
                                          hover:border-purple-500/20 transition-colors">
                                <div className="space-y-3">
                                    <h4 className="text-lg font-medium text-purple-300">
                                        {method.name}
                                    </h4>
                                    <p className="text-gray-400">
                                        {method.description}
                                    </p>
                                    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50">
                                        <CodeBlock code={method.example} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ContentCard>
            ))}
        </div>
    );

    const renderNashorn = ({ features }) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
                <ContentCard key={idx}>
                    <h4 className="text-lg font-medium text-purple-300 mb-2">
                        {feature.aspect}
                    </h4>
                    <p className="text-gray-400 mb-4">
                        {feature.description}
                    </p>
                    {feature.example && (
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <CodeBlock code={feature.example} />
                        </div>
                    )}
                </ContentCard>
            ))}
        </div>
    );

    const ContentCard = ({ title, children, className = "" }) => (
        <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 ${className}`}>
            {title && (
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );

    const MethodCard = ({ method }) => (
        <ContentCard className="hover:border-purple-500/20 transition-colors">
            <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h4 className="text-lg font-medium text-purple-300">{method.name}</h4>
                        <p className="text-gray-400 mt-1">{method.description}</p>
                    </div>
                </div>
                {method.example && (
                    <div className="bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <CodeBlock code={method.example} />
                    </div>
                )}
            </div>
        </ContentCard>
    );

    const StreamOperations = ({ operations }) => {
        const [activeCategory, setActiveCategory] = useState(operations[0]);

        return (
            <div className="space-y-6">
                {/* Category Pills */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {operations.map((operation, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveCategory(operation)}
                                className={`shrink-0 px-4 py-2 rounded-lg font-medium transition-all duration-300
                                ${activeCategory.name === operation.name
                                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                                } border border-gray-700/50 hover:border-purple-500/30`}
                            >
                                {operation.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Category Content */}
                <ContentCard title={activeCategory.name}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {activeCategory.methods.map((method, methodIdx) => (
                            <MethodCard key={methodIdx} method={method} />
                        ))}
                    </div>
                </ContentCard>
            </div>
        );
    };

    const renderDateTimeClasses = (classes) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {classes.map((cls, idx) => (
                <ContentCard key={idx}>
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{cls.name}</h4>
                    <p className="text-gray-300 mb-4">{cls.description}</p>
                    <div className="space-y-4">
                        {cls.examples.map((example, exampleIdx) => (
                            <div key={exampleIdx}
                                 className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <h5 className="text-sm text-gray-400 mb-2">{example.operation}:</h5>
                                <CodeBlock code={example.code} />
                            </div>
                        ))}
                    </div>
                </ContentCard>
            ))}
        </div>
    );

    const renderMethodReferences = (types, examples) => (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {types.map((ref, idx) => (
                    <ContentCard key={idx}>
                        <h4 className="text-lg font-medium text-purple-300 mb-2">{ref.type}</h4>
                        <div className="text-gray-400 mb-3 text-sm">
                            Syntax: <code className="text-pink-400">{ref.syntax}</code>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg border border-gray-700/50">
                            <CodeBlock code={ref.example} />
                        </div>
                    </ContentCard>
                ))}
            </div>

            <ContentCard title="Examples">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {examples.map((example, idx) => (
                        <div key={idx} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                            <h4 className="text-base font-medium text-purple-300 mb-3">
                                {example.scenario}
                            </h4>
                            <CodeBlock code={example.code} />
                        </div>
                    ))}
                </div>
            </ContentCard>
        </div>
    );

    const renderLambdaExpressions = ({ syntax, examples }) => (
        <div className="space-y-6">
            <ContentCard>
                <div className="text-gray-400 mb-6 text-lg">
                    Syntax: <code className="text-pink-400 bg-gray-800/50 px-2 py-1 rounded">{syntax}</code>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {examples.map((example, idx) => (
                        <div key={idx} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                            <h4 className="text-base font-medium text-purple-300 mb-3">
                                {example.scenario}
                            </h4>
                            <CodeBlock code={example.code} />
                        </div>
                    ))}
                </div>
            </ContentCard>
        </div>
    );

    const renderFunctionalInterfaces = ({ examples }) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {examples.map((example, idx) => (
                <ContentCard key={idx}>
                    <div className="space-y-3">
                        <h4 className="text-lg font-medium text-purple-300">{example.name}</h4>
                        <p className="text-gray-400">{example.description}</p>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <code className="text-pink-400">{example.method}</code>
                        </div>
                    </div>
                </ContentCard>
            ))}
        </div>
    );

    const renderOptionalMethods = ({ methods }) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {methods.map((method, idx) => (
                <ContentCard key={idx}>
                    <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h4 className="text-lg font-medium text-purple-300">{method.name}</h4>
                                <p className="text-gray-400 mt-1">{method.description}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <CodeBlock code={method.example} />
                        </div>
                    </div>
                </ContentCard>
            ))}
        </div>
    );

    const renderAnnotations = ({ features }) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
                <ContentCard key={idx}>
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{feature.name}</h4>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                        <CodeBlock code={feature.example} />
                    </div>
                </ContentCard>
            ))}
        </div>
    );

    const renderBase64 = ({ methods }) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {methods.map((method, idx) => (
                <ContentCard key={idx}>
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{method.name}</h4>
                    <p className="text-gray-400 mb-4">{method.description}</p>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                        <CodeBlock code={method.example} />
                    </div>
                </ContentCard>
            ))}
        </div>
    );

    const renderConcurrency = ({ classes }) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {classes.map((cls, idx) => (
                <ContentCard key={idx}>
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{cls.name}</h4>
                    <p className="text-gray-400 mb-4">{cls.description}</p>
                    {cls.example && (
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <CodeBlock code={cls.example} />
                        </div>
                    )}
                </ContentCard>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = featuresJson.topics.find(t => t.id === activeTab);
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

                {/* Map topic data to appropriate renderer */}
                {topic.id === 'streams' && topic.operations && (
                    <StreamOperations operations={topic.operations} />
                )}
                {topic.id === 'completableFuture' && topic.features && renderCompletableFutureFeatures(topic.features)}
                {topic.id === 'dateTime' && topic.classes && renderDateTimeClasses(topic.classes)}
                {topic.id === 'methodReferences' && topic.types && renderMethodReferences(topic.types, topic.examples)}
                {topic.id === 'defaultMethods' && renderDefaultMethods(topic)}
                {topic.id === 'lambdaExpressions' && renderLambdaExpressions(topic)}
                {topic.id === 'functionalInterfaces' && renderFunctionalInterfaces(topic)}
                {topic.id === 'optional' && renderOptionalMethods(topic)}
                {topic.id === 'annotations' && renderAnnotations(topic)}
                {topic.id === 'base64' && renderBase64(topic)}
                {topic.id === 'concurrency' && renderConcurrency(topic)}
                {topic.id === 'nashorn' && renderNashorn(topic)}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50
                      rounded-xl p-6 border border-purple-500/20 shadow-lg">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text
                         bg-gradient-to-r from-purple-400 to-pink-500">
                    {featuresJson.title}
                </h1>
            </div>

            {/* Navigation */}
            <TopicNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                topics={tabs}
            />

            {/* Floating Menu - Only visible on small screens */}
            <FloatingMenu
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                streamOperations={featuresJson.topics.find(t => t.id === 'streams')?.operations}
                onStreamCategorySelect={setSelectedStreamCategory}
            />

            {/* Content */}
            <div className="space-y-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default FeaturesPage;