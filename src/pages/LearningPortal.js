import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Book, GraduationCap, MessageCircle, FileText, ListChecks } from 'lucide-react';

const PortalCard = ({ title, description, icon: Icon, path, level, comingSoon }) => (
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
                    {level && (
                        <span className="px-2 py-1 text-xs font-medium text-purple-300 bg-purple-500/20 rounded">
              {level}
            </span>
                    )}
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

const LearningPortal = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                        German Learning Portal
                    </h1>
                    <p className="text-gray-400 text-lg">
                        A comprehensive collection of resources to help you master German
                    </p>
                </div>

                {/* Content Grid */}
                <div className="max-w-4xl mx-auto grid gap-6">
                    <PortalCard
                        title="Vocabulary Trainer"
                        description="Learn and practice essential German vocabulary organized by topics"
                        icon={BookOpen}
                        path="/vocabulary"
                        level="A1"
                    />

                    <PortalCard
                        title="Verb Conjugation"
                        description="Master German verb conjugations with interactive exercises"
                        icon={Book}
                        path="/konjugation"
                        level="A1"
                    />

                    <PortalCard
                        title="Grammar Guide"
                        description="Comprehensive guide to German grammar rules and structures"
                        icon={GraduationCap}
                        path="/grammar"
                        level="A1"
                        comingSoon
                    />

                    <PortalCard
                        title="Practice Exercises"
                        description="Interactive exercises to reinforce your learning"
                        icon={ListChecks}
                        path="/exercises"
                        level="A1"
                        comingSoon
                    />

                    <PortalCard
                        title="Reading Practice"
                        description="Short texts with translations and comprehension exercises"
                        icon={FileText}
                        path="/reading"
                        level="A1"
                        comingSoon
                    />

                    <PortalCard
                        title="Conversation Examples"
                        description="Common phrases and dialogues for everyday situations"
                        icon={MessageCircle}
                        path="/conversation"
                        level="A1"
                        comingSoon
                    />
                </div>
            </div>
        </div>
    );
};

export default LearningPortal;