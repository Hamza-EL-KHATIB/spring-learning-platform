import React from 'react';

// Helper function to format code with indentation
const formatCode = (code) => {
    let formattedCode = '';
    let indentLevel = 0;
    const indent = '    '; // 4 spaces

    // Split code by lines and add formatting
    code.split('\n').forEach((line) => {
        if (line.includes('{')) {
            formattedCode += `${indent.repeat(indentLevel)}${line.trim()}\n`;
            indentLevel++;
        } else if (line.includes('}')) {
            indentLevel--;
            formattedCode += `${indent.repeat(indentLevel)}${line.trim()}\n`;
        } else {
            formattedCode += `${indent.repeat(indentLevel)}${line.trim()}\n`;
        }
    });

    return formattedCode;
};

const CodeBlock = ({ code }) => {
    const formattedCode = formatCode(code);

    // Function to render the code with syntax highlighting
    const renderCodeWithHighlighting = (code) => {
        // Keywords, types, and modifiers to highlight
        const keywords = ['class', 'public', 'private', 'protected', 'void', 'new', 'extends', 'implements', 'throws', 'throw'];
        const modifiers = ['volatile', 'static', 'final', 'abstract', 'synchronized'];
        const types = ['int', 'float', 'double', 'boolean', 'char', 'byte', 'short', 'long', 'String'];

        // Regex patterns
        const classNamesPattern = /\b([A-Z][a-zA-Z0-9_]*)\b/g; // Class names starting with uppercase letters
        const methodNamesPattern = /\b([a-z][a-zA-Z0-9_]*)\s*\(/g; // Methods start with lowercase and followed by '('

        let highlightedCode = code;

        // Highlight keywords
        keywords.forEach(keyword => {
            highlightedCode = highlightedCode.replace(
                new RegExp(`\\b${keyword}\\b`, 'g'),
                `<span style="color: #c678dd">${keyword}</span>` // purple for keywords
            );
        });

        // Highlight modifiers
        modifiers.forEach(modifier => {
            highlightedCode = highlightedCode.replace(
                new RegExp(`\\b${modifier}\\b`, 'g'),
                `<span style="color: #56b6c2">${modifier}</span>` // cyan for modifiers
            );
        });

        // Highlight types
        types.forEach(type => {
            highlightedCode = highlightedCode.replace(
                new RegExp(`\\b${type}\\b`, 'g'),
                `<span style="color: #e06c75">${type}</span>` // red for types
            );
        });

        // Highlight class names
        highlightedCode = highlightedCode.replace(
            classNamesPattern,
            '<span style="color: #e5c07b">$1</span>' // yellow for class names
        );

        // Highlight method names
        highlightedCode = highlightedCode.replace(
            methodNamesPattern,
            '<span style="color: #61afef">$1</span>(' // blue for methods
        );

        return highlightedCode;
    };

    return (
        <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#282c34' }}>
            <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                <code
                    dangerouslySetInnerHTML={{
                        __html: renderCodeWithHighlighting(formattedCode),
                    }}
                    style={{ color: '#abb2bf' }}
                />
            </pre>
        </div>
    );
};

export default CodeBlock;
