import fs from 'fs';

let code = fs.readFileSync('src/components/home/HeroSection.tsx', 'utf8');

code = code.replace(/placeholder=".*?"/g, 'placeholder="אני רוצה להתחזק אבל לא יודע איך..."');
code = code.replace(/>\s*חפש\s*</g, '>בוא נתחיל<');
code = code.replace(/<h1 className="t-display text-5xl text-slate-900 sm:text-7xl leading-\[1\.1\]">[\s\S]*?<\/h1>/g, '<h1 className="t-display text-5xl text-slate-900 sm:text-7xl leading-[1.1]">מה עובר לך בראש?</h1>');

// Wait, the h1 title might have different classes. I'll just find the "חבר לדרך" line.
code = code.replace(/חבר לדרך במסע ההתחזקות שלך./g, 'מה עובר לך בראש?');

fs.writeFileSync('src/components/home/HeroSection.tsx', code, 'utf8');
