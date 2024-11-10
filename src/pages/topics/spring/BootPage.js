import React from 'react';
import bootJson from '../../../data/spring/boot.json';
import { Wrench, Settings, Database, Server, Code } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BootPage = () => {

    // Render auto-configuration concepts
    const renderAutoConfigurationConcepts = (concepts) => (
        concepts.map((concept, idx) => (
            <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">{concept.name}</h3>
                {concept.annotations && (
                    <div className="grid grid-cols-1 gap-6">
                        {concept.annotations.map((annotation, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                                <h4 className="text-lg font-medium text-purple-300 mb-2">{annotation.name}</h4>
                                <p className="text-gray-300 mb-2">{annotation.description}</p>
                                {annotation.example && (
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
                                        {annotation.example}
                                    </SyntaxHighlighter>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {concept.description && <p className="text-gray-300 mb-4">{concept.description}</p>}
                {concept.example && (
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
                        {concept.example.content}
                    </SyntaxHighlighter>
                )}
                {bootJson.topics[3].configuration && bootJson.topics[3].configuration.exposure && (
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                        <h4 className="text-sm font-medium text-purple-300 mb-1">Exposure Configuration:</h4>
                        <SyntaxHighlighter
                            language="properties"
                            style={oneDark}
                            customStyle={{
                                padding: '1em',
                                borderRadius: '0.5em',
                                overflow: 'auto',
                                backgroundColor: '#282c34',
                            }}
                        >
                            {bootJson.topics[3].configuration.exposure.example}
                        </SyntaxHighlighter>
                        <p className="text-gray-300 mt-2">
                            <strong>Note:</strong> {bootJson.topics[3].configuration.exposure.security}
                        </p>
                    </div>
                )}

                {concept.example && concept.example.path && (
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20 mt-4">
                        <h4 className="text-sm font-medium text-purple-300 mb-1">File Path: {concept.example.path}</h4>
                        <SyntaxHighlighter
                            language="properties"
                            style={oneDark}
                            customStyle={{
                                padding: '1em',
                                borderRadius: '0.5em',
                                overflow: 'auto',
                                backgroundColor: '#282c34',
                            }}
                        >
                            {concept.example.content}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        ))
    );

    // Render configuration properties
    const renderExternalConfiguration = (types) => (
        types.map((type, idx) => (
            <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">{type.name}</h3>
                <p className="text-gray-300 mb-4">{type.description}</p>
                {type.example && (
                    <div className="grid grid-cols-2 gap-4">
                        {type.example.properties && (
                            <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                                <h4 className="text-sm font-medium text-purple-300 mb-1">Properties</h4>
                                <SyntaxHighlighter
                                    language="properties"
                                    style={oneDark}
                                    customStyle={{
                                        padding: '1em',
                                        borderRadius: '0.5em',
                                        overflow: 'auto',
                                        backgroundColor: '#282c34',
                                    }}
                                >
                                    {type.example.properties}
                                </SyntaxHighlighter>
                            </div>
                        )}
                        {type.example.yaml && (
                            <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                                <h4 className="text-sm font-medium text-purple-300 mb-1">YAML</h4>
                                <SyntaxHighlighter
                                    language="yaml"
                                    style={oneDark}
                                    customStyle={{
                                        padding: '1em',
                                        borderRadius: '0.5em',
                                        overflow: 'auto',
                                        backgroundColor: '#282c34',
                                    }}
                                >
                                    {type.example.yaml}
                                </SyntaxHighlighter>
                            </div>
                        )}
                        {type.example.code && (
                            <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                                <h4 className="text-sm font-medium text-purple-300 mb-1">Code</h4>
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
                            </div>
                        )}
                    </div>
                )}
                {type.usage && (
                    <div className="grid grid-cols-1 gap-4">
                        {type.usage.map((usage, usageIdx) => (
                            <div key={usageIdx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                                <h4 className="text-sm font-medium text-purple-300 mb-1">{usage.method}</h4>
                                <SyntaxHighlighter
                                    language="properties"
                                    style={oneDark}
                                    customStyle={{
                                        padding: '1em',
                                        borderRadius: '0.5em',
                                        overflow: 'auto',
                                        backgroundColor: '#282c34',
                                    }}
                                >
                                    {usage.example}
                                </SyntaxHighlighter>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))
    );

    // Render starters for Spring Boot
    const renderStarters = (starters) => (
        starters.map((starter, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">{starter.name}</h3>
                <p className="text-gray-300 mb-2">{starter.description}</p>
                <p className="text-gray-400"><strong>Includes:</strong> {starter.includes.join(", ")}</p>
            </div>
        ))
    );

    // Render actuator details
    const renderActuator = (endpoints) => (
        endpoints.map((endpoint, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{endpoint.path}</h4>
                <p className="text-gray-300 mb-2">{endpoint.description}</p>
                <p className="text-gray-400"><strong>Usage:</strong> {endpoint.usage}</p>
            </div>
        ))
    );

    // Render embedded servers
    const renderEmbeddedServers = (servers) => (
        servers.map((server, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{server.name}</h4>
                <p className="text-gray-300 mb-2">{server.default ? 'Default Server' : 'Optional Server'}</p>
                {server.configuration && server.configuration.properties && (
                    <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Configuration Properties:</h5>
                        <ul className="list-disc list-inside text-gray-300">
                            {server.configuration.properties.map((prop, propIdx) => (
                                <li key={propIdx}>{prop}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {server.configuration && server.configuration.dependency && (
                    <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Dependency:</h5>
                        <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                            <SyntaxHighlighter
                                language="xml"
                                style={oneDark}
                                customStyle={{
                                    padding: '1em',
                                    borderRadius: '0.5em',
                                    overflow: 'auto',
                                    backgroundColor: '#282c34',
                                }}
                            >
                                {server.configuration.dependency}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                )}
                {server.configuration && server.configuration.exclusions && (
                    <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Exclusions:</h5>
                        <ul className="list-disc list-inside text-gray-300">
                            {server.configuration.exclusions.map((exclusion, exclusionIdx) => (
                                <li key={exclusionIdx}>{exclusion}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        ))
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{bootJson.title}</h1>
            </div>

            {/* Auto-Configuration */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Wrench className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{bootJson.topics[0].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{bootJson.topics[0].description}</p>
                {renderAutoConfigurationConcepts(bootJson.topics[0].concepts)}
            </div>

            {/* Externalized Configuration */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Settings className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{bootJson.topics[1].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{bootJson.topics[1].description}</p>
                {renderExternalConfiguration(bootJson.topics[1].types)}
            </div>

            {/* Spring Boot Starters */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Database className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{bootJson.topics[2].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{bootJson.topics[2].description}</p>
                {renderStarters(bootJson.topics[2].commonStarters)}
            </div>

            {/* Spring Boot Actuator */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Code className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{bootJson.topics[3].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{bootJson.topics[3].description}</p>
                {renderActuator(bootJson.topics[3].endpoints)}
            </div>

            {/* Embedded Servers */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Server className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{bootJson.topics[4].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{bootJson.topics[4].description}</p>
                {renderEmbeddedServers(bootJson.topics[4].servers)}
            </div>
        </div>
    );
};

export default BootPage;
