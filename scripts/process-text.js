import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.resolve(__dirname, '../../YELAN.txt');
const outputPath = path.resolve(__dirname, '../src/data/wiki-data.json');

// Initial list of terms/characters to scan for
const TERMS = [
    { name: "夜蘭", type: "Character", description: "The protagonist. A hydro-element user and intelligence agent." },
    { name: "エレナ", type: "Character", description: "The section chief of the intelligence agency." },
    { name: "ゲオルグ・ジーマ", type: "Character", description: "CEO of Zima Oil." },
    { name: "ヴェルリット一族", type: "Term", description: "A clan of witches known for their bloodline magic." },
    { name: "♡淫紋", type: "Term", description: "A magical mark that enhances sensitivity and obedience." },
    { name: "スライム", type: "Term", description: "Creatures used by the enemies, often for dissolving clothes." },
    { name: "ジーマオイル社", type: "Term", description: "A company manufacturing illegal dissolving agents." },
];

try {
    const text = fs.readFileSync(sourcePath, 'utf-8');

    // Process text to find chapters/lines
    const lines = text.split('\n');

    const termStats = {};
    TERMS.forEach(t => termStats[t.name] = { ...t, count: 0, mentions: [] });

    lines.forEach((line, index) => {
        const lineNum = index + 1;
        TERMS.forEach(term => {
            if (line.includes(term.name)) {
                termStats[term.name].count++;
                // Store snippet (line + context if needed)
                if (termStats[term.name].mentions.length < 50) {
                    termStats[term.name].mentions.push(lineNum);
                }
            }
        });
    });

    const data = {
        meta: {
            title: "YELAN",
            totalLines: lines.length,
            generatedAt: new Date().toISOString()
        },
        terms: Object.values(termStats),
        content: lines
    };

    // Ensure output dir exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log("Wiki data generated successfully!");
    console.log("Terms found:", TERMS.map(t => `${t.name}: ${termStats[t.name].count}`).join(', '));

} catch (err) {
    console.error("Error processing text:", err);
}
