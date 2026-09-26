import { useEffect, useState } from 'react';
import './SectionDots.css';

const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
];

// 画面右端の縦ドットナビ。今いるセクションを示し、クリックでジャンプする
export default function SectionDots() {
  const [current, setCurrent] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      // 画面中央を越えた最後のセクションを現在地とする
      const line = window.innerHeight / 2;
      let found = 'hero';
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) found = s.id;
      });
      setCurrent(found);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="section-dots" aria-label="セクション">
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`section-dot ${current === s.id ? 'is-current' : ''}`}
          aria-label={s.label}
          aria-current={current === s.id ? 'true' : undefined}
        >
          <span className="section-dot__label">
            <em>0{i}</em> {s.label}
          </span>
          <span className="section-dot__mark" />
        </a>
      ))}
    </nav>
  );
}
