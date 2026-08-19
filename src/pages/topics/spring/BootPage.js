import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/spring/spring-boot.json';

const BootPage = () => <TopicPageTemplate data={data} persistKey="spring-boot" />;

export default BootPage;
