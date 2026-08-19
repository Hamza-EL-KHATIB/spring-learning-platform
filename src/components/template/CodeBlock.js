import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code2, Copy, Check } from 'lucide-react';

// Accepts code as string | { code | snippet | content } | array of lines.
export const getCodeString = (code) => {
    if (!code) return null;
    if (typeof code === 'string') return code;
    if (Array.isArray(code)) {
        if (code.every((line) => typeof line === 'string')) return code.join('\n');
        return null;
    }
    if (typeof code === 'object') {
        return getCodeString(code.code || code.snippet || code.content || code['simple-content']);
    }
    return null;
};

// Heuristic: does this string look like source code rather than prose?
export const looksLikeCode = (text) =>
    typeof text === 'string' &&
    (text.includes('\n') || /[;{}<>=()]|::|->/.test(text));

const CodeBlock = ({ code, title, language = 'java' }) => {
    const [copied, setCopied] = useState(false);
    const codeString = getCodeString(code);

    if (!codeString) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Plain text (ASCII diagrams etc.) gets a bare <pre> so Prism can't mangle it
    const isPlain = language === 'text' || language === 'plaintext';

    return (
        <div className="bg-gray-900/70 rounded-md border border-gray-700/70 overflow-hidden text-sm group relative">
            {title && (
                <div className="flex items-center gap-1 px-3 py-1 bg-gray-800 border-b border-gray-700/70">
                    <Code2 className="w-3 h-3 text-pink-400" />
                    <span className="text-xs font-medium text-gray-300">{title}</span>
                </div>
            )}
            <button
                onClick={handleCopy}
                className="absolute top-1.5 right-1.5 p-1.5 rounded-md bg-gray-800/80 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                style={title ? { top: '2.25rem' } : undefined}
                title="Copy code"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            {isPlain ? (
                <pre className="p-3 text-gray-300 text-xs overflow-x-auto whitespace-pre font-mono" style={{ backgroundColor: '#1e1e2f' }}>
                    {codeString}
                </pre>
            ) : (
                <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        borderRadius: title ? '0 0 0.25rem 0.25rem' : '0.25rem',
                        padding: '0.75rem',
                        fontSize: '0.8rem',
                        backgroundColor: '#1e1e2f',
                    }}
                >
                    {codeString}
                </SyntaxHighlighter>
            )}
        </div>
    );
};

export default CodeBlock;
