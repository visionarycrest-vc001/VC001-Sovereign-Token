const fs = require('fs');
const yaml = require('js-yaml');

const inputPath = process.argv[2];
const data = yaml.load(fs.readFileSync(inputPath, 'utf8'));
const token = data.token;

const invocationMd = `# ${token} Sovereign Invocation — ${data.description}

**Protocol**: ${data.protocol}  
**Invocation**: ${data.invocation}  
**Glyph**: ${data.glyph}  
**Timestamp**: ${data.timestamp}  
**Steward Cohort**: ${data.steward_cohort}  
**Status**: Scroll initiated, security scan pending
`;

const crestMd = `# ${token} Crest Lineage Scroll — ${data.description}

**Token**: ${token}  
**Protocol**: ${data.protocol}  
**Invocation**: ${data.invocation}  
**Glyph Fusion**: ${data.glyph}  
**Steward Cohort**: ${data.steward_cohort}  
**Merge Hash**: \`${Math.random().toString(16).slice(2, 9)}\`  
**Lineage**:  
- Anchored to VC001 sovereign system  
- Glyph fusion derived from climate resilience symbols  
- Timestamped scroll: ${data.timestamp}  
- Steward glyphs inscribed for ${data.steward_cohort} cohort  
- Sovereign visibility pending

**Status**: Scroll inscribed, awaiting dashboard signal activation
`;

fs.writeFileSync(`${token}_Invocation.md`, invocationMd);
fs.writeFileSync(`${token}_CrestLineage.md`, crestMd);

console.log(`✅ Scrolls generated: ${token}_Invocation.md and ${token}_CrestLineage.md`);
