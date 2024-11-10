import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Database, Server, Box, GitBranch, Users } from 'lucide-react';

// Example of main navigation structure
const NavigationStructure = () => {
    const mainCategories = [
        {
            id: 'java',
            title: 'Java Core',
            icon: <Code className="w-6 h-6" />,
            subcategories: [
                { id: 'collections', title: 'Collections Framework', path: '/java/collections' },
                { id: 'concurrency', title: 'Concurrency & Multithreading', path: '/java/concurrency' },
                { id: 'exceptions', title: 'Exception Handling', path: '/java/exceptions' },
                { id: 'features', title: 'Java Features', path: '/java/features' },
                { id: 'gc', title: 'Garbage Collection', path: '/java/gc' }
            ]
        },
        {
            id: 'spring',
            title: 'Spring Framework',
            icon: <Server className="w-6 h-6" />,
            subcategories: [
                { id: 'core', title: 'Spring Core', path: '/spring/core' },
                { id: 'boot', title: 'Spring Boot', path: '/spring/boot' },
                { id: 'data', title: 'Spring Data', path: '/spring/data' },
                { id: 'rest', title: 'REST APIs', path: '/spring/rest' },
                { id: 'security', title: 'Spring Security', path: '/spring/security' }
            ]
        },
        {
            id: 'databases',
            title: 'Database Technologies',
            icon: <Database className="w-6 h-6" />,
            subcategories: [
                { id: 'sql', title: 'SQL Fundamentals', path: '/databases/sql' },
                { id: 'hibernate', title: 'Hibernate ORM', path: '/databases/hibernate' },
                { id: 'transactions', title: 'Transactions', path: '/databases/transactions' },
                { id: 'redis', title: 'Redis', path: '/databases/redis' },
                { id: 'nosql', title: 'NoSQL Databases', path: '/databases/nosql' }
            ]
        },
        {
            id: 'architecture',
            title: 'Software Architecture',
            icon: <Box className="w-6 h-6" />,
            subcategories: [
                { id: 'design-patterns', title: 'Design Patterns', path: '/architecture/design-patterns' },
                { id: 'solid', title: 'SOLID Principles', path: '/architecture/solid' },
                { id: 'best-practices', title: 'Best Practices', path: '/architecture/best-practices' },
                { id: 'performance', title: 'Performance', path: '/architecture/performance' }
            ]
        },
        {
            id: 'devops',
            title: 'DevOps & Tools',
            icon: <GitBranch className="w-6 h-6" />,
            subcategories: [
                { id: 'git', title: 'Git Version Control', path: '/devops/git' },
                { id: 'cicd', title: 'CI/CD Pipeline', path: '/devops/cicd' },
                { id: 'containers', title: 'Containers', path: '/devops/containers' }
            ]
        },
        {
            id: 'agile',
            title: 'Agile & Scrum',
            icon: <Users className="w-6 h-6" />,
            subcategories: [
                { id: 'scrum', title: 'Scrum Framework', path: '/agile/scrum' }
            ]
        }
    ];

    return (
        <div className="flex flex-col space-y-6">
            {mainCategories.map(category => (
                <div key={category.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg">
                            {category.icon}
                        </div>
                        <h2 className="text-xl font-bold text-white">{category.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.subcategories.map(sub => (
                            <Link
                                key={sub.id}
                                to={sub.path}
                                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <span className="text-gray-100">{sub.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NavigationStructure;