import React from 'react';
import {
    BookOpen, FileText, CheckCircle, Terminal, Code2, Layers, CheckSquare,
    GitMerge, Shield, ArrowRight, AlertTriangle, List, Code, Database,
    Globe, Server, Cpu, Box, Activity, Zap, Settings, HelpCircle, Star,
    GitBranch, Table, Puzzle, Workflow, Wrench, TestTube, Users, BarChart,
} from 'lucide-react';

// Keyword → icon for section headings (colored, small)
export const getSectionIcon = (title) => {
    const t = (title || '').toLowerCase();

    if (t.includes('definition') || t.includes('what is')) return <BookOpen className="w-4 h-4 text-purple-400" />;
    if (t.includes('description') || t.includes('overview')) return <FileText className="w-4 h-4 text-cyan-400" />;
    if (t.includes('benefit') || t.includes('advantage')) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (t.includes('drawback') || t.includes('disadvantage') || t.includes('pitfall')) return <AlertTriangle className="w-4 h-4 text-red-400" />;
    if (t.includes('example')) return <Terminal className="w-4 h-4 text-pink-400" />;
    if (t.includes('code')) return <Code2 className="w-4 h-4 text-pink-400" />;
    if (t.includes('type')) return <Layers className="w-4 h-4 text-yellow-400" />;
    if (t.includes('key') || t.includes('principle')) return <CheckSquare className="w-4 h-4 text-blue-400" />;
    if (t.includes('vs') || t.includes('comparison') || t.includes('difference')) return <GitMerge className="w-4 h-4 text-orange-400" />;
    if (t.includes('auth') || t.includes('security')) return <Shield className="w-4 h-4 text-red-400" />;
    if (t.includes('http')) return <ArrowRight className="w-4 h-4 text-indigo-400" />;
    if (t.includes('practice') || t.includes('best')) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (t.includes('question') || t.includes('faq')) return <HelpCircle className="w-4 h-4 text-purple-400" />;
    if (t.includes('test')) return <TestTube className="w-4 h-4 text-orange-400" />;
    if (t.includes('handling') || t.includes('error') || t.includes('exception')) return <AlertTriangle className="w-4 h-4 text-orange-400" />;
    if (t.includes('config') || t.includes('setting')) return <Settings className="w-4 h-4 text-gray-400" />;
    if (t.includes('command') || t.includes('operation')) return <Terminal className="w-4 h-4 text-cyan-400" />;
    if (t.includes('table')) return <Table className="w-4 h-4 text-blue-400" />;

    return <List className="w-4 h-4 text-gray-400" />;
};

// Keyword → icon for topic tabs (uncolored, inherits tab color)
export const getTopicIcon = (title) => {
    const t = (title || '').toLowerCase();

    if (t.includes('core') || t.includes('concept') || t.includes('fundamental') || t.includes('basic')) return <Globe className="w-4 h-4" />;
    if (t.includes('overview') || t.includes('introduction')) return <BookOpen className="w-4 h-4" />;
    if (t.includes('security') || t.includes('auth')) return <Shield className="w-4 h-4" />;
    if (t.includes('data') || t.includes('database') || t.includes('sql') || t.includes('persist') || t.includes('reposit')) return <Database className="w-4 h-4" />;
    if (t.includes('http') || t.includes('method')) return <ArrowRight className="w-4 h-4" />;
    if (t.includes('test')) return <TestTube className="w-4 h-4" />;
    if (t.includes('error') || t.includes('exception') || t.includes('handling')) return <AlertTriangle className="w-4 h-4" />;
    if (t.includes('practice') || t.includes('pattern')) return <CheckCircle className="w-4 h-4" />;
    if (t.includes('type') || t.includes('collection') || t.includes('structure')) return <Layers className="w-4 h-4" />;
    if (t.includes('thread') || t.includes('concurren') || t.includes('async') || t.includes('lock')) return <Activity className="w-4 h-4" />;
    if (t.includes('performance') || t.includes('optimi') || t.includes('cach')) return <Zap className="w-4 h-4" />;
    if (t.includes('stream') || t.includes('lambda') || t.includes('functional')) return <Workflow className="w-4 h-4" />;
    if (t.includes('config') || t.includes('setup') || t.includes('tool')) return <Wrench className="w-4 h-4" />;
    if (t.includes('git') || t.includes('branch') || t.includes('merge')) return <GitBranch className="w-4 h-4" />;
    if (t.includes('server') || t.includes('deploy') || t.includes('boot')) return <Server className="w-4 h-4" />;
    if (t.includes('advanced') || t.includes('internal')) return <Cpu className="w-4 h-4" />;
    if (t.includes('question') || t.includes('faq') || t.includes('interview')) return <HelpCircle className="w-4 h-4" />;
    if (t.includes('comparison') || t.includes('vs') || t.includes('difference')) return <GitMerge className="w-4 h-4" />;
    if (t.includes('best')) return <Star className="w-4 h-4" />;
    if (t.includes('team') || t.includes('role')) return <Users className="w-4 h-4" />;
    if (t.includes('metric') || t.includes('monitor')) return <BarChart className="w-4 h-4" />;
    if (t.includes('component') || t.includes('module')) return <Box className="w-4 h-4" />;
    if (t.includes('solid') || t.includes('design')) return <Puzzle className="w-4 h-4" />;

    return <Code className="w-4 h-4" />;
};
