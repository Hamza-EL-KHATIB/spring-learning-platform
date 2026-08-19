import React from 'react';
import {
    BookOpen, Code2, Layers, GitMerge, Settings, Shield, Code,
    Database, Package, Server, Box,
} from 'lucide-react';
import definitionsEn from '../../../data/spring/definitions.json';
import CodeBlock from '../../../components/template/CodeBlock';

// Quick-reference glossary: all definitions visible at once (interview cheat-sheet),
// unlike the tabbed TopicPageTemplate pages.
const DefinitionsPage = () => {
    const definitions = definitionsEn;

    const getDefinitionIcon = (topicTitle) => {
        switch (topicTitle) {
            case 'Inversion of Control (IoC)':
                return <Box className="w-4 h-4 text-blue-400" />;
            case 'Dependency Injection (DI)':
                return <Server className="w-4 h-4 text-green-400" />;
            case 'IoC Container':
                return <Package className="w-4 h-4 text-yellow-400" />;
            case 'Bean':
                return <Database className="w-4 h-4 text-purple-400" />;
            case 'Bean Lifecycle':
                return <GitMerge className="w-4 h-4 text-orange-400" />;
            case 'ApplicationContext vs BeanFactory':
                return <Settings className="w-4 h-4 text-teal-400" />;
            case 'Autowiring':
                return <Code className="w-4 h-4 text-indigo-400" />;
            case 'Bean Scopes':
                return <Layers className="w-4 h-4 text-pink-400" />;
            case 'Aspect-Oriented Programming (AOP)':
                return <Shield className="w-4 h-4 text-cyan-400" />;
            case 'Spring Boot':
                return <Server className="w-4 h-4 text-red-400" />;
            case 'Transaction Management in Spring':
                return <GitMerge className="w-4 h-4 text-emerald-400" />;
            default:
                return <BookOpen className="w-4 h-4 text-gray-400" />;
        }
    };

    const DefinitionCard = ({ topic }) => {
        if (!topic || topic.title === 'code_examples') return null;

        const icon = getDefinitionIcon(topic.title);
        const definition = topic['multi-content']?.[0]?.['simple-content'] || '';

        return (
            <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg p-4 border border-purple-500/20 shadow-md transition-all hover:shadow-lg hover:border-purple-500/30">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-gray-800/80 rounded-md">
                        {icon}
                    </div>
                    <h3 className="text-lg font-medium text-white">{topic.title}</h3>
                </div>
                <p className="text-gray-300 ml-8 text-sm">{definition}</p>
            </div>
        );
    };

    const renderCodeExamples = () => {
        const codeExamples = definitions.topics?.find(topic => topic.title === 'code_examples');

        if (!codeExamples || !codeExamples['multi-content']) return null;

        return (
            <div className="mt-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg p-6 border border-pink-500/20 shadow-lg">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                    Code Examples
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {codeExamples['multi-content'].map((example, idx) => (
                        <div key={idx} className="bg-gray-800/80 rounded-lg p-4 border border-pink-500/20 shadow-md">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-gray-800/90 rounded-md">
                                    <Code2 className="w-4 h-4 text-pink-400" />
                                </div>
                                <h4 className="text-base font-medium text-pink-300">{example.title}</h4>
                            </div>
                            <CodeBlock code={example['simple-content']} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const getDefinitionTopics = () => {
        return definitions.topics?.filter(topic => topic.title !== 'code_examples') || [];
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-5 border border-purple-500/30 shadow-md">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {definitions.title}
                </h1>
                <p className="text-gray-400 mt-2">
                    Essential Spring concepts for quick reference and interview preparation
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {getDefinitionTopics().map((topic, index) => (
                    <DefinitionCard key={index} topic={topic} />
                ))}
            </div>

            {renderCodeExamples()}
        </div>
    );
};

export default DefinitionsPage;
