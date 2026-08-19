import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/spring/spring-security.json';

const SecurityPage = () => <TopicPageTemplate data={data} persistKey="spring-security" />;

export default SecurityPage;
