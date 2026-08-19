import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import TopicPageTemplate from '../components/template/TopicPageTemplate';

import collectionsJson from '../data/java/collections.json';
import concurrencyJson from '../data/java/concurrency.json';
import exceptionsJson from '../data/java/exceptions.json';
import javaFundamentalsJson from '../data/java/java-fundamentals.json';
import sqlJson from '../data/databases/sql.json';
import hibernateJson from '../data/databases/hibernate.json';
import transactionsJson from '../data/databases/transactions.json';
import redisJson from '../data/databases/redis.json';
import designPatternsJson from '../data/architecture/design-patterns.json';
import solidJson from '../data/architecture/solid.json';
import gitJson from '../data/devops/git.json';
import scrumJson from '../data/scrum/scrum.json';

// Safety net for /:section/:topic URLs without a dedicated page.
const jsonData = {
    java: {
        collections: collectionsJson,
        concurrency: concurrencyJson,
        exceptions: exceptionsJson,
        fundamentals: javaFundamentalsJson,
    },
    databases: {
        sql: sqlJson,
        hibernate: hibernateJson,
        transactions: transactionsJson,
        redis: redisJson,
    },
    architecture: {
        'design-patterns': designPatternsJson,
        solid: solidJson,
    },
    devops: {
        git: gitJson,
    },
    agile: {
        scrum: scrumJson,
    },
};

const TopicPage = () => {
    const { section, topic } = useParams();
    const data = jsonData[section]?.[topic];

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Topic not found</h1>
                <p className="text-gray-400 mb-6">
                    There is no content for “{section}/{topic}” yet.
                </p>
                <Link
                    to="/"
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                >
                    Back to home
                </Link>
            </div>
        );
    }

    return <TopicPageTemplate data={data} persistKey={`${section}-${topic}`} />;
};

export default TopicPage;
