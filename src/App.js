import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    {/* All topic routes use the same pattern */}
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