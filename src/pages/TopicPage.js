import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Code, Info, AlertCircle } from 'lucide-react';

// Import all JSON files
import collectionsJson from '../data/java/collections.json';
import concurrencyJson from '../data/java/concurrency.json';
import exceptionsJson from '../data/java/exceptions.json';
import javaFundamentalsJson from '../data/java/java-fundamentals.json';

// Spring imports
import restJson from '../data/spring/rest.json';
//import securityJson from '../data/spring/security.json';

// Database imports
import sqlJson from '../data/databases/sql.json';
import hibernateJson from '../data/databases/hibernate.json';
import transactionsJson from '../data/databases/transactions.json';
import redisJson from '../data/databases/redis.json';
//import nosqlJson from '../data/databases/nosql.json';

// Architecture imports
import designPatternsJson from '../data/architecture/design-patterns.json';
import solidJson from '../data/architecture/solid.json';

// DevOps imports
import gitJson from '../data/devops/git.json';

// Scrum import
import scrumJson from '../data/scrum/scrum.json';

const jsonData = {
    java: {
        collections: collectionsJson,
        concurrency: concurrencyJson,
        exceptions: exceptionsJson,
        fundamentals: javaFundamentalsJson,
    },
    spring: {
        rest: restJson,
        //security: securityJson
    },
    databases: {
        sql: sqlJson,
        hibernate: hibernateJson,
        transactions: transactionsJson,
        redis: redisJson,
        //nosql: nosqlJson
    },
    architecture: {
        'design-patterns': designPatternsJson,
        solid: solidJson,
        //'best-practices': bestPracticesJson,
        //performance: performanceJson
    },
    devops: {
        git: gitJson,
        //cicd: cicdJson,
        //containers: containersJson
    },
    agile: {
        scrum: scrumJson
    }
};

const TopicPage = () => {
    const { section, topic } = useParams();
    const [topicData, setTopicData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setLoading(true);
            const data = jsonData[section]?.[topic];
            console.log('Loading data for:', section, topic, data);
            if (data) {
                setTopicData(data);
                setError(null);
            } else {
                throw new Error('Topic data not found');
            }
        } catch (error) {
            console.error('Error loading topic:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [section, topic]);

    const renderList = (items, className = "") => (
        <ul className={`list-disc list-inside space-y-1 ${className}`}>
            {items.map((item, idx) => (
                <li key={idx} className="text-gray-300">{item}</li>
            ))}
        </ul>
    );

    const renderExample = (example) => {
        if (typeof example === 'string') {
            return <pre className="text-gray-300 text-sm font-mono bg-gray-800 p-4 rounded-lg">{example}</pre>;
        }
        if (example.code) {
            return (
                <div className="mt-4 bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center text-sm font-medium text-gray-400 mb-2">
                        <Code className="w-4 h-4 mr-2" />
                        {example.title || "Example"}:
                    </div>
                    <pre className="text-gray-300 text-sm font-mono overflow-x-auto">
                        {example.code}
                    </pre>
                </div>
            );
        }
        return null;
    };

    const renderConcept = (concept) => (
        <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-medium text-purple-300 mb-2">
                {concept.name}
            </h3>
            {concept.description && (
                <p className="text-gray-300 mb-3">{concept.description}</p>
            )}
            {concept.benefits && (
                <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Benefits:</h4>
                    {renderList(concept.benefits, "ml-4")}
                </div>
            )}
            {concept.types && concept.types.map((type, idx) => (
                <div key={idx} className="mt-4 bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-md font-medium text-purple-300 mb-2">{type.type}</h4>
                    <p className="text-gray-300 mb-2">{type.description}</p>
                    {type.example && renderExample(type.example)}
                </div>
            ))}
            {concept.examples && renderExample(concept.examples)}
        </div>
    );

    const renderType = (type) => (
        <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-medium text-purple-300 mb-2">
                {type.type || type.name}
            </h3>
            {type.description && (
                <p className="text-gray-300 mb-3">{type.description}</p>
            )}
            {type.characteristics && (
                <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Characteristics:</h4>
                    {renderList(type.characteristics, "ml-4")}
                </div>
            )}
            {type.implementations && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Implementations:</h4>
                    {type.implementations.map((impl, idx) => (
                        <div key={idx} className="mt-2 bg-gray-800/50 rounded-lg p-4">
                            <h5 className="text-md font-medium text-purple-300 mb-2">{impl.name}</h5>
                            {impl.characteristics && renderList(impl.characteristics, "ml-4")}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderTopic = (topic) => (
        <div className="mb-8 bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-purple-400" />
                {topic.title}
            </h2>

            {topic.description && (
                <p className="text-gray-300 mb-4">{topic.description}</p>
            )}

            {/* Render concepts if present */}
            {topic.concepts && topic.concepts.map((concept, idx) => (
                <div key={idx}>{renderConcept(concept)}</div>
            ))}

            {/* Render types if present */}
            {topic.types && topic.types.map((type, idx) => (
                <div key={idx}>{renderType(type)}</div>
            ))}

            {/* If no content is available */}
            {!topic.description && !topic.concepts && !topic.types && (
                <div className="flex items-center text-gray-400">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>Content coming soon...</span>
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-purple-400">Loading...</div>
            </div>
        );
    }

    if (error || !topicData) {
        return (
            <div className="bg-gray-800 rounded-lg p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Topic Not Found</h1>
                <p className="text-gray-300">The requested topic could not be loaded.</p>
                <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-400">Section: {section}</p>
                    <p className="text-sm text-gray-400">Topic: {topic}</p>
                    {error && <p className="text-sm text-red-400">Error: {error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{topicData.title}</h1>
                {topicData.description && (
                    <p className="text-gray-300">{topicData.description}</p>
                )}
            </div>

            <div className="space-y-8">
                {topicData.topics?.map((topic, index) => (
                    <div key={index}>{renderTopic(topic)}</div>
                ))}
            </div>
        </div>
    );
};

export default TopicPage;
