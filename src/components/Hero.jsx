import { useState } from 'react';
import { profile } from '../data/profile';
import './Hero.css';

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
        {/* 写真なし時のプレースホルダーテキスト */}
        {coverError && (
          <p className="cover-placeholder">cover photo — public/hero-bg.jpg</p>
        )}
      </div>

      {/* ── プロフィールエリア ── */}
      <div className="hero-profile-wrap">
        <div className="container">
          <div className="hero-profile">
            {/* アバター */}
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

            {/* テキスト */}
            <div className="hero-text">
              <div className="hero-name-row">
                <h1 className="hero-name">{profile.name}</h1>
                <span className="hero-name-en">{profile.nameEn}</span>
              </div>
              <p className="hero-tagline">{profile.tagline}</p>
              <p className="hero-univ">{profile.university}</p>

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
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span />
      </div>
    </section>
  );
}
