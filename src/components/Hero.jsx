import { useState } from 'react';
import { profile } from '../data/profile';
import Typewriter from './Typewriter';
import './Hero.css';

const badges = ['実運用アプリ開発', 'Web開発', 'ハッカソン×7', 'チームリーダー', '海外×2'];

export default function Hero() {
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [coverError, setCoverError] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="hero" className="hero">
      {/* ── カバー写真エリア ── */}
      <div className="hero-cover">
        {!coverError && (
          <img
            src="/hero-bg.jpg"
            alt="cover"
            className={`cover-img ${coverLoaded ? 'loaded' : ''}`}
            onLoad={() => setCoverLoaded(true)}
            onError={() => setCoverError(true)}
          />
        )}
        <div className={`cover-overlay ${coverLoaded && !coverError ? 'with-photo' : ''}`} />
        <div className="cover-grid" aria-hidden="true" />
        <div className="cover-scan" aria-hidden="true" />
        {coverError && (
          <p className="cover-placeholder">cover photo — public/hero-bg.jpg</p>
        )}
      </div>

      {/* ── プロフィールエリア ── */}
      <div className="hero-profile-wrap">
        <div className="container">
          <div className="hero-profile">
            {/* アバター（回転するグラデーションリング） */}
            <div className="avatar-ring">
              <div className="avatar-wrap">
                {!avatarError ? (
                  <img
                    src="/avatar.jpg"
                    alt={profile.name}
                    className={`avatar-img ${avatarLoaded ? 'loaded' : ''}`}
                    onLoad={() => setAvatarLoaded(true)}
                    onError={() => setAvatarError(true)}
                  />
                ) : null}
                {(avatarError || !avatarLoaded) && (
                  <div className={`avatar-fallback ${avatarLoaded ? 'hidden' : ''}`}>
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* テキスト */}
            <div className="hero-text">
              <p className="hero-prompt">
                <span className="hero-prompt__path">~/portfolio</span>
                <span className="hero-prompt__sign">$</span>
                <Typewriter text="whoami" speed={90} delay={300} caret={false} />
              </p>

              <div className="hero-name-row">
                <h1 className="hero-name">{profile.name}</h1>
                <span className="hero-name-en">{profile.nameEn}</span>
              </div>
              <p className="hero-tagline">
                <Typewriter text={profile.tagline} speed={35} delay={900} />
              </p>
              <p className="hero-univ">{profile.university}</p>

              <div className="hero-badges">
                {badges.map((b, i) => (
                  <span key={b} className="badge" style={{ animationDelay: `${1.2 + i * 0.08}s` }}>
                    {b}
                  </span>
                ))}
              </div>

              <div className="hero-cta">
                <a href="#projects" className="btn-primary">
                  プロジェクトを見る <span aria-hidden="true">→</span>
                </a>
                <a href="#contact" className="btn-outline">連絡する</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="下へスクロール">
        <span className="hero-scroll__label">scroll</span>
        <span className="hero-scroll__line" />
      </a>
    </section>
  );
}
