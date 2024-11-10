const TypeRenderer = ({ type }) => (
    <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-medium text-purple-300 mb-2">
            {type.name}
        </h3>
        <p className="text-gray-300">{type.description}</p>
        {/* Characteristics, implementations, etc */}
    </div>
);

export default TypeRenderer;