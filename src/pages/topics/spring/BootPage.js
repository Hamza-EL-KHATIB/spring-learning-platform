import React, { useState } from 'react';
import { Wrench, Settings, Database, Server, Code, Package, Clock, Layout } from 'lucide-react';
import bootJson from '../../../data/spring/boot.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BootPage = () => {
    const [activeTab, setActiveTab] = useState('auto-configuration');

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {bootJson.topics.map((topic) => (
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
            case 'auto-configuration':
                return <Wrench className="w-4 h-4" />;
            case 'properties':
                return <Settings className="w-4 h-4" />;
            case 'starters':
                return <Package className="w-4 h-4" />;
            case 'actuator':
                return <Code className="w-4 h-4" />;
            case 'embedded-servers':
                return <Server className="w-4 h-4" />;
            case 'scheduling':
                return <Clock className="w-4 h-4" />;
            case 'components':
                return <Layout className="w-4 h-4" />;
            default:
                return <Database className="w-4 h-4" />;
        }
    };

    const renderAutoConfigurationConcepts = (concepts) => (
        <div className="space-y-6">
            {concepts.map((concept, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">{concept.name}</h3>

                    {concept.annotations && (
                        <div className="grid grid-cols-1 gap-4">
                            {concept.annotations.map((annotation, index) => (
                                <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">{annotation.name}</h4>
                                    <p className="text-gray-300 mb-3">{annotation.description}</p>
                                    {annotation.example && (
                                        <SyntaxHighlighter
                                            language="java"
                                            style={oneDark}
                                            customStyle={{
                                                borderRadius: '0.5rem',
                                                padding: '1rem',
                                                backgroundColor: '#282c34',
                                            }}
                                        >
                                            {annotation.example}
                                        </SyntaxHighlighter>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {concept.description && <p className="text-gray-300 mb-4">{concept.description}</p>}

                    {concept.example && (
                        <div className="mt-4">
                            {concept.example.path && (
                                <div className="mb-2 text-gray-300">
                                    <strong>File Path:</strong> {concept.example.path}
                                </div>
                            )}
                            <SyntaxHighlighter
                                language="properties"
                                style={oneDark}
                                customStyle={{
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    backgroundColor: '#282c34',
                                }}
                            >
                                {concept.example.content}
                            </SyntaxHighlighter>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderExternalConfiguration = (types) => (
        <div className="space-y-6">
            {types.map((type, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{type.name}</h3>
                    {type.description && <p className="text-gray-300 mb-4">{type.description}</p>}

                    {type.locations && (
                        <div className="mb-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Available Locations</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {type.locations.map((location, locIdx) => (
                                    <li key={locIdx}>{location}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {type.example && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {type.example.properties && (
                                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">Properties Format</h4>
                                    <SyntaxHighlighter
                                        language="properties"
                                        style={oneDark}
                                        customStyle={{
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            backgroundColor: '#282c34',
                                        }}
                                    >
                                        {type.example.properties}
                                    </SyntaxHighlighter>
                                </div>
                            )}
                            {type.example.yaml && (
                                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">YAML Format</h4>
                                    <SyntaxHighlighter
                                        language="yaml"
                                        style={oneDark}
                                        customStyle={{
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            backgroundColor: '#282c34',
                                        }}
                                    >
                                        {type.example.yaml}
                                    </SyntaxHighlighter>
                                </div>
                            )}
                            {type.example.code && (
                                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">Example Code</h4>
                                    <SyntaxHighlighter
                                        language="java"
                                        style={oneDark}
                                        customStyle={{
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            backgroundColor: '#282c34',
                                        }}
                                    >
                                        {type.example.code}
                                    </SyntaxHighlighter>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderAnnotations = (annotations) => (
        <div className="grid grid-cols-1 gap-4">
            {annotations.map((annotation, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{annotation.name}</h4>
                    <p className="text-gray-300 mb-3">{annotation.description}</p>
                    {annotation.example && (
                        <SyntaxHighlighter
                            language="java"
                            style={oneDark}
                            customStyle={{
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                backgroundColor: '#282c34',
                            }}
                        >
                            {annotation.example}
                        </SyntaxHighlighter>
                    )}
                </div>
            ))}
        </div>
    );

    const renderStarters = (starters) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {starters.map((starter, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{starter.name}</h3>
                    <p className="text-gray-300 mb-4">{starter.description}</p>

                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 mb-4">
                        <h4 className="text-lg font-medium text-gray-200 mb-2">Includes</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            {starter.includes.map((include, includeIdx) => (
                                <li key={includeIdx}>{include}</li>
                            ))}
                        </ul>
                    </div>

                    {starter.annotations && (
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Annotations</h4>
                            {renderAnnotations(starter.annotations)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderScheduling = (topic) => (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">{topic.title}</h3>
            <p className="text-gray-300 mb-6">{topic.description}</p>
            {topic.annotations && renderAnnotations(topic.annotations)}
        </div>
    );

    const renderComponents = (topic) => (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">{topic.title}</h3>
            <p className="text-gray-300 mb-6">{topic.description}</p>
            {topic.annotations && renderAnnotations(topic.annotations)}
        </div>
    );

    const renderActuator = (endpoints, configuration) => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {endpoints.map((endpoint, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">{endpoint.path}</h3>
                        <p className="text-gray-300 mb-4">{endpoint.description}</p>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Usage</h4>
                            <p className="text-gray-300">{endpoint.usage}</p>
                        </div>
                    </div>
                ))}
            </div>

            {configuration?.exposure && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">Configuration</h3>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                        <SyntaxHighlighter
                            language="properties"
                            style={oneDark}
                            customStyle={{
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                backgroundColor: '#282c34',
                            }}
                        >
                            {configuration.exposure.example}
                        </SyntaxHighlighter>
                        <p className="text-yellow-300 mt-4">
                            <strong>Security Note:</strong> {configuration.exposure.security}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );

    const renderEmbeddedServers = (servers) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servers.map((server, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-purple-400">{server.name}</h3>
                        {server.default && (
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                                Default Server
                            </span>
                        )}
                    </div>

                    {server.configuration && (
                        <div className="space-y-4">
                            {server.configuration.properties && (
                                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-gray-200 mb-2">Properties</h4>
                                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                                        {server.configuration.properties.map((prop, propIdx) => (
                                            <li key={propIdx}>{prop}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {server.configuration.dependency && (
                                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-gray-200 mb-2">Dependencies</h4>
                                    <SyntaxHighlighter
                                        language="xml"
                                        style={oneDark}
                                        customStyle={{
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            backgroundColor: '#282c34',
                                        }}
                                    >
                                        {server.configuration.dependency}
                                    </SyntaxHighlighter>
                                </div>
                            )}

                            {server.configuration.exclusions && (
                                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-lg font-medium text-gray-200 mb-2">Exclusions</h4>
                                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                                        {server.configuration.exclusions.map((exclusion, exIdx) => (
                                            <li key={exIdx}>{exclusion}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        const topic = bootJson.topics.find(t => t.id === activeTab);
        if (!topic) return null;

        switch (activeTab) {
            case 'auto-configuration':
                return renderAutoConfigurationConcepts(topic.concepts);
            case 'properties':
                return renderExternalConfiguration(topic.types);
            case 'starters':
                return renderStarters(topic.commonStarters);
            case 'actuator':
                return renderActuator(topic.endpoints, topic.configuration);
            case 'embedded-servers':
                return renderEmbeddedServers(topic.servers);
            case 'scheduling':
                return renderScheduling(topic);
            case 'components':
                return renderComponents(topic);
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{bootJson.title}</h1>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Content */}
            <div className="space-y-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default BootPage;