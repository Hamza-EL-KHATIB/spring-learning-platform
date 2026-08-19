import React from 'react';
import {
    Code, Server, Database, Box, GitBranch, Users, FileCheck, GraduationCap, HelpCircle,
} from 'lucide-react';

// Single source of truth for site navigation. Sidebar, HomePage and the
// quick-search index all read from here — keep new pages in one place.
export const navigationGroups = [
    {
        key: 'java',
        title: 'Java Core',
        icon: <Code className="w-5 h-5" />,
        items: [
            { path: '/java/fundamentals', title: 'Java Fundamentals', description: 'Language basics, JVM, memory' },
            { path: '/java/collections', title: 'Collections Framework', description: 'Lists, Sets, Maps, and more' },
            { path: '/java/concurrency', title: 'Concurrency & Multithreading', description: 'Threads, executors, synchronization' },
            { path: '/java/exceptions', title: 'Exception Handling', description: 'Error handling and management' },
            { path: '/java/features', title: 'Java Features', description: 'Java 8+ capabilities' },
            { path: '/java/testing', title: 'Unit Testing', description: 'JUnit and Mockito' },
            { path: '/java/functional-programming', title: 'Functional Programming', description: 'Streams, lambdas, optionals' },
        ],
    },
    {
        key: 'spring',
        title: 'Spring Framework',
        icon: <Server className="w-5 h-5" />,
        items: [
            { path: '/spring/core', title: 'Spring Core', description: 'IoC, DI, and core concepts' },
            { path: '/spring/boot', title: 'Spring Boot', description: 'Auto-configuration and features' },
            { path: '/spring/data', title: 'Spring Data', description: 'Data access and repositories' },
            { path: '/spring/security', title: 'Spring Security', description: 'Authentication and authorization' },
            { path: '/spring/rest', title: 'REST APIs', description: 'RESTful web services' },
            { path: '/spring/graphql', title: 'GraphQL', description: 'GraphQL APIs' },
            { path: '/spring/definitions', title: 'Spring Definitions', description: 'Glossary for quick recall' },
        ],
    },
    {
        key: 'databases',
        title: 'Database Technologies',
        icon: <Database className="w-5 h-5" />,
        items: [
            { path: '/databases/sql', title: 'SQL Fundamentals', description: 'Queries, joins, indexing' },
            { path: '/databases/hibernate', title: 'Hibernate ORM', description: 'Entities, caching, mapping' },
            { path: '/databases/transactions', title: 'Transactions', description: 'ACID, isolation, propagation' },
            { path: '/databases/redis', title: 'Redis', description: 'In-memory data structure store' },
        ],
    },
    {
        key: 'architecture',
        title: 'Architecture',
        icon: <Box className="w-5 h-5" />,
        items: [
            { path: '/architecture/design-patterns', title: 'Design Patterns', description: 'GoF patterns with diagrams' },
            { path: '/architecture/solid', title: 'SOLID Principles', description: 'Five design principles' },
            { path: '/architecture/principles', title: 'YAGNI, KISS, DRY', description: 'Everyday design heuristics' },
        ],
    },
    {
        key: 'devops',
        title: 'DevOps',
        icon: <GitBranch className="w-5 h-5" />,
        items: [
            { path: '/devops/git', title: 'Git', description: 'Workflows and commands' },
        ],
    },
    {
        key: 'agile',
        title: 'Agile',
        icon: <Users className="w-5 h-5" />,
        items: [
            { path: '/agile/scrum', title: 'Scrum', description: 'Roles, events, artifacts' },
        ],
    },
    {
        key: 'practice',
        title: 'Practice',
        icon: <HelpCircle className="w-5 h-5" />,
        items: [
            { path: '/practice/questions', title: 'Question Bank', description: '200+ questions by area' },
        ],
    },
    {
        key: 'best-practices',
        title: 'Best Practices',
        icon: <FileCheck className="w-5 h-5" />,
        items: [
            { path: '/best-practices/code-reviews', title: 'Code Reviews', description: 'Review protocol and checklist' },
        ],
    },
    {
        key: 'german',
        title: 'German',
        icon: <GraduationCap className="w-5 h-5" />,
        items: [
            { path: '/learn/vocabulary', title: 'Vocabulary', description: 'Essential words by theme' },
            { path: '/learn/konjugation', title: 'Verb Conjugation', description: 'Verbs across tenses' },
            { path: '/german/articles', title: 'Articles', description: 'Using and declining articles' },
            { path: '/german/adjectives', title: 'Adjective Endings', description: 'Endings across cases' },
            { path: '/german/cases', title: 'Case Rules', description: 'Rules and tricks for the four cases' },
            { path: '/learn/german-cases', title: 'Cases Reference', description: 'Full case tables' },
        ],
    },
];

// German pages live under two URL prefixes but are one section in the sidebar
const SECTION_ALIASES = { learn: 'german' };
export const sectionKey = (segment) => SECTION_ALIASES[segment] || segment;

export const findGroup = (key) => navigationGroups.find((group) => group.key === key);
