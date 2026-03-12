import { useRef, useState, useEffect, useCallback } from 'react';
import { timeline } from '../data/profile';
import './Timeline.css';

// 全カードをフラットな配列に変換（年ラベルカードも含む）
function buildSlides(timeline) {
  const slides = [];
  timeline.forEach((yearBlock) => {
    slides.push({ type: 'year', label: yearBlock.year });
    yearBlock.items.forEach((item) => {
      slides.push({ type: 'item', year: yearBlock.year, ...item });
    });
  });
  return slides;
}

const slides = buildSlides(timeline);

export default function Timeline() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);

  // スクロール位置からアクティブカードを更新
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.tl-card');
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const dist = Math.abs(rect.left - trackRect.left - 48);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll('.tl-card')[index];
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(slides.length - 1, activeIndex + 1));

  // マウスドラッグ
  const onMouseDown = (e) => {
    setIsDragging(false);
    dragStart.current = { x: e.clientX, scrollLeft: trackRef.current.scrollLeft };
  };
  const onMouseMove = (e) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) > 4) setIsDragging(true);
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };
  const onMouseUp = () => { dragStart.current = null; };

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <div className="tl-header">
          <div>
            <h2 className="section-title">Timeline</h2>
            <p className="tl-intro">大学入学から現在までの主な活動・経験の記録です。</p>
          </div>
          <div className="tl-nav">
            <button className="tl-nav-btn" onClick={prev} aria-label="前へ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <span className="tl-counter">{activeIndex + 1} / {slides.length}</span>
            <button className="tl-nav-btn" onClick={next} aria-label="次へ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* スライドトラック（full-width） */}
      <div
        className="tl-track"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="tl-track-inner">
          {slides.map((slide, i) =>
            slide.type === 'year' ? (
              <div
                key={i}
                className={`tl-card tl-year-card ${i === activeIndex ? 'active' : ''}`}
                onClick={() => scrollTo(i)}
              >
                <span className="tl-year-label">{slide.label}</span>
              </div>
            ) : (
              <div
                key={i}
                className={`tl-card tl-item-card ${i === activeIndex ? 'active' : ''}`}
                onClick={() => !isDragging && scrollTo(i)}
              >
                <div className="tl-card-top">
                  <span className="tl-year-tag">{slide.year}</span>
                  <span className="tl-month">{slide.month}</span>
                </div>
                <h4 className="tl-title">{slide.title}</h4>
                <p className="tl-desc">{slide.desc}</p>
                <div className="tl-card-num">{String(i).padStart(2, '0')}</div>
              </div>
            )
          )}
          {/* 末尾のスペーサー */}
          <div className="tl-spacer" />
        </div>
      </div>

      {/* ドットナビゲーション */}
      <div className="container">
        <div className="tl-dots">
          {slides.map((slide, i) => (
            <button
              key={i}
              className={`tl-dot ${i === activeIndex ? 'active' : ''} ${slide.type === 'year' ? 'dot-year' : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={slide.type === 'year' ? slide.label : slide.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
