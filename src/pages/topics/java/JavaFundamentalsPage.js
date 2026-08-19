import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import EnhancedInterviewFAQs from './EnhancedInterviewFAQs';
import data from '../../../data/java/java-fundamentals.json';

// The interview-FAQ section (the one with categories[]) keeps its dedicated
// searchable accordion UI; everything else renders through the template.
const JavaFundamentalsPage = () => (
    <TopicPageTemplate
        data={data}
        persistKey="java-fundamentals"
        renderTopic={(topic) =>
            topic.categories ? <EnhancedInterviewFAQs section={topic} language="en" /> : null
        }
    />
);

export default JavaFundamentalsPage;
