const ListRenderer = ({ items, className = "" }) => (
    <ul className={`list-disc list-inside space-y-1 ${className}`}>
        {items.map((item, idx) => (
            <li key={idx} className="text-gray-300">{item}</li>
        ))}
    </ul>
);

export default ListRenderer;