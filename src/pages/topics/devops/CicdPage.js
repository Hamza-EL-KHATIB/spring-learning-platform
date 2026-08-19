import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/devops/cicd.json';

const CicdPage = () => <TopicPageTemplate data={data} persistKey="devops-cicd" language="yaml" />;

export default CicdPage;
