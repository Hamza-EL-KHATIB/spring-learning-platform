import { Code } from "lucide-react";

const CodeExample = ({ code, title }) => (
    <div className="mt-4 bg-gray-800 rounded-lg p-4">
        <div className="flex items-center text-sm font-medium text-gray-400 mb-2">
            <Code className="w-4 h-4 mr-2" />
            {title || "Example"}:
        </div>
        <pre className="text-gray-300 text-sm font-mono overflow-x-auto">
            {code}
        </pre>
    </div>
);

export default CodeExample;