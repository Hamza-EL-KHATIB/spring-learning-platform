import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/architecture/microservices.json';

const MicroservicesPage = () => (
    <TopicPageTemplate data={data} persistKey="architecture-microservices" />
);

export default MicroservicesPage;
