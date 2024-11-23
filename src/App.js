import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';

// Java imports
import CollectionsPage from './pages/topics/java/CollectionsPage';
import ConcurrencyPage from './pages/topics/java/ConcurrencyPage';
import ExceptionsPage from './pages/topics/java/ExceptionsPage';
import FeaturesPage from './pages/topics/java/FeaturesPage';
import GCPage from './pages/topics/java/GCPage';
import DefinitionsPage from './pages/topics/java/DefinitionsPage';
import InternalsPage from './pages/topics/java/InternalsPage';

// Spring imports
import SpringBootPage from './pages/topics/spring/BootPage';
import SpringCorePage from './pages/topics/spring/CorePage';
import SpringDataPage from './pages/topics/spring/DataPage';
import SpringRestPage from './pages/topics/spring/RestPage';

// Database imports
import SQLPage from './pages/topics/databases/SQLPage';
import HibernatePage from './pages/topics/databases/HibernatePage';
import TransactionsPage from './pages/topics/databases/TransactionsPage';
import RedisPage from './pages/topics/databases/RedisPage';

// Architecture imports
import DesignPatternsPage from './pages/topics/architecture/DesignPatternsPage';
import SolidPage from './pages/topics/architecture/SolidPage';

// DevOps imports
import GitPage from './pages/topics/devops/GitPage';

// Agile imports
import ScrumPage from './pages/topics/agile/ScrumPage';

import VocabularyPage from './pages/VocabularyPage';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/vocabulary" element={<VocabularyPage />} />

                    {/* Java Routes */}
                    <Route path="/java/collections" element={<CollectionsPage />} />
                    <Route path="/java/concurrency" element={<ConcurrencyPage />} />
                    <Route path="/java/exceptions" element={<ExceptionsPage />} />
                    <Route path="/java/features" element={<FeaturesPage />} />
                    <Route path="/java/gc" element={<GCPage />} />
                    <Route path="/java/definitions" element={<DefinitionsPage />} />
                    <Route path="/java/internals" element={<InternalsPage />} />

                    {/* Spring Routes */}
                    <Route path="/spring/boot" element={<SpringBootPage />} />
                    <Route path="/spring/core" element={<SpringCorePage />} />
                    <Route path="/spring/data" element={<SpringDataPage />} />
                    <Route path="/spring/rest" element={<SpringRestPage />} />

                    {/* Database Routes */}
                    <Route path="/databases/sql" element={<SQLPage />} />
                    <Route path="/databases/hibernate" element={<HibernatePage />} />
                    <Route path="/databases/transactions" element={<TransactionsPage />} />
                    <Route path="/databases/redis" element={<RedisPage />} />

                    {/* Architecture Routes */}
                    <Route path="/architecture/design-patterns" element={<DesignPatternsPage />} />
                    <Route path="/architecture/solid" element={<SolidPage />} />

                    {/* DevOps Routes */}
                    <Route path="/devops/git" element={<GitPage />} />

                    {/* Agile Routes */}
                    <Route path="/agile/scrum" element={<ScrumPage />} />

                    {/* Fallback Route for any topic that doesn't need special handling */}
                    <Route path="/:section/:topic" element={<TopicPage />} />

                    {/* 404 Route */}
                    <Route path="*" element={
                        <div className="text-center py-16">
                            <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                            <p className="text-gray-400">The page you're looking for doesn't exist.</p>
                        </div>
                    } />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;