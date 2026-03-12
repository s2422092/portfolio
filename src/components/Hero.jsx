import { profile } from '../data/profile';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="container hero-content">
        <p className="hero-greeting">こんにちは、私は</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-name-en">{profile.nameEn}</p>
        <p className="hero-tagline">{profile.tagline}</p>
        <p className="hero-desc">{profile.university}</p>
        <div className="hero-badges">
          <span className="badge">データサイエンス</span>
          <span className="badge">Web開発</span>
          <span className="badge">ハッカソン×5</span>
          <span className="badge">チームリーダー</span>
        </div>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">プロジェクトを見る</a>
          <a href="#contact" className="btn-outline">連絡する</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span />
      </div>
    </section>
  );
}
