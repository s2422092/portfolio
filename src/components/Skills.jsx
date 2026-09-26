import { useRef, useState } from 'react';
import {
  siHtml5, siCss, siJavascript, siTypescript, siTailwindcss, siReact, siNextdotjs, siShadcnui,
  siPython, siFlask, siSqlite, siSupabase, siGooglegemini, siRakuten,
  siGithub, siGit, siVercel, siRender,
} from 'simple-icons';
import './Skills.css';

const categories = [
  { key: 'front', label: 'フロントエンド', icon: 'web', color: '#4f46e5' },
  { key: 'back', label: 'バックエンド', icon: 'dns', color: '#059669' },
  { key: 'db', label: 'データベース', icon: 'storage', color: '#d97706' },
  { key: 'api', label: 'API / 外部サービス', icon: 'electrical_services', color: '#db2777' },
  { key: 'tool', label: 'ツール', icon: 'build', color: '#0891b2' },
];

// simple-icons に無いブランドは mono（頭文字）+ ブランドカラーで表示
const skills = [
  { name: 'HTML', cat: 'front', icon: siHtml5 },
  { name: 'CSS', cat: 'front', icon: siCss },
  { name: 'JavaScript', cat: 'front', icon: siJavascript },
  { name: 'TypeScript', cat: 'front', icon: siTypescript },
  { name: 'Tailwind CSS', cat: 'front', icon: siTailwindcss },
  { name: 'React', cat: 'front', icon: siReact },
  { name: 'Next.js', cat: 'front', icon: siNextdotjs },
  { name: 'shadcn/ui', cat: 'front', icon: siShadcnui },
  { name: 'Python', cat: 'back', icon: siPython },
  { name: 'Flask', cat: 'back', icon: siFlask },
  { name: 'SQLite', cat: 'db', icon: siSqlite },
  { name: 'Supabase', cat: 'db', icon: siSupabase },
  { name: 'ChatGPT API', cat: 'api', mono: 'GPT', color: '#10a37f' },
  { name: 'Groq API', cat: 'api', mono: 'Gq', color: '#f55036' },
  { name: 'Gemini API', cat: 'api', icon: siGooglegemini },
  { name: 'PayPay API', cat: 'api', mono: 'Pay', color: '#ff0033' },
  { name: '楽天API', cat: 'api', icon: siRakuten },
  { name: 'GitHub OAuth', cat: 'api', icon: siGithub },
  { name: 'Slack OAuth', cat: 'api', mono: '#', color: '#4a154b' },
  { name: 'Git', cat: 'tool', icon: siGit },
  { name: 'GitHub', cat: 'tool', icon: siGithub },
  { name: 'Vercel', cat: 'tool', icon: siVercel },
  { name: 'Render', cat: 'tool', icon: siRender },
];

// index から決まる疑似ランダム値（毎回同じ配置にするため）
const jitter = (i, a, b, range) => ((i * a + b) % (range * 2 + 1)) - range;

function SkillIcon({ skill }) {
  if (skill.icon) {
    return (
      <svg viewBox="0 0 24 24" className="orb__svg" fill={`#${skill.icon.hex}`} aria-hidden="true">
        <path d={skill.icon.path} />
      </svg>
    );
  }
  return (
    <span
      className={`orb__mono ${skill.mono.length === 1 ? 'orb__mono--lg' : ''}`}
      style={{ color: skill.color }}
    >
      {skill.mono}
    </span>
  );
}

export default function Skills() {
  const [active, setActive] = useState('all');
  const stageRef = useRef(null);

  // マウス位置を -1〜1 に正規化し、奥行きに応じてアイコンをずらす（パララックス）
  const onPointerMove = (e) => {
    const el = stageRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onPointerLeave = () => {
    stageRef.current?.style.setProperty('--px', 0);
    stageRef.current?.style.setProperty('--py', 0);
  };

  const count = (key) => skills.filter((s) => s.cat === key).length;

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title reveal" data-index="02">Skills</h2>
        <p className="skills-intro reveal">
          ハッカソンや個人開発を通じて実際のプロジェクトで活用してきた技術です。
        </p>

        <div className="skill-filters reveal" role="tablist" aria-label="スキルのカテゴリ">
          <button
            role="tab"
            aria-selected={active === 'all'}
            className={`skill-filter ${active === 'all' ? 'is-active' : ''}`}
            onClick={() => setActive('all')}
          >
            すべて<span className="skill-filter__count">{skills.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={active === c.key}
              className={`skill-filter skill-filter--cat ${active === c.key ? 'is-active' : ''}`}
              style={{ '--cat': c.color }}
              onClick={() => setActive(active === c.key ? 'all' : c.key)}
            >
              <span className="skill-filter__dot" aria-hidden="true" />
              {c.label}
              <span className="skill-filter__count">{count(c.key)}</span>
            </button>
          ))}
        </div>

        <div
          className="skill-stage reveal"
          ref={stageRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <div className="skill-zones">
            {categories.map((c) => {
              const items = skills.filter((sk) => sk.cat === c.key);
              const dim = active !== 'all' && active !== c.key;
              return (
                <div
                  key={c.key}
                  className={`skill-zone skill-zone--${c.key} ${dim ? 'is-dim' : ''} ${active === c.key ? 'is-hit' : ''}`}
                  style={{ '--cat': c.color }}
                >
                  <div className="skill-zone__head">
                    <span className="material-icons skill-zone__icon" aria-hidden="true">{c.icon}</span>
                    <span className="skill-zone__label">{c.label}</span>
                    <span className="skill-zone__count">{items.length}</span>
                  </div>
                  <ul className="skill-orbs">
                    {items.map((sk) => {
                      const i = skills.indexOf(sk);
                      return (
                        <li
                          key={sk.name}
                          className="orb-cell"
                          style={{
                            '--ox': `${jitter(i, 37, 5, 6)}px`,
                            '--oy': `${jitter(i, 53, 11, 8)}px`,
                            '--depth': (i * 7) % 3, // 0: 奥, 1: 中, 2: 手前
                            '--float-dur': `${5 + (i % 4) * 0.9}s`,
                            '--float-delay': `${-(i * 0.7)}s`,
                            '--brand': sk.icon ? `#${sk.icon.hex}` : sk.color,
                          }}
                        >
                          <div className="orb">
                            <div className="orb__tile">
                              <SkillIcon skill={sk} />
                            </div>
                            <span className="orb__name">{sk.name}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
