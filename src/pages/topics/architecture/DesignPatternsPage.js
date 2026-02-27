import React, { useState } from 'react';
import designPatternsJsonEn from '../../../data/architecture/design-patterns.json';
import {
    Box,
    Code,
    Layers,
    Network,
    PackageOpen,
    Settings,
    CheckCircle2,
    XCircle,
    Combine,
} from 'lucide-react';
import CodeBlock from '../../../components/CodeBlock';
import visitorImg from '../../../data/images/Visitor.png'
import singletonImg from '../../../data/images/Singleton.png'
import factoryMethodImg from '../../../data/images/Factory Method.png'
import abstractFactoryImg from '../../../data/images/Abstract Factory.png'
import builderImg from '../../../data/images/Builder.png'
import prototypeImg from '../../../data/images/Prototype.png'
import adapterImg from '../../../data/images/Adapter.png'
import bridgeImg from '../../../data/images/Bridge.png'
import compositeImg from '../../../data/images/Composite.png'
import decoratorImg from '../../../data/images/Decorator.png'
import facadeImg from '../../../data/images/Facade.png'
import flyweightImg from '../../../data/images/Flyweight.png'
import proxyImg from '../../../data/images/Proxy.png'
import observerImg from '../../../data/images/Observer.png'
import strategyImg from '../../../data/images/Strategy.png'
import templateMethodImg from '../../../data/images/Template Method.png'
import stateImg from '../../../data/images/State.png'

const patternImages = {
    'Visitor': visitorImg,
    'Singleton': singletonImg,
    'Factory Method': factoryMethodImg,
    'Abstract Factory': abstractFactoryImg,
    'Builder': builderImg,
    'Prototype': prototypeImg,
    'Adapter': adapterImg,
    'Bridge': bridgeImg,
    'Composite': compositeImg,
    'Decorator': decoratorImg,
    'Facade': facadeImg,
    'Flyweight': flyweightImg,
    'Proxy': proxyImg,
    'Observer': observerImg,
    'Strategy': strategyImg,
    'Template Method': templateMethodImg,
    'State': stateImg
};

const PatternCard = ({ pattern }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">{pattern.name}</h3>
                            <p className="text-gray-300">{pattern.description}</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group flex-shrink-0 hover:scale-105 transition-transform duration-200"
                        >
                            <div className="relative">
                                <img
                                    src={patternImages[pattern.name]}
                                    alt={`${pattern.name} diagram`}
                                    className="w-32 h-32 object-contain bg-gray-900/50 rounded-lg p-2 group-hover:ring-2 ring-cyan-500/50"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 rounded-lg transition-colors">
                                    <svg
                                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">
                            Use Cases
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                            {pattern.use_cases.map((useCase, idx) => (
                                <li key={idx} className="text-gray-300">{useCase}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Implementation */}
                    {pattern.implementation && (
                        <div>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                <Code className="w-4 h-4" />
                                {isExpanded ? 'Hide Implementation' : 'View Implementation'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Expanded Implementation Section */}
                {isExpanded && pattern.implementation && (
                    <div className="border-t border-gray-700/50">
                        <div className="p-6">
                            <CodeBlock code={pattern.implementation.code} />

                            {pattern.considerations && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                                        Considerations
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {pattern.considerations && pattern.considerations.map((consideration, idx) => (
                                            <li key={idx} className="text-gray-300">{consideration}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <PatternModal
                pattern={pattern}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                image={patternImages[pattern.name]}
            />
        </>
    );
};

const PatternModal = ({ pattern, isOpen, onClose, image }) => {
    // Move useEffect outside of the conditional
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
            />

            {/* Modal Container with max-height and scrolling */}
            <div className="relative w-full max-w-4xl mx-4 my-6">
                {/* Content wrapper with scrolling */}
                <div className="relative bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
                    {/* Close button - now sticky */}
                    <div className="sticky top-0 right-0 pt-4 pr-4 z-50 flex justify-end bg-gray-800">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700/50"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6 pt-0">
                        {/* Header */}
                        <h2 className="text-2xl font-bold text-white mb-4">{pattern.name}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image Section */}
                            <div className="space-y-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <img
                                        src={image}
                                        alt={`${pattern.name} diagram`}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-6">
                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-400">{pattern.description}</p>
                                </div>

                                {/* Use Cases */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        Use Cases
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {pattern.use_cases.map((useCase, idx) => (
                                            <li key={idx} className="text-gray-400">{useCase}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Considerations */}
                                {pattern.considerations && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-300 mb-2">
                                            Considerations
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            {pattern.considerations.map((consideration, idx) => (
                                                <li key={idx} className="text-gray-400">{consideration}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Implementation Section */}
                        {pattern.implementation && (
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-300 mb-2">
                                    Implementation
                                </h3>
                                <CodeBlock code={pattern.implementation.code} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BestPracticesSection = ({ bestPractices }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-medium text-white">
                        Selection Criteria
                    </h3>
                </div>
                <ul className="space-y-2">
                    {bestPractices.selection_criteria.map((criteria, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                            {criteria}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-medium text-white">
                        Implementation Guidelines
                    </h3>
                </div>
                <ul className="space-y-2">
                    {bestPractices.implementation_guidelines.map((guideline, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                            {guideline}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-medium text-white">
                        Common Pitfalls
                    </h3>
                </div>
                <ul className="space-y-2">
                    {bestPractices.common_pitfalls.map((pitfall, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {pitfall}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const PatternRelationships = ({ relationships }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Combine className="w-5 h-5 text-purple-400" />
            Commonly Combined Patterns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relationships.commonly_combined.map((combo, idx) => (
                <div key={idx} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Network className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300">{combo.patterns.join(" + ")}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{combo.use_case}</p>
                </div>
            ))}
        </div>
    </div>
);

const DesignPatternsPage = () => {
    const designPatternsJson = designPatternsJsonEn;

    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = designPatternsJson.categories;

    const getCategoryIcon = (categoryName) => {
        const lowerName = categoryName.toLowerCase();
        if (lowerName.includes('creational')) {
            return <PackageOpen className="w-5 h-5" />;
        } else if (lowerName.includes('structural')) {
            return <Layers className="w-5 h-5" />;
        } else if (lowerName.includes('behavioral')) {
            return <Network className="w-5 h-5" />;
        } else {
            return <Box className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">

            {/* Header Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{designPatternsJson.title}</h1>
                <p className="text-gray-300">{designPatternsJson.description}</p>
            </div>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-4">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === 'all'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    All Patterns
                </button>
                {categories.map((category, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedCategory === category.name
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                        }`}
                    >
                        {getCategoryIcon(category.name)}
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Patterns Grid */}
            <div className="space-y-8 mb-12">
                {categories.map((category, idx) => (
                    (selectedCategory === 'all' || selectedCategory === category.name) && (
                        <div key={idx}>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                {getCategoryIcon(category.name)}
                                {category.name}
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {category.patterns.map((pattern, patternIdx) => (
                                    <PatternCard
                                        key={patternIdx}
                                        pattern={pattern}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>

            {/* Best Practices Section */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Best Practices & Relationships
                </h2>
                <BestPracticesSection
                    bestPractices={designPatternsJson.best_practices}
                />
                <PatternRelationships
                    relationships={designPatternsJson.relationships}
                />
            </div>
        </div>
    );
};

export default DesignPatternsPage;