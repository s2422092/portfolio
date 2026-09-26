import { hiroliaCase as c } from '../data/caseStudy';
import CountUp from './CountUp';
import './CaseStudy.css';

const sections = [
  { id: 'cs-problem', label: '解決した課題' },
  { id: 'cs-origin', label: 'なぜ始めたのか' },
  { id: 'cs-flow', label: 'サービスの仕組み' },
  { id: 'cs-role', label: '自分の役割' },
  { id: 'cs-ingenuity', label: '工夫した点' },
  { id: 'cs-result', label: '導入状況' },
  { id: 'cs-future', label: '今後の展望' },
];

// 目次クリックはハッシュを変えずにスクロール（ハッシュはページ切替に使っているため）
const jump = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Heading({ index, children }) {
  return (
    <h2 className="cs-heading reveal">
      <span className="cs-heading__index">{String(index).padStart(2, '0')} //</span>
      {children}
    </h2>
  );
}

export default function CaseStudy() {
  const { market } = c.future;
  const perStore = Math.round(45 / market.current); // 1店舗あたりの1日の注文数
  const onePercent = Math.round(market.totalNum * 0.01);
  const share = ((market.current / market.totalNum) * 100).toFixed(1);

  return (
    <div className="cs">
      <header className="cs-bar">
        <div className="container cs-bar__inner">
          <a href="#projects" className="cs-back">
            <span aria-hidden="true">←</span> ポートフォリオに戻る
          </a>
          <span className="cs-bar__label">CASE STUDY</span>
        </div>
      </header>

      {/* ── ヒーロー ── */}
      <section className="cs-hero">
        <div className="container">
          <p className="cs-hero__eyebrow reveal">
            <span className="live-dot" /> 実店舗で稼働中 · {c.period}
          </p>
          <h1 className="cs-hero__title reveal">{c.title}</h1>
          <p className="cs-hero__lead reveal">{c.lead}</p>
          <p className="cs-hero__overview reveal">{c.overview}</p>

          <div className="cs-stats reveal">
            {c.stats.map((s) => (
              <div key={s.label} className="cs-stat">
                <span className="cs-stat__value"><CountUp value={s.value} /></span>
                <span className="cs-stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="cs-hero__links reveal">
            <a href={c.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
              サービスを見る <span aria-hidden="true">↗</span>
            </a>
            <a href={c.github} target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub</a>
          </div>
        </div>
      </section>

      <div className="container cs-layout">
        {/* ── 目次（パソコンでは左に固定） ── */}
        <nav className="cs-toc" aria-label="目次">
          <p className="cs-toc__title">CONTENTS</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={(e) => jump(e, s.id)}>
                  <em>{String(i + 1).padStart(2, '0')}</em>{s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="cs-body">
          {/* 01 課題 */}
          <section id="cs-problem" className="cs-section">
            <Heading index={1}>解決した課題</Heading>
            <p className="cs-summary reveal">{c.problem.summary}</p>
            <ul className="cs-points reveal">
              {c.problem.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <div className="cs-callout reveal">
              <span className="material-icons" aria-hidden="true">lightbulb</span>
              <p>{c.problem.solution}</p>
            </div>
          </section>

          {/* 02 きっかけ */}
          <section id="cs-origin" className="cs-section">
            <Heading index={2}>なぜ始めたのか</Heading>
            <ol className="cs-origin reveal">
              {c.origin.map((o, i) => (
                <li key={o.label}>
                  <span className="cs-origin__step">STEP {i + 1}</span>
                  <strong>{o.label}</strong>
                  <p>{o.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 03 仕組み */}
          <section id="cs-flow" className="cs-section">
            <Heading index={3}>サービスの仕組み</Heading>
            <ol className="cs-flow reveal">
              {c.flow.map((f, i) => (
                <li key={f.title} className="cs-flow__step">
                  <div className="cs-flow__icon">
                    <span className="material-icons" aria-hidden="true">{f.icon}</span>
                  </div>
                  <span className="cs-flow__who">{i + 1}. {f.who}</span>
                  <strong>{f.title}</strong>
                  <p>{f.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 04 役割 */}
          <section id="cs-role" className="cs-section">
            <Heading index={4}>自分の役割</Heading>
            <div className="cs-roles reveal">
              {c.roles.map((r) => (
                <div key={r.title} className="card cs-role">
                  <div className="cs-role__head">
                    <span className="material-icons" aria-hidden="true">{r.icon}</span>
                    <h3>{r.title}</h3>
                  </div>
                  <ul>
                    {r.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="cs-tech reveal">
              <span className="cs-tech__label">技術スタック</span>
              {c.tech.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </section>

          {/* 05 工夫 */}
          <section id="cs-ingenuity" className="cs-section">
            <Heading index={5}>開発で工夫した点</Heading>
            <p className="cs-summary reveal">{c.ingenuity.summary}</p>
            <p className="cs-text reveal">{c.ingenuity.text}</p>
            <div className="cs-examples reveal">
              {c.ingenuity.examples.map((ex) => (
                <div key={ex.title} className="cs-example">
                  <strong>{ex.title}</strong>
                  <p>{ex.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 06 導入状況 */}
          <section id="cs-result" className="cs-section">
            <Heading index={6}>実際の導入状況</Heading>
            <div className="cs-result reveal">
              {c.stats.map((s) => (
                <div key={s.label} className="cs-result__item">
                  <span className="cs-result__value"><CountUp value={s.value} /></span>
                  <span className="cs-result__label">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 07 展望 */}
          <section id="cs-future" className="cs-section">
            <Heading index={7}>今後の展望と、この事業の可能性</Heading>
            <p className="cs-summary reveal">{c.future.goal}</p>

            <div className="cs-market card reveal">
              <div className="cs-market__nums">
                <div>
                  <span className="cs-market__big">{market.total}<small>店</small></span>
                  <span className="cs-market__cap">日本にあるインド・ネパール料理店（{market.source}）</span>
                </div>
                <div>
                  <span className="cs-market__big cs-market__big--accent">{market.current}<small>店舗</small></span>
                  <span className="cs-market__cap">現在の導入数（全体の約{share}%）</span>
                </div>
              </div>
              <div className="cs-market__bar" aria-hidden="true">
                <span style={{ width: `max(6px, ${share}%)` }} />
              </div>
              <p className="cs-market__calc">
                <span className="material-icons" aria-hidden="true">calculate</span>
                <span>
                  試算：全体の1%（約{onePercent}店舗）に導入できれば、今の1店舗あたりの注文数（約{perStore}件/日）で
                  <strong> 1日約{(Math.round((onePercent * perStore) / 100) * 100).toLocaleString('ja-JP')}件</strong> の注文を支えるサービスになります。
                </span>
              </p>
            </div>

            <div className="cs-reasons">
              {c.future.reasons.map((r, i) => (
                <div
                  key={r.title}
                  className="card cs-reason reveal"
                  style={{ '--reveal-delay': `${i * 0.08}s` }}
                >
                  <span className="material-icons cs-reason__icon" aria-hidden="true">{r.icon}</span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </section>

          <a href="#projects" className="cs-back cs-back--bottom">
            <span aria-hidden="true">←</span> ポートフォリオに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
