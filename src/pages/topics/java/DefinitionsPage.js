import React from 'react';
import definitionsJson from '../../../data/java/definitions.json';
import { Box, Cpu, Database, MemoryStick } from 'lucide-react';

const DefinitionsPage = () => {
    // Render OOP Principles
    const renderOOPPrinciples = (details) => (
        <div className="grid grid-cols-1 gap-6">
            {details.map((item, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{item.principle}</h4>
                    <p className="text-gray-300 mb-3">{item.definition}</p>
                    <div className="mt-2">
                        <h5 className="text-sm text-gray-400 mb-2">Example:</h5>
                        <p className="text-gray-300 bg-gray-700/50 p-2 rounded">{item.example}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    // Render JVM Components
    const renderJVMComponents = (components) => (
        <div className="grid grid-cols-1 gap-6">
            {components.map((component, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{component.name}</h4>
                    <p className="text-gray-300 mb-3">{component.function}</p>
                    {component.stages && (
                        <div className="mt-2">
                            <h5 className="text-sm text-gray-400 mb-2">Stages:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                {component.stages.map((stage, stageIdx) => (
                                    <li key={stageIdx} className="text-gray-300">{stage}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {component["sub-areas"] && (
                        <div className="mt-2">
                            <h5 className="text-sm text-gray-400 mb-2">Memory Areas:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                {component["sub-areas"].map((area, areaIdx) => (
                                    <li key={areaIdx} className="text-gray-300">{area}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {component.components && (
                        <div className="mt-2">
                            <h5 className="text-sm text-gray-400 mb-2">Components:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                {component.components.map((comp, compIdx) => (
                                    <li key={compIdx} className="text-gray-300">{comp}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    // Render Memory Areas
    const renderMemoryAreas = (areas) => (
        <div className="grid grid-cols-1 gap-6">
            {areas.map((area, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{area.name}</h4>
                    <p className="text-gray-300 mb-3">{area.description}</p>
                    <div className="mt-2">
                        <h5 className="text-sm text-gray-400 mb-2">Characteristics:</h5>
                        <ul className="list-disc list-inside space-y-1">
                            {area.characteristics.map((char, charIdx) => (
                                <li key={charIdx} className="text-gray-300">{char}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );

    // Render Platform Components
    const renderPlatformComponents = (components) => (
        <div className="grid grid-cols-1 gap-6">
            {components.map((component, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">{component.name}</h4>
                    <p className="text-gray-300 mb-3">{component.definition}</p>
                    {component.tools && (
                        <div className="mt-2">
                            <h5 className="text-sm text-gray-400 mb-2">Tools:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                {component.tools.map((tool, toolIdx) => (
                                    <li key={toolIdx} className="text-gray-300">{tool}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {component.includes && (
                        <div className="mt-2">
                            <h5 className="text-sm text-gray-400 mb-2">Includes:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                {component.includes.map((item, itemIdx) => (
                                    <li key={itemIdx} className="text-gray-300">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {component.features && (
                        <div className="mt-2">
                            <h5 className="text-sm text-gray-400 mb-2">Features:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                {component.features.map((feature, featureIdx) => (
                                    <li key={featureIdx} className="text-gray-300">{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{definitionsJson.definitions.title}</h1>
                <p className="text-gray-300">{definitionsJson.definitions.description}</p>
            </div>

            {/* OOP Principles */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Box className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{definitionsJson.definitions.topics[0].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{definitionsJson.definitions.topics[0].description}</p>
                {renderOOPPrinciples(definitionsJson.definitions.topics[0].details)}
            </div>

            {/* JVM Architecture */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Cpu className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{definitionsJson.definitions.topics[1].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{definitionsJson.definitions.topics[1].description}</p>
                {renderJVMComponents(definitionsJson.definitions.topics[1].components)}
            </div>

            {/* Memory Management */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <MemoryStick className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{definitionsJson.definitions.topics[2].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{definitionsJson.definitions.topics[2].description}</p>
                {renderMemoryAreas(definitionsJson.definitions.topics[2]["memory-areas"])}
            </div>

            {/* Platform Components */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Database className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{definitionsJson.definitions.topics[3].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{definitionsJson.definitions.topics[3].description}</p>
                {renderPlatformComponents(definitionsJson.definitions.topics[3].components)}
            </div>
        </div>
    );
};

export default DefinitionsPage;