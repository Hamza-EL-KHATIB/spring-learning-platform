import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/architecture/kafka.json';

const KafkaPage = () => <TopicPageTemplate data={data} persistKey="architecture-kafka" />;

export default KafkaPage;
