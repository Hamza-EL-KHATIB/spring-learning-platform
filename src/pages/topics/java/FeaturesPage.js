import React from 'react';
import featuresJson from '../../../data/java/features.json';
import { Zap, List, Calendar, Code } from 'lucide-react';
import CodeBlock from '../../../components/CodeBlock';
//import { CodeBlock } from 'react-code-blocks';

const FeaturesPage = () => {

    // Render methods within each operation (e.g., Basic Operations, Terminal Operations)
    const renderMethods = (methods) => (
        methods.map((method, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{method.name}</h4>
                <p className="text-gray-300 mb-2">{method.description}</p>
                <CodeBlock code={method.example} />
            </div>
        ))
    );

    // Render sections for Stream API operations
    const renderStreamOperations = (operations) => (
        operations.map((operation, idx) => (
            <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">{operation.name}</h3>
                <div className="grid grid-cols-1 gap-6">
                    {renderMethods(operation.methods)}
                </div>
            </div>
        ))
    );

    // Render CompletableFuture features (Creation, Transformation, etc.)
    const renderCompletableFutureFeatures = (features) => (
        features.map((feature, idx) => (
            <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">{feature.category}</h3>
                <div className="grid grid-cols-1 gap-6">
                    {renderMethods(feature.methods)}
                </div>
            </div>
        ))
    );

    // Render classes for Date/Time API
    const renderDateTimeClasses = (classes) => (
        classes.map((cls, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{cls.name}</h4>
                <p className="text-gray-300 mb-2">{cls.description}</p>
                <div className="mt-4 space-y-2">
                    {cls.examples.map((example, exampleIdx) => (
                        <div key={exampleIdx}>
                            <h5 className="text-sm text-gray-400 mb-1">{example.operation}:</h5>
                            <CodeBlock code={example.code} />
                        </div>
                    ))}
                </div>
            </div>
        ))
    );

    // Render method references
    const renderMethodReferences = (types) => (
        types.map((ref, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{ref.type}</h4>
                <p className="text-gray-300 mb-2"><strong>Syntax:</strong> {ref.syntax}</p>
                <CodeBlock code={ref.example} />
            </div>
        ))
    );

    // Render examples for Method References
    const renderMethodReferenceExamples = (examples) => (
        examples.map((example, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{example.scenario}</h4>
                <CodeBlock code={example.code} />
            </div>
        ))
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{featuresJson.title}</h1>
            </div>

            {/* Stream API */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <List className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{featuresJson.topics[0].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{featuresJson.topics[0].description}</p>
                {renderStreamOperations(featuresJson.topics[0].operations)}
            </div>

            {/* CompletableFuture */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Zap className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{featuresJson.topics[1].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{featuresJson.topics[1].description}</p>
                {renderCompletableFutureFeatures(featuresJson.topics[1].features)}
            </div>

            {/* Date/Time API */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Calendar className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{featuresJson.topics[2].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{featuresJson.topics[2].description}</p>
                <div className="grid grid-cols-1 gap-6">
                    {renderDateTimeClasses(featuresJson.topics[2].classes)}
                </div>
            </div>

            {/* Method References */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Code className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{featuresJson.topics[3].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{featuresJson.topics[3].description}</p>
                {renderMethodReferences(featuresJson.topics[3].types)}
                {renderMethodReferenceExamples(featuresJson.topics[3].examples)}
            </div>

            {/* Default Methods */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Code className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{featuresJson.topics[4].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{featuresJson.topics[4].description}</p>
                {featuresJson.topics[4].examples.map((example, idx) => (
                    <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                        <h4 className="text-lg font-medium text-purple-300 mb-2">{example.title}</h4>
                        <CodeBlock code={example.code} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesPage;
