// src/pages/HomePage.js with translations
import React from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Server,
    Database,
    Activity,
    Box,
    Folder,
    FolderTree,
    Binary,
    Cpu,
    Users,
    RefreshCw,
    FileCode,
    XSquare,
    BookOpenCheck,
    LayoutGrid,
    FileCheck
} from 'lucide-react';
import useTranslation from '../components/i18n/useTranslation';

const CategorySection = ({ title, items }) => (
    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="grid gap-2">
            {items.map((item, index) => (
                <Link
                    key={index}
                    to={item.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                    <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-gray-700">
                        <item.icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                    </div>
                    <div>
                        <div className="text-gray-200 group-hover:text-white">{item.title}</div>
                        {item.description && (
                            <div className="text-sm text-gray-400">{item.description}</div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const HomePage = () => {
    const { t } = useTranslation();

    const categories = {
        java: {
            title: t('home.javaCore'),
            items: [
                { title: "Java Fundamentals", path: "/java/fundamentals", icon: BookOpen, description: "Fundamentals of Java" },
                { title: "Collections Framework", path: "/java/collections", icon: Folder, description: "Lists, Sets, Maps, and more" },
                { title: "Concurrency & Multithreading", path: "/java/concurrency", icon: Activity, description: "Threads, executors, synchronization" },
                { title: "Exception Handling", path: "/java/exceptions", icon: Box, description: "Error handling and management" },
                { title: "Java Features", path: "/java/features", icon: Cpu, description: "Modern Java capabilities" },
                { title: "Unit Testing", path: "/java/testing", icon: FileCheck, description: "Testing with JUnit and Mockito" },
                { title: "Functional Programming", path: "/java/functional-programming", icon: FileCheck, description: "Functional programming concepts in Java" },
            ]
        },
        spring: {
            title: t('home.springFramework'),
            items: [
                { title: "Spring Core", path: "/spring/core", icon: Server, description: "IoC, DI, and core concepts" },
                { title: "Spring Boot", path: "/spring/boot", icon: XSquare, description: "Auto-configuration and features" },
                { title: "Spring Data", path: "/spring/data", icon: Database, description: "Data access and repositories" },
                { title: "Spring Security", path: "/spring/security", icon: Binary, description: "Authentication and authorization" },
                { title: "REST APIs", path: "/spring/rest", icon: FileCode, description: "RESTful web services" },
                { title: "GraphQL", path: "/spring/graphql", icon: FileCode, description: "GraphQL APIs" },
                { title: "Spring Definitions", path: "/spring/definitions", icon: BookOpenCheck, description: "Core Spring concepts and terminology" }
            ]
        },
        databases: {
            title: t('home.databaseTech'),
            items: [
                { title: "SQL Fundamentals", path: "/databases/sql", icon: Database, description: "SQL basics and advanced queries" },
                { title: "Hibernate", path: "/databases/hibernate", icon: FolderTree, description: "ORM and entity management" },
                { title: "Transactions", path: "/databases/transactions", icon: RefreshCw, description: "Transaction management" },
                { title: "Redis", path: "/databases/redis", icon: Binary, description: "In-memory data structure store" }
            ]
        },
        architecture: {
            title: t('home.softwareArch'),
            items: [
                { title: "Design Patterns", path: "/architecture/design-patterns", icon: LayoutGrid, description: "Common software patterns" },
                { title: "SOLID Principles", path: "/architecture/solid", icon: BookOpenCheck, description: "Design principles" },
                { title: "YAGNI, KISS, DRY", path: "/architecture/principles", icon: BookOpenCheck, description: "Design principles" },
            ]
        },
        processes: {
            title: t('home.processes'),
            items: [
                { title: "Scrum Framework", path: "/agile/scrum", icon: Users, description: "Agile project management with Scrum" }
            ]
        },
        bestPractices: {
            title: t('home.bestPractices'),
            items: [
                { title: "Code Review", path: "/best-practices/code-reviews", icon: FileCheck, description: "Code review guidelines" }
            ]
        }
    };

    return (
        <div className="space-y-8">
            {/* All Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.values(categories).map((category, index) => (
                    <CategorySection
                        key={index}
                        title={category.title}
                        items={category.items}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
