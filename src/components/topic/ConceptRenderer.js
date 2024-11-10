const ConceptRenderer = ({ concept }) => (
    <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-medium text-purple-300 mb-2">
            {concept.name}
        </h3>
        <p className="text-gray-300">{concept.description}</p>
        {/* Any benefits, examples, etc */}
    </div>
);

export default ConceptRenderer;