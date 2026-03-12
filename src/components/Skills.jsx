import { profile } from '../data/profile';
import './Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="skills-intro">
          HTML、CSS、Tailwind CSS、Flask、Python、PHP、JavaScriptなどを習得し、実際のプロジェクトで活用してきました。
        </p>
        <div className="skills-grid">
          {profile.skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="tech-tags">
          {['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Python', 'Flask', 'PHP', 'SQLite', 'React', 'Git', 'GitHub', 'ChatGPT API', 'PayPay API'].map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
