import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ScrollText, FileText, Feather, Asterisk, Table } from 'lucide-react';
import { PageHeader } from '../components/template/shell';

const SECTIONS = [
    { path: '/learn/konjugation', title: 'Verb Conjugation', icon: GraduationCap, description: 'Practice conjugating German verbs in different tenses' },
    { path: '/learn/vocabulary', title: 'Vocabulary', icon: ScrollText, description: 'Learn essential German vocabulary by theme' },
    { path: '/german/articles', title: 'Articles', icon: FileText, description: 'Learn how to use and decline German articles' },
    { path: '/german/adjectives', title: 'Adjective Endings', icon: Feather, description: 'Learn how to correctly form adjectives in various cases' },
    { path: '/german/cases', title: 'Case Rules', icon: Asterisk, description: 'Learn essential German case rules and tricks' },
    { path: '/learn/german-cases', title: 'Cases Reference', icon: Table, description: 'Full article, pronoun and adjective ending tables' },
];

const LearningPortal = () => (
    <div>
        <PageHeader title="German Learning" subtitle="Grammar references and vocabulary practice" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SECTIONS.map((section) => (
                <Link key={section.path} to={section.path} className="block">
                    <div className="h-full p-4 bg-gray-800/70 rounded-md border border-gray-700/50 hover:border-purple-500/40 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-1.5 bg-gray-800/70 rounded-md">
                                <section.icon className="w-4 h-4 text-purple-400" />
                            </div>
                            <h3 className="text-base font-semibold text-white">{section.title}</h3>
                        </div>
                        <p className="text-sm text-gray-400 ml-8">{section.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

export default LearningPortal;
