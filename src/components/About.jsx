import { profile } from '../data/profile';
import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-info card">
            <h3>基本情報</h3>
            <table className="info-table">
              <tbody>
                <tr><td>氏名</td><td>{profile.name}（{profile.nameEn}）</td></tr>
                <tr><td>生年月日</td><td>{profile.birthdate}</td></tr>
                <tr><td>居住地</td><td>{profile.location}</td></tr>
                <tr><td>大学</td><td>{profile.university}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="about-cards">
            <div className="card strength-card">
              <div className="card-header">
                <span className="card-icon">💪</span>
                <h3>長所</h3>
              </div>
              <p>{profile.strengths}</p>
            </div>
            <div className="card weakness-card">
              <div className="card-header">
                <span className="card-icon">🔧</span>
                <h3>短所・改善</h3>
              </div>
              <p>{profile.weakness}</p>
            </div>
          </div>

          <div className="about-activities card">
            <h3>活動・経験</h3>
            <ul className="activity-list">
              {profile.activities.map((a, i) => (
                <li key={i}>
                  <span className="activity-dot" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
