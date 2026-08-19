import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/java/collections.json';

const CollectionsPage = () => <TopicPageTemplate data={data} persistKey="java-collections" />;

export default CollectionsPage;
