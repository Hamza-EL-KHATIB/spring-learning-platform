import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Code, Info, CheckCircle } from 'lucide-react';

// Import all JSON files
import collectionsJson from '../data/java/collections.json';
import concurrencyJson from '../data/java/concurrency.json';
import exceptionsJson from '../data/java/exceptions.json';
import featuresJson from '../data/java/features.json';
import gcJson from '../data/java/gc.json';
import definitionsJson from '../data/java/definitions.json';
import internalsJson from '../data/java/internals.json';

// Spring imports
import bootJson from '../data/spring/boot.json';
import coreJson from '../data/spring/core.json';
import dataJson from '../data/spring/data.json';
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
//import bestPracticesJson from '../data/architecture/best-practices.json';
//import performanceJson from '../data/architecture/performance.json';

// DevOps imports
import gitJson from '../data/devops/git.json';
//import cicdJson from '../data/devops/cicd.json';
//import containersJson from '../data/devops/containers.json';

// Scrum import
import scrumJson from '../data/scrum/scrum.json';

const jsonData = {
    java: {
        collections: collectionsJson,
        concurrency: concurrencyJson,
        exceptions: exceptionsJson,
        features: featuresJson,
        gc: gcJson,
        definitions: definitionsJson,
        internals: internalsJson
    },
    spring: {
        boot: bootJson,
        core: coreJson,
        data: dataJson,
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
            console.log('Current section and topic:', { section, topic });

            const data = jsonData[section]?.[topic];
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
                    <p className="text-sm text-gray-400">Debug Information:</p>
                    <p className="text-sm text-gray-400">Section: {section}</p>
                    <p className="text-sm text-gray-400">Topic: {topic}</p>
                    {error && <p className="text-sm text-red-400">Error: {error}</p>}
                </div>
            </div>
        );
    }

    const renderSection = (section) => {
        switch (section.type) {
            case 'concept':
                return (
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <Info className="w-5 h-5 mr-2 text-purple-400" />
                            {section.title}
                        </h3>
                        {section.content.map((item, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
                                <h4 className="text-lg font-medium text-purple-300 mb-2">{item.title}</h4>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'list':
                return (
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-purple-400" />
                            {section.title}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items.map((item, index) => (
                                <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20">
                                    <h4 className="text-lg font-medium text-purple-300 mb-2">{item.title}</h4>
                                    <p className="text-gray-300 mb-3">{item.description}</p>
                                    {item.examples && (
                                        <div className="mt-2">
                                            <div className="text-sm font-medium text-gray-400 mb-1">Examples:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {item.examples.map((example, i) => (
                                                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                                                        {example}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'code':
                return (
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <Code className="w-5 h-5 mr-2 text-purple-400" />
                            {section.title}
                        </h3>
                        <div className="bg-gray-800/50 rounded-lg p-1 border border-purple-500/20">
                            <div className="bg-gray-900 rounded-md p-4">
                                <pre className="text-gray-300 text-sm font-mono">
                                    <code>{section.code}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{topicData.title}</h1>
                <p className="text-gray-300">{topicData.description}</p>
            </div>

            <div className="space-y-8">
                {topicData.sections?.map((section, index) => (
                    <div key={index}>{renderSection(section)}</div>
                ))}
            </div>
        </div>
    );
};

export default TopicPage;