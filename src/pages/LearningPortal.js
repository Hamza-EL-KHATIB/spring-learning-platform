import React from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, GraduationCap, ScrollText, LucideBook } from 'lucide-react';

const LearningPortal = () => {

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Additional Tools */}
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
                <Link to="/learn/german-cases" className="block">
                    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <LucideBook className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-medium text-white">Case Articles and Adjective Endings</h3>
                        </div>
                        <p className="text-sm text-gray-400">Master German grammar cases, articles, and adjective endings with clear examples.</p>
                    </div>
                </Link>
                <Link to="/learn/german-case-rules" className="block">
                    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <StickyNote className="w-5 h-5 text-purple-400" />
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