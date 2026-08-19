import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/java/jvm-internals.json';

const JvmInternalsPage = () => (
    <TopicPageTemplate data={data} persistKey="java-jvm-internals" />
);

export default JvmInternalsPage;
