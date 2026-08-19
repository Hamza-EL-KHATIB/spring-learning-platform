import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/databases/hibernate.json';

const HibernatePage = () => <TopicPageTemplate data={data} persistKey="databases-hibernate" />;

export default HibernatePage;
