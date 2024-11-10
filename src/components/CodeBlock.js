import React from 'react';

const CodeBlock = ({ code }) => {
    // Clean up and format the code string
    const formattedCode = code
        .replace('...', '/* ... */')
        .replace(/\s+/g, ' ')
        .trim();

    // Atom One Dark colors:
    // Background: #282c34
    // Text: #abb2bf
    // Keywords: #c678dd
    // Functions: #61afef
    // Strings: #98c379
    // Numbers: #d19a66
    // Comments: #5c6370
    // Operators: #56b6c2
    // Class names: #e5c07b
    // Methods: #98c379
    // Parentheses/Braces: #abb2bf

    return (
        <div className="rounded-lg p-4" style={{ backgroundColor: '#282c34' }}>
            <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                <code>
                    {formattedCode.split('{').map((part, i) => {
                        if (i === 0) {
                            // Handle keywords
                            const keywords = ['class', 'public', 'private', 'protected', 'void', 'new', 'extends', 'implements'];
                            let coloredPart = part;
                            keywords.forEach(keyword => {
                                coloredPart = coloredPart.replace(
                                    new RegExp(`\\b${keyword}\\b`, 'g'),
                                    `<span style="color: #c678dd">${keyword}</span>`
                                );
                            });

                            // Handle class names
                            coloredPart = coloredPart.replace(
                                /\b([A-Z][a-zA-Z]*)\b/g,
                                '<span style="color: #e5c07b">$1</span>'
                            );

                            return (
                                <span key={i} style={{ color: '#abb2bf' }}>
                                    <span dangerouslySetInnerHTML={{ __html: coloredPart }} />
                                    {i < formattedCode.split('{').length - 1 && (
                                        <span style={{ color: '#abb2bf' }}>{'{'}</span>
                                    )}
                                </span>
                            );
                        }
                        const [code, closing] = part.split('}');
                        return (
                            <span key={i}>
                                <span style={{ color: '#abb2bf' }}>{code}</span>
                                {closing !== undefined && (
                                    <>
                                        <span style={{ color: '#abb2bf' }}>{'}'}</span>
                                        <span style={{ color: '#abb2bf' }}>{closing}</span>
                                    </>
                                )}
                            </span>
                        );
                    })}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;
