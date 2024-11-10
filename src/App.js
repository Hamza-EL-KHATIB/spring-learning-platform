import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

// Temporary placeholder component for topic pages
const TopicPage = ({ title }) => (
    <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
        <p className="text-gray-300">Content coming soon...</p>
    </div>
);

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    {/* Java Routes */}
                    <Route path="/java/collections" element={<TopicPage title="Collections Framework" />} />
                    <Route path="/java/concurrency" element={<TopicPage title="Concurrency & Multithreading" />} />
                    <Route path="/java/exceptions" element={<TopicPage title="Exception Handling" />} />
                    <Route path="/java/features" element={<TopicPage title="Java Features" />} />
                    <Route path="/java/gc" element={<TopicPage title="Garbage Collection" />} />

                    {/* Spring Routes */}
                    <Route path="/spring/core" element={<TopicPage title="Spring Core" />} />
                    <Route path="/spring/boot" element={<TopicPage title="Spring Boot" />} />
                    <Route path="/spring/data" element={<TopicPage title="Spring Data" />} />
                    <Route path="/spring/rest" element={<TopicPage title="REST APIs" />} />
                    <Route path="/spring/security" element={<TopicPage title="Spring Security" />} />

                    {/* Database Routes */}
                    <Route path="/databases/sql" element={<TopicPage title="SQL Fundamentals" />} />
                    <Route path="/databases/hibernate" element={<TopicPage title="Hibernate ORM" />} />
                    <Route path="/databases/transactions" element={<TopicPage title="Transactions" />} />
                    <Route path="/databases/redis" element={<TopicPage title="Redis" />} />
                    <Route path="/databases/nosql" element={<TopicPage title="NoSQL Databases" />} />

                    {/* Architecture Routes */}
                    <Route path="/architecture/design-patterns" element={<TopicPage title="Design Patterns" />} />
                    <Route path="/architecture/solid" element={<TopicPage title="SOLID Principles" />} />
                    <Route path="/architecture/best-practices" element={<TopicPage title="Best Practices" />} />
                    <Route path="/architecture/performance" element={<TopicPage title="Performance" />} />

                    {/* DevOps Routes */}
                    <Route path="/devops/git" element={<TopicPage title="Git Version Control" />} />
                    <Route path="/devops/cicd" element={<TopicPage title="CI/CD Pipeline" />} />
                    <Route path="/devops/containers" element={<TopicPage title="Containers" />} />

                    {/* Agile Routes */}
                    <Route path="/agile/scrum" element={<TopicPage title="Scrum Framework" />} />

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