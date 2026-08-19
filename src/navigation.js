import React from 'react';
import {
    Code, Server, Database, Box, GitBranch, Users, FileCheck, GraduationCap, HelpCircle,
} from 'lucide-react';
import groups from './navigation.data.json';

// The page list lives in navigation.data.json so the search-index build script
// (plain Node, no JSX) can read the same source. Icons can't live in JSON, so
// they are attached here by name.
const ICONS = {
    Code: <Code className="w-5 h-5" />,
    Server: <Server className="w-5 h-5" />,
    Database: <Database className="w-5 h-5" />,
    Box: <Box className="w-5 h-5" />,
    GitBranch: <GitBranch className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    FileCheck: <FileCheck className="w-5 h-5" />,
    GraduationCap: <GraduationCap className="w-5 h-5" />,
    HelpCircle: <HelpCircle className="w-5 h-5" />,
};

export const navigationGroups = groups.map((group) => ({
    ...group,
    icon: ICONS[group.icon] || <Box className="w-5 h-5" />,
}));

// German pages live under two URL prefixes but are one section in the sidebar
const SECTION_ALIASES = { learn: 'german' };
export const sectionKey = (segment) => SECTION_ALIASES[segment] || segment;

export const findGroup = (key) => navigationGroups.find((group) => group.key === key);
