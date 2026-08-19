import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/devops/practices.json';

const PracticesPage = () => (
    <TopicPageTemplate data={data} persistKey="devops-practices" language="yaml" />
);

export default PracticesPage;
