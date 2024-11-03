import React from 'react';
import { Code, Book, Box, Server, Lock, Cloud, Database, Activity } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl font-bold mb-4">Spring Framework Learning Platform</h1>
                    <p className="text-xl text-blue-100 mb-8">Master Java, Spring, Software Architecture, and DevOps</p>
                    <div className="flex gap-4">
                        <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Get Started
                        </button>
                        <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
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
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                                    {topic.icon}
                                </div>
                                <h2 className="text-2xl font-bold">{topic.title}</h2>
                            </div>
                            <p className="text-gray-600 mb-4">{topic.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {topic.topics.map((subtopic, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                    {subtopic}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Featured Content */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6">Featured Content</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeaturedCard
                            icon={<Book className="w-6 h-6" />}
                            title="Spring Boot Fundamentals"
                            description="Get started with Spring Boot and learn the core concepts"
                        />
                        <FeaturedCard
                            icon={<Database className="w-6 h-6" />}
                            title="Java Collections"
                            description="Master the Java Collections Framework"
                        />
                        <FeaturedCard
                            icon={<Activity className="w-6 h-6" />}
                            title="Microservices"
                            description="Build scalable applications with microservices"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Featured Card Component
const FeaturedCard = ({ icon, title, description }) => (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer">
        <div className="text-blue-600 mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default HomePage;