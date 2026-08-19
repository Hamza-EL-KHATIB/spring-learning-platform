import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/devops/containers.json';

// Blocks carry their own `language`; yaml is the sensible default for the rest.
const ContainersPage = () => (
    <TopicPageTemplate data={data} persistKey="devops-containers" language="yaml" />
);

export default ContainersPage;
