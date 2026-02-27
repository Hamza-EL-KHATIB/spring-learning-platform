import React, { useState, useEffect } from 'react';
import principlesJsonEn from '../../../data/architecture/principles.json';
import { Book, Search, Info } from 'lucide-react';

const PrincipleCard = ({ principle }) => {
    return (
        <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400">
                    <Book className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{principle.term}</h3>
            </div>
            <p className="text-gray-300">{principle.definition}</p>
        </div>
    );
};

const PracticalCard = ({ title, content }) => {
    return (
        <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
            <ul className="space-y-2">
                {content.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const PrinciplesPage = () => {
    const principlesData = principlesJsonEn;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPrinciples, setFilteredPrinciples] = useState([]);

    // Filter principles based on search term
    useEffect(() => {
        if (principlesData && principlesData.definitions) {
            setFilteredPrinciples(
                principlesData.definitions.filter(def =>
                    def.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    def.definition.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [principlesData, searchTerm]);

    // Additional practical examples
    const practicalExamples = {
        title: "Practical Application Examples",
        content: [
            "YAGNI: Avoid implementing complex user permission systems before they're required.",
            "KISS: Choose a straightforward authentication approach before considering OAuth federation.",
            "DRY: Create utility classes for common validation logic used across controllers."
        ]
    };

    const whenToApply = {
        title: "When to Apply These Principles",
        content: [
            "When starting a new feature or component",
            "During code refactoring sessions",
            "When reviewing pull requests",
            "When making architectural decisions"
        ]
    };

    const commonPitfalls = {
        title: "Common Pitfalls to Avoid",
        content: [
            "YAGNI: Don't use it as an excuse to skip proper design and planning",
            "KISS: Simple doesn't mean incomplete or poorly designed",
            "DRY: Don't over-abstract code to the point of confusion"
        ]
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{principlesData.title}</h1>
                <p className="text-gray-300">
                    Core software development principles that help create maintainable and efficient code
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search principles..."
                    className="w-full px-4 py-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                )}
            </div>

            {/* Principles Grid */}
            {filteredPrinciples.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {filteredPrinciples.map((principle, index) => (
                        <PrincipleCard key={index} principle={principle} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-800/30 rounded-lg border border-gray-700/50 mb-12">
                    <Info className="w-16 h-16 text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium text-gray-400 mb-2">
                        No principles found
                    </h3>
                    <p className="text-gray-500">
                        Try another search term or clear the search
                    </p>
                </div>
            )}

            {/* Additional Information */}
            {!searchTerm && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <PracticalCard
                        title={practicalExamples.title}
                        content={practicalExamples.content}
                    />
                    <PracticalCard
                        title={whenToApply.title}
                        content={whenToApply.content}
                    />
                    <PracticalCard
                        title={commonPitfalls.title}
                        content={commonPitfalls.content}
                    />
                </div>
            )}
        </div>
    );
};

export default PrinciplesPage;