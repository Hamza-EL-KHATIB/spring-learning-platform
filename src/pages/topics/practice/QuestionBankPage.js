import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import EnhancedInterviewFAQs from '../java/EnhancedInterviewFAQs';
import data from '../../../data/practice/technical-questions.json';

// 200+ questions grouped by area; each tab hands its categories to the
// searchable Q&A accordion rather than the standard section renderer.
const QuestionBankPage = () => (
    <TopicPageTemplate
        data={data}
        persistKey="practice-questions"
        renderTopic={(topic) =>
            topic.categories ? <EnhancedInterviewFAQs section={topic} /> : null
        }
    />
);

export default QuestionBankPage;
