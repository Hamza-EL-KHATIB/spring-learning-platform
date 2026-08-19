import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/practice/dsa-patterns.json';

const DsaPatternsPage = () => (
    <TopicPageTemplate data={data} persistKey="practice-dsa" />
);

export default DsaPatternsPage;
