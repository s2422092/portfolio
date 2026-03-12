import { useRef, useState, useEffect, useCallback } from 'react';
import { timeline } from '../data/profile';
import './Timeline.css';

// 古い順（左=過去、右=最新）にフラット化
function buildSlides(data) {
  const slides = [];
  [...data].reverse().forEach((yearBlock) => {
    [...yearBlock.items].reverse().forEach((item) => {
      slides.push({ year: yearBlock.year, ...item });
    });
  });
  return slides;
}

const slides = buildSlides(timeline);

// 年ごとの最初のインデックス
function getYearStarts(slides) {
  const map = {};
  slides.forEach((s, i) => { if (!(s.year in map)) map[s.year] = i; });
  return map;
}
const yearStarts = getYearStarts(slides);

function getCategory(title) {
  if (/ハッカソン|開発|アプリ|SNS|オーダー/.test(title)) return 'dev';
  if (/旅行|合宿|年越し|スノーボード|海外|ベトナム/.test(title)) return 'trip';
  if (/委員|メンター|実行委員|成人|幹事/.test(title)) return 'org';
  return 'event';
}

const COL_W = 160; // px — JS と CSS で共有
const PAD   = 64;

export default function Timeline() {
  const trackRef   = useRef(null);
  const [active, setActive] = useState(slides.length - 1);
  const [progress, setProgress] = useState(1);
  const drag = useRef(null);

  // 初期：右端（最新）へ
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    setTimeout(() => { t.scrollLeft = t.scrollWidth; }, 80);
  }, []);

  // スクロール → progress バー & active 更新
  const onScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const p = t.scrollLeft / (t.scrollWidth - t.clientWidth);
    setProgress(Math.max(0, Math.min(1, p)));

    // 画面中央に最も近いドットを active に
    const cx = t.getBoundingClientRect().left + t.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    t.querySelectorAll('.tl-dot').forEach((el, i) => {
      const d = Math.abs(el.getBoundingClientRect().left - cx);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener('scroll', onScroll, { passive: true });
    return () => t.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollTo = (i) => {
    const t = trackRef.current;
    const dot = t?.querySelectorAll('.tl-dot')[i];
    dot?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  // マウスドラッグ
  const onMouseDown = (e) => {
    drag.current = { x: e.clientX, sl: trackRef.current.scrollLeft };
  };
  const onMouseMove = (e) => {
    if (!drag.current) return;
    trackRef.current.scrollLeft = drag.current.sl - (e.clientX - drag.current.x);
  };
  const onMouseUp = () => { drag.current = null; };

  const cur = slides[active];
  const totalW = COL_W * slides.length + PAD * 2;

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">

        {/* ヘッダー */}
        <div className="tl-header">
          <div>
            <h2 className="section-title">Timeline</h2>
            <p className="tl-sub">← 過去 &nbsp;|&nbsp; 最新 →</p>
          </div>
          <div className="tl-legend">
            {[['dev','開発'],['trip','旅行'],['org','委員・活動'],['event','その他']].map(([k,l])=>(
              <span key={k} className={`tl-leg tl-leg--${k}`}>{l}</span>
            ))}
          </div>
        </div>

        {/* 詳細パネル */}
        <div className="tl-panel">
          <div className={`tl-panel__dot tl-panel__dot--${getCategory(cur.title)}`} />
          <div className="tl-panel__body">
            <span className="tl-panel__date">{cur.year} {cur.month}</span>
            <strong className="tl-panel__title">{cur.title}</strong>
            <p className="tl-panel__desc">{cur.desc}</p>
          </div>
          <span className="tl-panel__num">{String(active + 1).padStart(2,'0')}<em>/{slides.length}</em></span>
        </div>
      </div>

      {/* ── グラフ本体 ── */}
      <div
        className="tl-track"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="tl-canvas" style={{ width: totalW }}>

          {/* 年区切り線 */}
          {Object.entries(yearStarts).map(([year, idx]) => (
            <div
              key={year}
              className="tl-year-sep"
              style={{ left: idx * COL_W + PAD }}
            >
              <span className="tl-year-sep__label">{year}</span>
            </div>
          ))}

          {/* 横軸 */}
          <div className="tl-axis">
            <div className="tl-axis__fill" style={{ width: `${progress * 100}%` }} />
          </div>

          {/* イベントノード */}
          {slides.map((s, i) => {
            const cat  = getCategory(s.title);
            const up   = i % 2 === 0;
            const cx   = i * COL_W + PAD + COL_W / 2;
            const isActive = i === active;
            return (
              <div
                key={i}
                className={`tl-node tl-node--${up ? 'up' : 'dn'} ${isActive ? 'is-active' : ''}`}
                style={{ left: cx }}
              >
                {/* 上ラベル */}
                {up && (
                  <div className="tl-label tl-label--up">
                    <span className="tl-label__month">{s.month}</span>
                    <span className="tl-label__name">{s.title}</span>
                  </div>
                )}

                {/* 縦コネクタ */}
                <div className={`tl-connector tl-connector--${cat}`} />

                {/* ドット */}
                <button
                  className={`tl-dot tl-dot--${cat} ${isActive ? 'is-active' : ''}`}
                  onClick={() => scrollTo(i)}
                  aria-label={s.title}
                />

                {/* 下ラベル */}
                {!up && (
                  <div className="tl-label tl-label--dn">
                    <span className="tl-label__month">{s.month}</span>
                    <span className="tl-label__name">{s.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* プログレスバー */}
      <div className="container">
        <div className="tl-progress">
          <div className="tl-progress__bar" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="tl-progress__labels">
          <span>2024 入学</span>
          <span>現在 →</span>
        </div>
      </div>
    </section>
  );
}
