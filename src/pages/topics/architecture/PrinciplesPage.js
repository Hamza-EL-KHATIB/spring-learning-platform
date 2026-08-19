import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/architecture/principles.json';

const PrinciplesPage = () => (
    <TopicPageTemplate
        data={data}
        persistKey="architecture-principles"
        header={
            <p className="text-gray-400 mt-2 text-sm">
                Core software development principles that help create maintainable and efficient code
            </p>
        }
    />
);

export default PrinciplesPage;
