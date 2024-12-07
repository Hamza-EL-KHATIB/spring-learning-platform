import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import courseData from '../../../data/german/grammar/course-notes.json';

const GrammarPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-white mb-6">{courseData.title}</h1>

            <div className="space-y-4">
                {courseData.categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/grammar/${category.id}`}
                        className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700/80 transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <BookOpen className="w-5 h-5 text-purple-400" />
                            <h2 className="text-lg font-semibold text-white">
                                {category.title}
                            </h2>
                        </div>
                        <div className="space-y-1">
                            {category.topics.map((topic, idx) => (
                                <div key={idx} className="text-sm text-gray-400">
                                    • {topic}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {category.references.map((ref, idx) => (
                                <div
                                    key={idx}
                                    className="px-2 py-1 bg-gray-700 rounded-md text-xs text-purple-300"
                                >
                                    {ref.title}
                                </div>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GrammarPage;