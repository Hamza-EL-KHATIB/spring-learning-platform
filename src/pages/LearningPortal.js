import React from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Book,
    ArrowRight,
    BookOpen as Library,
    GraduationCap
} from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, path, features }) => (
    <div className="group relative">
        <Link to={path} className="block h-full">
            <div className="h-full p-8 bg-gray-800/30 rounded-xl border border-gray-700/50 transition-all duration-300 hover:bg-gray-800/50 hover:border-purple-500/30">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="p-3 inline-flex rounded-xl bg-gray-800 group-hover:bg-gray-900/80 transition-colors mb-4">
                            <Icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                        <p className="text-gray-400 mb-6">{description}</p>

                        <div className="space-y-2">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                </div>
            </div>
        </Link>
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
);

const ResourcesSection = ({ title, resources }) => (
    <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-800 rounded-lg">
                <Library className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, idx) => (
                <FeatureCard key={idx} {...resource} />
            ))}
        </div>
    </div>
);

const LearningPortal = () => {
    const mainResources = [
        {
            title: "Verb Conjugation",
            description: "Master German verb conjugation through interactive practice",
            icon: Book,
            path: "/konjugation",
            features: [
                "Regular and irregular verbs",
                "Present tense conjugation",
                "Past tense forms",
                "Interactive exercises"
            ]
        },
        {
            title: "Vocabulary Builder",
            description: "Build your German vocabulary with essential words and phrases",
            icon: BookOpen,
            path: "/vocabulary",
            features: [
                "Thematic word collections",
                "Common expressions",
                "Example sentences",
                "Practice exercises"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                        German Learning Tools
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Interactive resources to help you master German vocabulary and verb conjugation
                    </p>
                </div>

                {/* Main Resources */}
                <ResourcesSection
                    title="Core Learning Tools"
                    resources={mainResources}
                />

                {/* Tips Section */}
                <div className="mt-16">
                    <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-800 rounded-lg">
                                <GraduationCap className="w-5 h-5 text-purple-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Learning Tips</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h3 className="text-purple-300 font-medium mb-2">Regular Practice</h3>
                                <p className="text-gray-400 text-sm">Spend a few minutes each day practicing verb conjugations and learning new vocabulary.</p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h3 className="text-purple-300 font-medium mb-2">Use in Context</h3>
                                <p className="text-gray-400 text-sm">Try to use new words and verb forms in sentences to better remember them.</p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h3 className="text-purple-300 font-medium mb-2">Pattern Recognition</h3>
                                <p className="text-gray-400 text-sm">Focus on identifying patterns in verb conjugations to learn more effectively.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPortal;