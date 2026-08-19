import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/practice/scenarios.json';

const ScenariosPage = () => (
    <TopicPageTemplate data={data} persistKey="practice-scenarios" />
);

export default ScenariosPage;
