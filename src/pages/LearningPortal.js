import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ScrollText, LucideBook, FileText, Feather, Asterisk } from 'lucide-react';

const LearningPortal = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/learn/konjugation" className="block">
                    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-medium text-white">Verb Conjugation</h3>
                        </div>
                        <p className="text-sm text-gray-400">Practice conjugating German verbs in different tenses</p>
                    </div>
                </Link>

                <Link to="/learn/vocabulary" className="block">
                    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <ScrollText className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-medium text-white">Vocabulary</h3>
                        </div>
                        <p className="text-sm text-gray-400">Learn essential German vocabulary by theme</p>
                    </div>
                </Link>

                <Link to="/german/articles" className="block">
                    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-medium text-white">Articles</h3>
                        </div>
                        <p className="text-sm text-gray-400">Learn how to use and decline German articles</p>
                    </div>
                </Link>

                <Link to="/german/adjectives" className="block">
                    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Feather className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-medium text-white">Adjective Endings</h3>
                        </div>
                        <p className="text-sm text-gray-400">Learn how to correctly form adjectives in various cases</p>
                    </div>
                </Link>

                <Link to="/german/cases" className="block">
                    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Asterisk className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-medium text-white">Case Rules</h3>
                        </div>
                        <p className="text-sm text-gray-400">Learn essential German Case rules and tricks</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default LearningPortal;
