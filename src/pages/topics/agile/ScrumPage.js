import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/scrum/scrum.json';

// scrum.json has no topics[]; build one tab per top-level area.
const pageData = {
    title: data.title,
    topics: [
        { id: 'roles', title: 'Roles', roles: data.core_components?.roles },
        { id: 'events', title: 'Events', events: data.core_components?.events },
        { id: 'artifacts', title: 'Artifacts', artifacts: data.core_components?.artifacts },
        { id: 'key-concepts', title: 'Key Concepts', concepts: data.key_concepts },
        { id: 'best-practices', title: 'Best Practices', practices: data.best_practices },
        { id: 'pitfalls', title: 'Common Pitfalls', pitfalls: data.common_pitfalls },
        { id: 'metrics', title: 'Metrics', metrics: data.metrics },
    ].filter((topic) => Object.entries(topic).some(([k, v]) => k !== 'id' && k !== 'title' && v)),
};

const ScrumPage = () => (
    <TopicPageTemplate
        data={pageData}
        persistKey="agile-scrum"
        header={data.description && <p className="text-gray-400 mt-2 text-sm">{data.description}</p>}
    />
);

export default ScrumPage;
