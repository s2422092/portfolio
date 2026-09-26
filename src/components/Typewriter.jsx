import { useEffect, useState } from 'react';

// 1文字ずつ表示するテキスト。reduced-motion 時は即時表示
export default function Typewriter({ text, speed = 45, delay = 0, className = '', caret = true }) {
  const reduce = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [n, setN] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setN((v) => {
          if (v >= text.length) { clearInterval(id); return v; }
          return v + 1;
        });
      }, speed);
    }, delay);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [text, speed, delay, reduce]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {caret && <span className="tw-caret" aria-hidden="true" />}
    </span>
  );
}
