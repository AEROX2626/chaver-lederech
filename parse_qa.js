const fs = require('fs');

const raw = fs.readFileSync('scratch_qa.md', 'utf8');

const lines = raw.split('\n');

const data = [];
let currentCategory = '';
let currentItem = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('## קטגוריה')) {
    currentCategory = line.split('—')[1].trim();
  } 
  else if (line.startsWith('### ')) {
    if (currentItem) {
      data.push(currentItem);
    }
    const titleMatch = line.match(/###\s+\d+\.\s+(.*)/);
    if (titleMatch) {
      const title = titleMatch[1];
      const id = 'q-' + data.length; // Simple ID
      currentItem = {
        id,
        title,
        cat: currentCategory,
        parts: []
      };
    }
  }
  else if (currentItem) {
    if (line.startsWith('**תשובה קצרה:**')) {
      currentItem.parts.push({ type: 'text', content: line.replace('**תשובה קצרה:**', '').trim() + '\n' });
    }
    else if (line.startsWith('**תשובה מלאה:**')) {
      currentItem.parts.push({ type: 'text', content: line.replace('**תשובה מלאה:**', '').trim() + '\n' });
    }
    else if (line.startsWith('**מה אפשר לעשות עכשיו:**') || line.startsWith('**מה אפשר לעשות:**') || line.startsWith('**צעד ראשון:**')) {
      const title = line.replace(/\*+/g, '').replace(':', '').trim();
      currentItem.parts.push({ type: 'action', title, content: '' });
    }
    else if (line.startsWith('**להעמקה:**') || line.startsWith('**חשוב:**') || line.startsWith('**מסלול בסיסי:**') || line.startsWith('**שיטה פשוטה:**')) {
      const title = line.replace(/\*+/g, '').replace(':', '').trim();
      currentItem.parts.push({ type: 'section', title, content: '' });
    }
    else if (line.startsWith('**') && line.endsWith('**') && line.length < 50) {
      // Possibly a bolded section title? Ignore or add as section
      currentItem.parts.push({ type: 'section', title: line.replace(/\*/g, ''), content: '' });
    }
    else if (line !== '---') {
      if (currentItem.parts.length > 0) {
        currentItem.parts[currentItem.parts.length - 1].content += line + '\n';
      } else {
        // If no parts yet, just create a text part
        if (line !== '') {
          currentItem.parts.push({ type: 'text', content: line + '\n' });
        }
      }
    }
  }
}

if (currentItem) {
  data.push(currentItem);
}

// Clean up newlines
data.forEach(item => {
  item.parts.forEach(part => {
    part.content = part.content.trim();
  });
  // Remove empty parts
  item.parts = item.parts.filter(p => p.content !== '' || p.title);
});

// Map standard categories
const finalData = {};
data.forEach(item => {
  finalData[item.id] = item;
});

const tsCode = `export const QA_DB: Record<string, { id: string, title: string, cat: string, parts: { type: string, title?: string, content: string }[] }> = ${JSON.stringify(finalData, null, 2)};
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/qa.ts', tsCode, 'utf8');
console.log(`Generated src/data/qa.ts with ${data.length} questions`);
