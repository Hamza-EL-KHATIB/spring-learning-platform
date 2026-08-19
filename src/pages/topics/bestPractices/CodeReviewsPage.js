import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/bestPractices/codeReviews.json';

const CodeReviewsPage = () => <TopicPageTemplate data={data} persistKey="best-practices-code-reviews" />;

export default CodeReviewsPage;
