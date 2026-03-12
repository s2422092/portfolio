import { timeline } from '../data/profile';
import './Timeline.css';

export default function Timeline() {
  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <h2 className="section-title">Timeline</h2>
        <p className="timeline-intro">大学入学から現在までの主な活動・経験の記録です。</p>
        {timeline.map((yearBlock) => (
          <div key={yearBlock.year} className="year-block">
            <h3 className="year-label">{yearBlock.year}</h3>
            <div className="timeline-items">
              {yearBlock.items.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-line">
                    <div className="timeline-dot" />
                  </div>
                  <div className="timeline-body card">
                    <span className="timeline-month">{item.month}</span>
                    <h4 className="timeline-event">{item.title}</h4>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
