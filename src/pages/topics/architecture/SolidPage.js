import React from 'react';
import TopicPageTemplate, { SectionPanel } from '../../../components/template/TopicPageTemplate';
import renderContent from '../../../components/template/ContentRenderer';
import data from '../../../data/architecture/solid.json';

// solid.json has principles[] instead of topics[]; one tab per principle,
// with the cross-cutting sections always visible below the tabs.
const pageData = {
    title: data.title,
    topics: (data.principles || []).map((principle) => {
        const { name, acronym, ...rest } = principle;
        return {
            id: (acronym || name || '').toLowerCase(),
            title: acronym ? `${acronym}: ${name}` : name,
            ...rest,
        };
    }),
};

const footerSections = [
    ['Practical Applications', data.practical_applications],
    ['Implementation Guidelines', data.implementation_guidelines],
    ['Common Misconceptions', data.common_misconceptions],
].filter(([, value]) => value);

const SolidPage = () => (
    <TopicPageTemplate
        data={pageData}
        persistKey="architecture-solid"
        header={data.description && <p className="text-gray-400 mt-2 text-sm">{data.description}</p>}
        footer={footerSections.map(([title, value]) => (
            <SectionPanel key={title} title={title}>
                {renderContent(value)}
            </SectionPanel>
        ))}
    />
);

export default SolidPage;
