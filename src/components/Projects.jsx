import { useRef, useState } from 'react';
import { projects } from '../data/profile';
import CountUp from './CountUp';
import './Projects.css';

const MAIN_ID = 2;

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

export default function Projects() {
  const main  = projects.find((p) => p.id === MAIN_ID);
  const others = projects.filter((p) => p.id !== MAIN_ID);

  return (
    <>
      <MainProject main={main} />
      <OtherProjects items={others} />
    </>
  );
}

function MainProject({ main }) {
  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title reveal" data-index="03">Projects</h2>
        <p className="projects-intro reveal">ハッカソンや個人開発で作成したプロジェクトです。</p>

        {/* ── メインプロジェクト ── */}
        {main && (
          <article className="proj-main reveal">
            <div className="proj-main__label">
              <span className="proj-featured-badge"><span className="live-dot" />Main Project · 稼働中</span>
              <span className="proj-main__meta">{main.event} · {main.period}</span>
            </div>

            <div className="proj-main__body">
              <div className="proj-main__info">
                <h3 className="proj-main__title">{main.title}</h3>
                {main.stats && (
                  <div className="proj-main__stats">
                    {main.stats.map((st) => (
                      <div key={st.label} className="proj-main__stat">
                        <span className="proj-main__stat-value"><CountUp value={st.value} /></span>
                        <span className="proj-main__stat-label">{st.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="proj-main__desc">{main.description}</p>

                <div className="proj-main__tech">
                  {main.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                <div className="proj-main__links">
                  {main.caseStudy && (
                    <a href={main.caseStudy} className="proj-link-case">
                      ケーススタディを読む <span aria-hidden="true">→</span>
                    </a>
                  )}
                  <a href={main.github} target="_blank" rel="noopener noreferrer" className="proj-link-gh">
                    <GithubIcon /> GitHub
                  </a>
                  {main.demo && (
                    <a href={main.demo} target="_blank" rel="noopener noreferrer" className="proj-link-demo">
                      <ExternalIcon /> Demo サイトを見る
                    </a>
                  )}
                </div>
              </div>

              <div className="proj-main__side">
                <div className="proj-main__role-card">
                  <span className="proj-main__role-label">担当</span>
                  <span className="proj-main__role-value">{main.role}</span>
                </div>
                <div className="proj-main__highlight">
                  <p>4店舗で実運用中（1日約45件の注文）</p>
                  <p>個人店舗向けモバイルオーダーの課題を解決</p>
                  <p>多言語対応：日本語、英語、ネパール語</p>
                </div>
              </div>
            </div>
          </article>
        )}

      </div>
    </section>
  );
}

function OtherProjects({ items }) {
  const railRef = useRef(null);
  const [expanded, setExpanded] = useState({});

  // カード1枚分ずつ横にスクロール
  const slide = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('.project-card');
    rail.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: 'smooth' });
  };

  return (
    <section id="other-projects" className="projects-other">
      <div className="container">
        <div className="proj-other-head reveal">
          <h3 className="proj-other-heading">
            Other Projects <span className="proj-other-count">{items.length}</span>
          </h3>
          <div className="proj-other-nav">
            <button type="button" onClick={() => slide(-1)} aria-label="前のプロジェクト">←</button>
            <button type="button" onClick={() => slide(1)} aria-label="次のプロジェクト">→</button>
          </div>
        </div>

        <div className="projects-rail reveal" ref={railRef}>
          {items.map((p) => {
            const open = expanded[p.id];
            const long = p.description.length > 70; // 3行に収まらない説明だけ開閉ボタンを出す
            return (
              <article key={p.id} className="card project-card">
                <div className="project-top">
                  <span className="project-event">{p.event} · {p.period}</span>
                  <span className="project-role">{p.role}</span>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className={`project-desc ${open ? 'is-open' : ''}`}>{p.description}</p>
                {long && (
                  <button
                    type="button"
                    className="project-more"
                    onClick={() => setExpanded((e) => ({ ...e, [p.id]: !open }))}
                    aria-expanded={Boolean(open)}
                  >
                    {open ? '閉じる' : '続きを読む'}
                  </button>
                )}
                <div className="project-tech">
                  {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <GithubIcon /> GitHub
                  </a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="link-btn link-demo">
                      <ExternalIcon /> Demo
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
