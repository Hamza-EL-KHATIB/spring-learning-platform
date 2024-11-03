import React from 'react';
import { Code, Book, Box, Server, Cloud, Database, Activity } from 'lucide-react';

const HomePage = () => {
    const mainTopics = [
        {
            id: 'java',
            title: 'Java Core',
            icon: <Code className="w-6 h-6" />,
            description: 'Fundamentals, Collections, Concurrency, and more',
            topics: ['OOP', 'Collections', 'Multithreading', 'Exception Handling', 'Garbage Collection']
        },
        {
            id: 'spring',
            title: 'Spring Framework',
            icon: <Server className="w-6 h-6" />,
            description: 'Spring Core, Boot, Data, Security, and REST APIs',
            topics: ['Core Concepts', 'Spring Boot', 'Spring Data', 'Spring Security', 'REST APIs']
        },
        {
            id: 'architecture',
            title: 'Software Architecture',
            icon: <Box className="w-6 h-6" />,
            description: 'Design Patterns, SOLID Principles, and Best Practices',
            topics: ['Design Patterns', 'SOLID', 'Best Practices']
        },
        {
            id: 'devops',
            title: 'DevOps',
            icon: <Cloud className="w-6 h-6" />,
            description: 'Git, Docker, Kubernetes, and Jenkins',
            topics: ['Git', 'Docker', 'Kubernetes', 'CI/CD with Jenkins']
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 text-white">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300">
                        Spring Framework Learning Platform
                    </h1>
                    <p className="text-xl text-purple-100 mb-8">Master Java, Spring, Software Architecture, and DevOps</p>
                    <div className="flex gap-4">
                        <button className="bg-cyan-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/50">
                            Get Started
                        </button>
                        <button className="border-2 border-pink-400 text-pink-400 px-6 py-2 rounded-lg font-semibold hover:bg-pink-400 hover:text-white transition-colors shadow-lg shadow-pink-500/50">
                            View Topics
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {mainTopics.map((topic) => (
                        <div
                            key={topic.id}
                            className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-purple-500/30 hover:border-pink-500/50"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg text-white shadow-lg shadow-purple-500/30">
                                    {topic.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
                            </div>
                            <p className="text-gray-300 mb-4">{topic.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {topic.topics.map((subtopic, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-700 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/30"
                                    >
                    {subtopic}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Featured Content */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-purple-500/30">
                    <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                        Featured Content
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-colors shadow-lg">
                            <div className="text-cyan-400 mb-4">
                                <Book className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Spring Boot Fundamentals</h3>
                            <p className="text-gray-300">Get started with Spring Boot essentials</p>
                        </div>
                        <div className="bg-gray-800 border border-pink-500/30 rounded-lg p-6 hover:border-pink-400/50 transition-colors shadow-lg">
                            <div className="text-pink-400 mb-4">
                                <Database className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Java Collections</h3>
                            <p className="text-gray-300">Master the Java Collections Framework</p>
                        </div>
                        <div className="bg-gray-800 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors shadow-lg">
                            <div className="text-purple-400 mb-4">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Microservices</h3>
                            <p className="text-gray-300">Build scalable applications with microservices</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;