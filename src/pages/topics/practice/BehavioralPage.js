import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/practice/behavioral.json';

// Prose rather than code, so no syntax highlighting default is useful here.
const BehavioralPage = () => (
    <TopicPageTemplate data={data} persistKey="practice-behavioral" language="text" />
);

export default BehavioralPage;
