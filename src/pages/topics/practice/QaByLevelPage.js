import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import EnhancedInterviewFAQs from '../java/EnhancedInterviewFAQs';
import data from '../../../data/practice/qa-by-level.json';

// Same Q&A accordion as the question bank, but grouped by seniority rather
// than by subject — the axis you want when pitching answers at a level.
const QaByLevelPage = () => (
    <TopicPageTemplate
        data={data}
        persistKey="practice-qa-by-level"
        renderTopic={(topic) =>
            topic.categories ? <EnhancedInterviewFAQs section={topic} /> : null
        }
    />
);

export default QaByLevelPage;
