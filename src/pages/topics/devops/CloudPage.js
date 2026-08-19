import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/devops/cloud.json';

const CloudPage = () => <TopicPageTemplate data={data} persistKey="devops-cloud" language="yaml" />;

export default CloudPage;
