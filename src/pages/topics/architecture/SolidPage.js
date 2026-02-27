import React, { useState } from 'react';
import solidJson from '../../../data/architecture/solid.json';
import {
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Lightbulb,
    ListChecks,
    Box
} from 'lucide-react';
import CodeBlock from '../../../components/CodeBlock';

const PrincipleCard = ({ principle }) => {
    const [showGoodPractice, setShowGoodPractice] = useState(false);

    return (
        <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-700/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10 text-purple-400 font-bold text-2xl">
                        {principle.acronym}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">{principle.name}</h3>
                        <p className="text-gray-400 text-sm">{principle.key_concept}</p>
                    </div>
                </div>
                <p className="text-gray-300">{principle.definition}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Example Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-white">Example</h4>
                        <button
                            onClick={() => setShowGoodPractice(!showGoodPractice)}
                            className="text-sm px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                        >
                            {showGoodPractice ? 'Show Bad Practice' : 'Show Good Practice'}
                        </button>
                    </div>

                    {principle.examples.map((example, idx) => (
                        <div key={idx}>
                            <div className="flex items-center gap-2 mb-3">
                                {showGoodPractice ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-400" />
                                )}
                                <h5 className="text-sm font-medium text-gray-300">
                                    {showGoodPractice ? example.good_practice.title : example.bad_practice.title}
                                </h5>
                            </div>
                            <CodeBlock
                                code={showGoodPractice ? example.good_practice.code : example.bad_practice.code}
                            />
                        </div>
                    ))}
                </div>

                {/* Benefits and Violations */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="flex items-center gap-2 text-lg font-medium text-white mb-3">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            Benefits
                        </h4>
                        <ul className="space-y-2">
                            {principle.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-300">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="flex items-center gap-2 text-lg font-medium text-white mb-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            Violation Indicators
                        </h4>
                        <ul className="space-y-2">
                            {principle.indicators_of_violation.map((indicator, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-300">
                                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                                    {indicator}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GuidelineSection = ({ title, items, icon: Icon, color }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <Icon className={`w-5 h-5 ${color}`} />
            {title}
        </h3>
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <span className={`w-1.5 h-1.5 ${color} rounded-full`}></span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const MisconceptionCard = ({ misconception }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <div className="flex items-center gap-2 text-red-400 mb-2">
            <XCircle className="w-5 h-5" />
            <h4 className="font-medium">
                {`Misconception about ${misconception.principle}`}
            </h4>
        </div>
        <p className="text-gray-300 mb-3">{misconception.misconception}</p>
        <div className="flex items-center gap-2 text-green-400 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-gray-300">{misconception.clarification}</p>
        </div>
    </div>
);

const SolidPage = () => {
    const [activePrinciple, setActivePrinciple] = useState('s');

    const TabNavigation = () => (
        <div className="mb-8 flex flex-wrap gap-4">
            {solidJson.principles.map((principle) => (
                <button
                    key={principle.acronym}
                    onClick={() => setActivePrinciple(principle.acronym.toLowerCase())}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activePrinciple === principle.acronym.toLowerCase()
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                >
                    <Box className="w-4 h-4" />
                    {principle.acronym}
                </button>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{solidJson.title}</h1>
                <p className="text-gray-300">{solidJson.description}</p>
            </div>

            {/* Navigation */}
            <TabNavigation />

            {/* Active Principle */}
            <div className="mb-12">
                <PrincipleCard
                    principle={solidJson.principles.find(p =>
                        p.acronym.toLowerCase() === activePrinciple
                    )}
                />
            </div>

            {/* Guidelines and Misconceptions */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Guidelines & Common Misconceptions
                </h2>

                {/* Implementation Guidelines */}
                <div className="grid md:grid-cols-2 gap-6">
                    <GuidelineSection
                        title="When to Apply"
                        items={solidJson.implementation_guidelines.when_to_apply}
                        icon={ListChecks}
                        color="text-cyan-400"
                    />
                    <GuidelineSection
                        title="Key Considerations"
                        items={solidJson.implementation_guidelines.considerations}
                        icon={Lightbulb}
                        color="text-yellow-400"
                    />
                </div>

                {/* Misconceptions */}
                <div className="grid md:grid-cols-2 gap-6">
                    {solidJson.common_misconceptions.map((misconception, idx) => (
                        <MisconceptionCard
                            key={idx}
                            misconception={misconception}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SolidPage;
