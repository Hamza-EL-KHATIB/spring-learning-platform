import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const section = currentPath.split('/')[1]; // e.g., 'java', 'spring', etc.

    // Define the sidebar navigation items based on the current section
    const getSectionItems = () => {
        switch (section) {
            case 'java':
                return [
                    { path: '/java/collections', title: 'Collections Framework' },
                    { path: '/java/concurrency', title: 'Concurrency & Multithreading' },
                    { path: '/java/exceptions', title: 'Exception Handling' },
                    { path: '/java/features', title: 'Java Features' },
                    { path: '/java/gc', title: 'Garbage Collection' }
                ];
            case 'spring':
                return [
                    { path: '/spring/core', title: 'Spring Core' },
                    { path: '/spring/boot', title: 'Spring Boot' },
                    { path: '/spring/data', title: 'Spring Data' },
                    { path: '/spring/rest', title: 'REST APIs' },
                    { path: '/spring/security', title: 'Spring Security' }
                ];
            case 'databases':
                return [
                    { path: '/databases/sql', title: 'SQL Fundamentals' },
                    { path: '/databases/hibernate', title: 'Hibernate ORM' },
                    { path: '/databases/transactions', title: 'Transactions' },
                    { path: '/databases/redis', title: 'Redis' },
                    { path: '/databases/nosql', title: 'NoSQL Databases' }
                ];
            case 'architecture':
                return [
                    { path: '/architecture/design-patterns', title: 'Design Patterns' },
                    { path: '/architecture/solid', title: 'SOLID Principles' },
                    { path: '/architecture/best-practices', title: 'Best Practices' },
                    { path: '/architecture/performance', title: 'Performance' }
                ];
            case 'devops':
                return [
                    { path: '/devops/git', title: 'Git Version Control' },
                    { path: '/devops/cicd', title: 'CI/CD Pipeline' },
                    { path: '/devops/containers', title: 'Containers' }
                ];
            case 'agile':
                return [
                    { path: '/agile/scrum', title: 'Scrum Framework' }
                ];
            default:
                return [];
        }
    };

    const items = getSectionItems();

    if (items.length === 0) return null;

    return (
        <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-4 capitalize">{section} Topics</h2>
            <nav>
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center text-sm ${
                                    currentPath === item.path
                                        ? 'text-purple-400 bg-purple-500/10'
                                        : 'text-gray-300 hover:text-purple-300'
                                } rounded-lg p-2 transition-colors`}
                            >
                                <ChevronRight className={`w-4 h-4 mr-2 ${
                                    currentPath === item.path ? 'text-purple-400' : 'text-gray-500'
                                }`} />
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;