import { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // 画面上部 1/3 を越えた最後のセクションを現在地とする
      const line = window.innerHeight / 3;
      let found = '';
      links.forEach((l) => {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top <= line) found = l.href;
      });
      setCurrent(found);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <a href="#hero" className="nav-logo">
          <span className="nav-logo__bracket">&lt;</span>
          Yugo.dev
          <span className="nav-logo__bracket">/&gt;</span>
        </a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l, i) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={current === l.href ? 'is-current' : ''}
                onClick={() => setOpen(false)}
              >
                <span className="nav-num">0{i + 1}.</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
