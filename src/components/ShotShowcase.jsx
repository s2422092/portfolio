import { useRef } from 'react';
import './ShotShowcase.css';

// スクリーンショットを立体的に傾けて見せる。マウスを乗せると視点に合わせて向きが変わる
export default function ShotShowcase({ src, href, url, alt, chips = [], size = 'md' }) {
  const ref = useRef(null);

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    ['--ry', '--rx', '--gx', '--gy'].forEach((v) => el.style.removeProperty(v));
  };

  return (
    <div
      ref={ref}
      className={`shot shot--${size}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="shot__glow" aria-hidden="true" />
      <a href={href} target="_blank" rel="noopener noreferrer" className="shot__frame browser-frame">
        <div className="browser-frame__bar" aria-hidden="true">
          <i /><i /><i />
          {url && <span className="browser-frame__url">{url}</span>}
        </div>
        <img src={src} alt={alt} width="1600" height="917" loading="lazy" />
        <span className="shot__shine" aria-hidden="true" />
      </a>
      {chips.map((c, i) => (
        <span key={c.text} className={`shot__chip shot__chip--${i}`}>
          {c.dot && <span className="live-dot" />}
          {c.text}
        </span>
      ))}
    </div>
  );
}
