import React from 'react';
import { useParams } from 'react-router-dom';
import courseData from '../../../data/german/grammar/course-notes.json';

const GrammarContent = () => {
    const { topic } = useParams();
    const category = courseData.categories.find(cat => cat.id === topic);

    if (!category) {
        return (
            <div className="text-center py-16">
                <h1 className="text-4xl font-bold text-white mb-4">Topic Not Found</h1>
                <p className="text-gray-400">The topic you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-white mb-6">{category.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.references.map((ref, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 rounded-lg p-6"
                    >
                        <h2 className="text-lg font-semibold text-white mb-2">
                            {ref.title}
                        </h2>
                        <p className="text-purple-400 text-sm mb-4">
                            {ref.german}
                        </p>
                        {/* Here we would load the actual content from ref.link */}
                        <div className="text-gray-400 text-sm">
                            Content file: {ref.link}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GrammarContent;