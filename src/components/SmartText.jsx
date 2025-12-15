import React from 'react';
import { Link } from 'react-router-dom';
import wikiData from '../data/wiki-data.json';

const SmartText = ({ text }) => {
    // Sort terms by length (desc) to avoid partial matching issues (e.g. matching "Yelan" inside "Yelan's bow") if we had such cases, 
    // though here we match exact Japanese terms mostly.
    const sortedTerms = [...wikiData.terms].sort((a, b) => b.name.length - a.name.length);

    // This function processes a text block and returns an array of React nodes (text + links)
    const processLine = (line, lineIdx) => {
        if (!line) return <br key={lineIdx} />;

        let parts = [line];

        sortedTerms.forEach(term => {
            const newParts = [];
            parts.forEach(part => {
                if (typeof part === 'string') {
                    // simple split by term
                    const split = part.split(term.name);
                    split.forEach((s, i) => {
                        if (s) newParts.push(s);
                        if (i < split.length - 1) {
                            // Insert Link
                            const linkPath = term.type === 'Character' ? `/characters/${term.name}` : `/terms/${term.name}`;
                            newParts.push(
                                <Link
                                    key={`${lineIdx}-${term.name}-${i}`}
                                    to={linkPath}
                                    className="text-wiki-link hover:underline visited:text-wiki-linkVisited"
                                >
                                    {term.name}
                                </Link>
                            );
                        }
                    });
                } else {
                    newParts.push(part);
                }
            });
            parts = newParts;
        });

        return (
            <p key={lineIdx} className="mb-4 leading-relaxed text-lg text-gray-300">
                {parts}
            </p>
        );
    };

    return (
        <div>
            {/* We assume text is an array of strings (lines) or a big string */}
            {Array.isArray(text) ? text.map((line, idx) => processLine(line, idx)) : processLine(text, 0)}
        </div>
    );
};

export default SmartText;
