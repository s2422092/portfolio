import './Skills.css';

const skillGroups = [
  {
    category: 'フロントエンド',
    icon: 'web',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'React', 'Next.js', 'shadcn/ui'],
  },
  {
    category: 'バックエンド',
    icon: 'dns',
    items: ['Python', 'Flask', 'JWT'],
  },
  {
    category: 'データベース',
    icon: 'storage',
    items: ['SQLite', 'Supabase (PostgreSQL)'],
  },
  {
    category: 'API / 外部サービス',
    icon: 'electrical_services',
    items: ['ChatGPT API', 'Groq API', 'Gemini API', 'PayPay API', '楽天API', 'GitHub OAuth', 'Slack OAuth'],
  },
  {
    category: 'ツール',
    icon: 'build',
    items: ['Git', 'GitHub', 'Vercel', 'Render'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="skills-intro">
          ハッカソンや個人開発を通じて実際のプロジェクトで活用してきた技術です。
        </p>

        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div key={group.category} className="skill-group card">
              <div className="skill-group__header">
                <span className="material-icons skill-group__icon">{group.icon}</span>
                <h3 className="skill-group__title">{group.category}</h3>
              </div>
              <div className="skill-group__tags">
                {group.items.map((item) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
