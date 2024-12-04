import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Book, GraduationCap, MessageCircle, FileText, ListChecks } from 'lucide-react';

const LevelTab = ({ level, activeLevel, onClick }) => (
    <button
        onClick={() => onClick(level)}
        className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
            activeLevel === level
                ? 'bg-purple-500/20 text-purple-300'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/40'
        }`}
    >
        {level}
    </button>
);

const PortalCard = ({ title, description, icon: Icon, path, comingSoon }) => (
    <Link
        to={comingSoon ? '#' : path}
        className={`bg-gray-800/40 rounded-lg p-6 border border-gray-700/50 hover:bg-gray-800/60 transition-all ${
            comingSoon ? 'cursor-not-allowed opacity-50' : ''
        }`}
    >
        <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-800 rounded-lg">
                <Icon className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    {comingSoon && (
                        <span className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-500/20 rounded">
              Coming Soon
            </span>
                    )}
                </div>
                <p className="mt-1 text-gray-400">{description}</p>
            </div>
        </div>
    </Link>
);

const LevelContent = ({ level }) => {
    const content = {
        'A1': [
            {
                title: "Basic Vocabulary",
                description: "Essential words and phrases for everyday situations",
                icon: BookOpen,
                path: "/vocabulary/a1"
            },
            {
                title: "Basic Verb Conjugation",
                description: "Present tense conjugation of regular and common irregular verbs",
                icon: Book,
                path: "/konjugation/a1"
            },
            {
                title: "Basic Grammar",
                description: "Fundamental German grammar rules and sentence structure",
                icon: GraduationCap,
                path: "/grammar/a1",
                comingSoon: true
            },
            {
                title: "Simple Dialogues",
                description: "Basic conversations for everyday situations",
                icon: MessageCircle,
                path: "/conversation/a1",
                comingSoon: true
            }
        ],
        'A2': [
            {
                title: "Intermediate Vocabulary",
                description: "Expanded vocabulary for more complex situations",
                icon: BookOpen,
                path: "/vocabulary/a2",
                comingSoon: true
            },
            {
                title: "Past Tense & Future",
                description: "Perfect and future tense conjugations",
                icon: Book,
                path: "/konjugation/a2",
                comingSoon: true
            },
            {
                title: "Advanced Grammar",
                description: "Intermediate grammar concepts including cases and word order",
                icon: GraduationCap,
                path: "/grammar/a2",
                comingSoon: true
            }
        ],
        'B1': [
            {
                title: "Advanced Vocabulary",
                description: "Complex vocabulary for expressing opinions and abstract concepts",
                icon: BookOpen,
                path: "/vocabulary/b1",
                comingSoon: true
            },
            {
                title: "Complex Verb Forms",
                description: "Subjunctive and passive voice",
                icon: Book,
                path: "/konjugation/b1",
                comingSoon: true
            },
            {
                title: "Reading Comprehension",
                description: "Intermediate texts with exercises",
                icon: FileText,
                path: "/reading/b1",
                comingSoon: true
            }
        ],
        'B2': [
            {
                title: "Professional Vocabulary",
                description: "Business and academic vocabulary",
                icon: BookOpen,
                path: "/vocabulary/b2",
                comingSoon: true
            },
            {
                title: "Advanced Writing",
                description: "Essay writing and formal correspondence",
                icon: FileText,
                path: "/writing/b2",
                comingSoon: true
            },
            {
                title: "Complex Grammar",
                description: "Advanced grammatical structures and exceptions",
                icon: GraduationCap,
                path: "/grammar/b2",
                comingSoon: true
            }
        ]
    };

    return (
        <div className="grid gap-6">
            {content[level].map((item, index) => (
                <PortalCard key={index} {...item} />
            ))}
        </div>
    );
};

const LevelDescription = ({ level }) => {
    const descriptions = {
        'A1': "Beginner - Can understand and use familiar everyday expressions and basic phrases.",
        'A2': "Elementary - Can communicate in simple and routine tasks requiring direct exchange of information.",
        'B1': "Intermediate - Can deal with most situations likely to arise while travelling in German-speaking areas.",
        'B2': "Upper Intermediate - Can interact with a degree of fluency and spontaneity with native speakers."
    };

    return (
        <div className="mb-8 p-4 bg-gray-800/40 rounded-lg border border-gray-700/50">
            <p className="text-gray-300">{descriptions[level]}</p>
        </div>
    );
};

const LearningPortal = () => {
    const [activeLevel, setActiveLevel] = useState('A1');
    const levels = ['A1', 'A2', 'B1', 'B2'];

    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                        German Learning Portal
                    </h1>
                    <p className="text-gray-400 text-lg">
                        A structured path to mastering German - from beginner to upper intermediate
                    </p>
                </div>

                {/* Level Selection */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center space-x-2 mb-8">
                        {levels.map(level => (
                            <LevelTab
                                key={level}
                                level={level}
                                activeLevel={activeLevel}
                                onClick={setActiveLevel}
                            />
                        ))}
                    </div>

                    {/* Level Description */}
                    <LevelDescription level={activeLevel} />

                    {/* Content Grid */}
                    <LevelContent level={activeLevel} />
                </div>
            </div>
        </div>
    );
};

export default LearningPortal;