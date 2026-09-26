import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDots from './components/SectionDots';
import CaseStudy from './components/CaseStudy';
import { hiroliaCase } from './data/caseStudy';

// ハッシュが #/works/... のときはケーススタディページを表示する
const isCaseHash = () => window.location.hash === hiroliaCase.path;

function App() {
  const progressRef = useRef(null);
  const [isCase, setIsCase] = useState(isCaseHash);

  useEffect(() => {
    const onHash = () => setIsCase(isCaseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // ページ切替時：ケーススタディは先頭から、ポートフォリオはハッシュの位置（例 #projects）へ
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('no-snap', isCase);
    root.style.scrollBehavior = 'auto';
    if (isCase) {
      window.scrollTo(0, 0);
    } else {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
    root.style.scrollBehavior = '';
  }, [isCase]);

  useEffect(() => {
    // スクロールで .reveal 要素をフェードイン
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // カードのスポットライト位置をマウスに追従させる
    const onPointerMove = (e) => {
      const card = e.target.closest?.('.card, .proj-main');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    // ページ上部のスクロール進捗バー
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isCase]);

  return (
    <>
      <div className="bg-fx" aria-hidden="true">
        <div className="bg-fx__grid" />
        <div className="bg-fx__orb bg-fx__orb--a" />
        <div className="bg-fx__orb bg-fx__orb--b" />
      </div>
      <div className="scroll-progress" ref={progressRef} />
      {isCase ? (
        <CaseStudy />
      ) : (
        <>
          <Navbar />
          <SectionDots />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Timeline />
            <Contact />
          </main>
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
