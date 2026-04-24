import './Skills.css';

const skillGroups = [
  {
    category: 'フロントエンド',
    icon: '🖥️',
    items: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'React'],
  },
  {
    category: 'バックエンド',
    icon: '⚙️',
    items: ['Python', 'Flask'],
  },
  {
    category: 'データベース',
    icon: '🗄️',
    items: ['SQLite'],
  },
  {
    category: 'API / 外部サービス',
    icon: '🔌',
    items: ['ChatGPT API', 'PayPay API'],
  },
  {
    category: 'ツール',
    icon: '🛠️',
    items: ['Git', 'GitHub', 'Vercel'],
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
                <span className="skill-group__icon">{group.icon}</span>
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
