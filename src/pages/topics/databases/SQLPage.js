import React, { useState } from 'react';
import sqlJson from '../../../data/databases/sql.json';
import {
    Settings,
    BarChart,
    CheckCircle2
} from 'lucide-react';
import CodeBlock from '../../../components/CodeBlock';

const ConceptCard = ({ concept }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-3">{concept.name}</h3>
        <p className="text-gray-300 mb-4">{concept.description}</p>

        {concept.types && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Types:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {concept.types.map((type, idx) => (
                        <li key={idx} className="text-gray-300">{type}</li>
                    ))}
                </ul>
            </div>
        )}

        {concept.components && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Components:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {concept.components.map((component, idx) => (
                        <li key={idx} className="text-gray-300">{component}</li>
                    ))}
                </ul>
            </div>
        )}

        {concept.elements && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Elements:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {concept.elements.map((element, idx) => (
                        <li key={idx} className="text-gray-300">{element}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

const DataTypeCard = ({ category }) => {
    if (!category) {
        return null; // Handle missing category gracefully
    }

    const { name, types } = category;
    const typesList = types ?? []; // Default to an empty array if types is undefined

    return (
        <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{name || "Unnamed Category"}</h3>
            <ul className="space-y-2">
                {typesList.map((type, idx) => (
                    <li key={idx} className="text-gray-300">
                        <strong>{type.name}:</strong> {type.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};


const OperationCard = ({ operation }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{operation.name}</h3>
        <p className="text-gray-300 mb-4">{operation.description}</p>
        <div className="space-y-4">
            {operation.examples.map((example, idx) => (
                <div key={idx}>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">{example.description}</h4>
                    <CodeBlock code={example.code} />
                </div>
            ))}
        </div>
    </div>
);

const JoinCard = ({ join }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{join.name}</h3>
        <p className="text-gray-300 mb-4">{join.description}</p>
        <CodeBlock code={join.example} />
    </div>
);

const FeatureCard = ({ feature }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">{feature.name}</h3>

        {feature.functions && (
            <div className="grid gap-4">
                {feature.functions.map((fn, idx) => (
                    <div key={idx}>
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart className="w-4 h-4 text-cyan-400" />
                            <h4 className="text-gray-200 font-medium">{fn.name}</h4>
                        </div>
                        <CodeBlock code={fn.example} />
                    </div>
                ))}
            </div>
        )}

        {feature.description && (
            <>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                {feature.example && <CodeBlock code={feature.example} />}
            </>
        )}

        {feature.types && (
            <div className="space-y-4 mt-4">
                {feature.types.map((type, idx) => (
                    <div key={idx}>
                        <h4 className="text-gray-200 font-medium mb-2">{type.name}</h4>
                        <CodeBlock code={type.example} />
                    </div>
                ))}
            </div>
        )}
    </div>
);

const OptimizationCard = ({ technique }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">{technique.name}</h3>

        {technique.types && (
            <div className="space-y-4 mb-6">
                {technique.types.map((type, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <Settings className="w-5 h-5 text-cyan-400 mt-1" />
                        <div>
                            <h4 className="text-gray-200 font-medium">{type.name}</h4>
                            <p className="text-gray-400">{type.usage}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {technique.best_practices && (
            <div>
                <h4 className="text-gray-200 font-medium mb-2">Best Practices</h4>
                <ul className="space-y-2">
                    {technique.best_practices.map((practice, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                            {practice}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {technique.techniques && (
            <ul className="space-y-2">
                {technique.techniques.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        {t}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

const TransactionCard = ({ concept }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">{concept.name}</h3>

        {concept.properties && (
            <ul className="space-y-2">
                {concept.properties.map((property, propIdx) => (
                    <li key={propIdx} className="flex items-start gap-2 text-gray-300">
                        <span className="w-4 h-4 text-green-400 mt-1 flex-shrink-0">•</span>
                        {property}
                    </li>
                ))}
            </ul>
        )}

        {concept.commands && (
            <ul className="space-y-2">
                {concept.commands.map((command, cmdIdx) => (
                    <li key={cmdIdx} className="text-gray-300">
                        <strong>{command.name}:</strong> {command.description}
                    </li>
                ))}
            </ul>
        )}
    </div>
);


const BestPracticesCard = ({ category }) => {
    // If category is undefined or missing 'practices', use default values.
    const practices = category?.practices ?? [];
    const categoryName = category?.name ?? "Unnamed Category";

    return (
        <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{categoryName}</h3>
            <ul className="space-y-2">
                {practices.map((practice, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        {practice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SQLPage = () => {
    const [activeSection, setActiveSection] = useState('basic-concepts');

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{sqlJson.title}</h1>
            </div>

            {/* Navigation */}
            <div className="mb-8 flex flex-wrap gap-4">
                {sqlJson.topics.map((topic) => (
                    <button
                        key={topic.id}
                        onClick={() => setActiveSection(topic.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeSection === topic.id
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                        }`}
                    >
                        {topic.title}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-8">
                {sqlJson.topics.map((topic) => (
                    activeSection === topic.id && (
                        <div key={topic.id}>
                            <h2 className="text-2xl font-bold text-white mb-6">{topic.title}</h2>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Basic Concepts */}
                                {topic.concepts?.map((concept, idx) => (
                                    <ConceptCard key={idx} concept={concept} />
                                ))}

                                {Array.isArray(topic?.categories) && topic.categories.map((category, idx) => (
                                    <DataTypeCard key={idx} category={category} />
                                ))}


                                {topic.operations?.map((operation, idx) => (
                                    <OperationCard key={idx} operation={operation} />
                                ))}

                                {topic.types?.map((join, idx) => (
                                    <JoinCard key={idx} join={join} />
                                ))}

                                {topic.features?.map((feature, idx) => (
                                    <FeatureCard key={idx} feature={feature} />
                                ))}

                                {topic.techniques?.map((technique, idx) => (
                                    <OptimizationCard key={idx} technique={technique} />
                                ))}

                                {/* Transaction Concepts */}
                                {topic.concepts?.map((concept, idx) => (
                                    <TransactionCard key={idx} concept={concept} />
                                ))}


                                {topic.practices?.map((category, idx) => (
                                    <BestPracticesCard key={idx} category={category} />
                                ))}

                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default SQLPage;