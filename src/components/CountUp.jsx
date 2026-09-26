import { useEffect, useRef, useState } from 'react';

// "5,000件" のような文字列の数値部分を、画面に入ったときにカウントアップする
export default function CountUp({ value, duration = 1400 }) {
  const m = String(value).match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = m ? Number(m[2].replace(/,/g, '')) : 0;
  const hasNumber = Boolean(m);
  const reduce = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const ref = useRef(null);
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!hasNumber || reduce) return;
    const el = ref.current;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration, hasNumber, reduce]);

  if (!m) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {m[1]}{n.toLocaleString('ja-JP')}{m[3]}
    </span>
  );
}
