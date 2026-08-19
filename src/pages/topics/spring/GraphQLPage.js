import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/spring/graphql.json';

const GraphQLPage = () => <TopicPageTemplate data={data} persistKey="spring-graphql" />;

export default GraphQLPage;
