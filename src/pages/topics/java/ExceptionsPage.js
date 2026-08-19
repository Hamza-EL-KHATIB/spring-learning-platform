import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/java/exceptions.json';
import hierarchyDiagram from '../../../data/images/Untitled diagram-2025-03-24-233855.png';

// The JSON's `diagram` field holds mermaid source; show the pre-rendered
// hierarchy PNG instead of dumping the source text.
const resolveDiagram = (value) =>
    typeof value === 'string' && value.startsWith('graph') ? hierarchyDiagram : null;

const ExceptionsPage = () => (
    <TopicPageTemplate data={data} persistKey="java-exceptions" resolveDiagram={resolveDiagram} />
);

export default ExceptionsPage;
