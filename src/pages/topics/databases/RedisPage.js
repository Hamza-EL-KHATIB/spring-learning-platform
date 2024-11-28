import React, { useState } from 'react';
import { Database, ListTree, Repeat, Cog, BookOpen, Zap, ServerCrash } from 'lucide-react';
import redisJson from '../../../data/databases/redis.json';
import CodeBlock from '../../../components/CodeBlock';

const RedisPage = () => {
    const [activeTab, setActiveTab] = useState('core-concepts');

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {redisJson.topics.map((topic) => (
                <button
                    key={topic.id}
                    onClick={() => setActiveTab(topic.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === topic.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    {renderTabIcon(topic.id)}
                    {topic.title}
                </button>
            ))}
        </div>
    );

    const renderTabIcon = (id) => {
        switch (id) {
            case 'core-concepts':
                return <Database className="w-4 h-4" />;
            case 'data-types':
                return <ListTree className="w-4 h-4" />;
            case 'cache-patterns':
                return <Repeat className="w-4 h-4" />;
            case 'database-sync':
                return <ServerCrash className="w-4 h-4" />;
            case 'spring-integration':
                return <Cog className="w-4 h-4" />;
            case 'best-practices':
                return <BookOpen className="w-4 h-4" />;
            default:
                return <Zap className="w-4 h-4" />;
        }
    };

    const renderCoreConcepts = (concepts) => (
        <div className="space-y-6">
            {concepts.map((concept, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{concept.name}</h3>
                    <p className="text-gray-300 mb-4">{concept.description}</p>

                    {concept.benefits && (
                        <div className="space-y-2">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Benefits</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {concept.benefits.map((benefit, bidx) => (
                                    <li key={bidx}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {concept.characteristics && (
                        <div className="space-y-2 mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Characteristics</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {concept.characteristics.map((char, cidx) => (
                                    <li key={cidx}>{char}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderDataTypes = (types) => (
        <div className="space-y-6">
            {types.map((type, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{type.name}</h3>
                    <p className="text-gray-300 mb-4">{type.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {type.commands.map((cmd, cmdIdx) => (
                            <div key={cmdIdx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <code className="text-purple-300 font-mono mb-2 block">{cmd.command}</code>
                                <p className="text-gray-400">{cmd.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderCachePatterns = (patterns) => (
        <div className="space-y-6">
            {patterns.map((pattern, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{pattern.name}</h3>
                    <p className="text-gray-300 mb-4">{pattern.description}</p>

                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 mb-4">
                        <h4 className="text-lg font-medium text-gray-200 mb-3">Implementation</h4>
                        <CodeBlock code={pattern.implementation.pseudocode} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-medium text-green-400 mb-2">Advantages</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {pattern.implementation.advantages.map((adv, aidx) => (
                                    <li key={aidx}>{adv}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-red-400 mb-2">Disadvantages</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {pattern.implementation.disadvantages.map((dis, didx) => (
                                    <li key={didx}>{dis}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderDatabaseSync = (strategies) => (
        <div className="space-y-6">
            {strategies.map((strategy, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{strategy.name}</h3>
                    <p className="text-gray-300 mb-4">{strategy.description}</p>

                    {strategy.implementation.spring && (
                        <div className="mb-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-3">Spring Implementation</h4>
                            <CodeBlock code={strategy.implementation.spring.code} />
                        </div>
                    )}

                    {strategy.implementation.considerations && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Key Considerations</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {strategy.implementation.considerations.map((con, cidx) => (
                                    <li key={cidx}>{con}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {strategy.implementation.tools && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Tools</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {strategy.implementation.tools.map((tool, tidx) => (
                                    <div key={tidx} className="bg-gray-900/50 rounded-lg p-3 text-gray-300 text-center">
                                        {tool}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {strategy.implementation.process && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Process</h4>
                            <div className="space-y-2">
                                {strategy.implementation.process.map((step, pidx) => (
                                    <div key={pidx} className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm">
                                            {pidx + 1}
                                        </span>
                                        <span className="text-gray-300">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderSpringIntegration = (implementations) => (
        <div className="space-y-6">
            {implementations.map((impl, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{impl.name}</h3>

                    {impl.code && (
                        <div className="mb-6">
                            <CodeBlock code={impl.code} />
                        </div>
                    )}

                    {impl.examples && (
                        <div className="space-y-4">
                            {impl.examples.map((example, eidx) => (
                                <div key={eidx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-purple-300 mb-3">{example.description}</h4>
                                    <CodeBlock code={example.code} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderBestPractices = (categories) => (
        <div className="space-y-6">
            {categories.map((category, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{category.name}</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {category.practices.map((practice, pidx) => (
                            <li key={pidx}>{practice}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = redisJson.topics.find(t => t.id === activeTab);
        if (!topic) return null;

        switch (activeTab) {
            case 'core-concepts':
                return renderCoreConcepts(topic.concepts);
            case 'data-types':
                return renderDataTypes(topic.types);
            case 'cache-patterns':
                return renderCachePatterns(topic.patterns);
            case 'database-sync':
                return renderDatabaseSync(topic.strategies);
            case 'spring-integration':
                return renderSpringIntegration(topic.implementations);
            case 'best-practices':
                return renderBestPractices(topic.categories);
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{redisJson.title}</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">{renderContent()}</div>
        </div>
    );
};

export default RedisPage;