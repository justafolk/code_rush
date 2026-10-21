import { useEffect, useState } from 'react';

const modules = [
  {
    number: '01',
    name: 'Frontend',
    detail: 'React · Vite · JavaScript',
    color: 'mint',
    icon: '↗',
  },
  {
    number: '02',
    name: 'Backend',
    detail: 'Go · HTTP · JSON',
    color: 'lavender',
    icon: '⌘',
  },
  {
    number: '03',
    name: 'Workspace',
    detail: 'One repo · clear boundaries',
    color: 'peach',
    icon: '◎',
  },
];

function App() {
  const [apiStatus, setApiStatus] = useState('Checking');

  useEffect(() => {
    let active = true;

    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable');
        return response.json();
      })
      .then((data) => {
        if (active) setApiStatus(data.status === 'ok' ? 'Connected' : 'Unavailable');
      })
      .catch(() => {
        if (active) setApiStatus('Unavailable');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Code Rush home">
          <span className="wordmark-mark">c.</span>
          <span>code rush</span>
        </a>
        <div className="topbar-meta">
          <span className="repo-label">MONOREPO STARTER</span>
          <span className={`connection connection-${apiStatus.toLowerCase()}`}>
            <span className="connection-dot" />
            API {apiStatus}
          </span>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT BIG THING STARTS HERE</span>
          <h1>A clean slate<br />for a <span>great build.</span></h1>
          <p className="hero-description">
            A thoughtful foundation for moving from first idea to first release.
            Frontend and backend, together and ready to go.
          </p>
          <a className="primary-link" href="#workspace">
            Explore the workspace <span aria-hidden="true">↘</span>
          </a>
          <div className="hero-note">
            <span className="note-mark">✳</span>
            <span>Made for momentum.<br /><strong>Shaped for what comes next.</strong></span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-sun"><span>cr</span></div>
          <div className="art-spark spark-one">✳</div>
          <div className="art-spark spark-two">✳</div>
          <div className="art-caption">IDEA<br /><span>→</span> IMPACT</div>
          <div className="art-sticker">LET'S<br />MAKE<br /><b>IT REAL</b></div>
        </div>
      </section>

      <section className="workspace" id="workspace">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" /> THE STARTING POINT</span>
            <h2>Everything in its place.</h2>
          </div>
          <p>Three simple building blocks.<br />One clear path from here.</p>
        </div>

        <div className="module-grid">
          {modules.map((module) => (
            <article className={`module-card ${module.color}`} key={module.number}>
              <div className="module-topline">
                <span>{module.number} / 03</span>
                <span className="module-icon" aria-hidden="true">{module.icon}</span>
              </div>
              <div>
                <h3>{module.name}</h3>
                <p>{module.detail}</p>
              </div>
              <span className="module-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>CODE RUSH <span className="footer-dot">✳</span> BUILT TO BEGIN</span>
        <span>JS ON THE FRONT. GO AT THE CORE.</span>
      </footer>
    </main>
  );
}

export default App;

