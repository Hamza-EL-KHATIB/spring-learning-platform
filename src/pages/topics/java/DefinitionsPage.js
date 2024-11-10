import React from 'react';
import exceptionsJson from '../../../data/java/exceptions.json';
import { AlertTriangle, FileWarning, Layers } from 'lucide-react';
import CodeBlock from "../../../components/CodeBlock"

const ExceptionsPage = () => {
    // Render Exception Types
    const renderExceptionType = (type) => (
        <div key={type.type} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{type.type}</h4>
            <p className="text-gray-300 mb-2">{type.description}</p>
            {type.examples && (
                <div className="mt-2">
                    <h5 className="text-sm text-gray-400 mb-2">Examples:</h5>
                    <ul className="list-disc list-inside space-y-1">
                        {type.examples.map((example, idx) => (
                            <li key={idx} className="text-gray-300">
                                <strong>{example.exception || example.error}:</strong> {example.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    // Render Handling Methods
    const renderHandlingMethod = (method) => (
        <div key={method.method} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{method.method}</h4>
            <p className="text-gray-300">{method.description}</p>
        </div>
    );

    // Render Custom Exceptions Section
    const renderCustomException = (custom) => (
        <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{custom.title}</h4>
            <p className="text-gray-300 mb-4">{exceptionsJson.topics[2].description}</p>
            <h5 className="text-sm text-gray-400 mb-2">Steps:</h5>
            <ul className="list-disc list-inside space-y-1 mb-4">
                {custom.steps.map((step, idx) => (
                    <li key={idx} className="text-gray-300">{step}</li>
                ))}
            </ul>
            <div className="mt-4">
                <h5 className="text-sm text-gray-400 mb-2">Example Code:</h5>
                <CodeBlock code={custom.code} />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{exceptionsJson.title}</h1>
            </div>

            {/* Overview of Exceptions */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <AlertTriangle className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{exceptionsJson.topics[0].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{exceptionsJson.topics[0].description}</p>
                <div className="grid grid-cols-1 gap-6">
                    {exceptionsJson.topics[0].types.map(renderExceptionType)}
                </div>
            </div>

            {/* Handling Exceptions */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <FileWarning className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{exceptionsJson.topics[1].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{exceptionsJson.topics[1].description}</p>
                <div className="grid grid-cols-1 gap-6">
                    {exceptionsJson.topics[1].methods.map(renderHandlingMethod)}
                </div>
            </div>

            {/* Creating Custom Exceptions */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Layers className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{exceptionsJson.topics[2].title}</h2>
                </div>
                <div>
                    {renderCustomException(exceptionsJson.topics[2])}
                </div>
            </div>
        </div>
    );
};

export default ExceptionsPage;
