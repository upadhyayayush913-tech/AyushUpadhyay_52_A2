import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #000000;
    --surface:   #080d18;
    --border:    #0e1f3d;
    --accent:    #5ba3f5;
    --accent2:   #93c5fd;
    --text:      #dbeafe;
    --muted:     #5a7a9f;
    --mono:      'Space Mono', monospace;
    --sans:      'DM Sans', sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    line-height: 1.7;
  }

  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1rem 2.5rem;
    background: rgba(0,0,0,0.88);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--mono);
    font-size: 1rem;
    color: var(--accent);
    letter-spacing: 0.08em;
  }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    font-size: 0.85rem; font-weight: 500;
    color: var(--muted); text-decoration: none;
    letter-spacing: 0.05em; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--accent2); }

  .hero {
    min-height: 92vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 6rem 2.5rem 4rem;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 40%, rgba(91,163,245,0.09) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 20% 70%, rgba(147,197,253,0.06) 0%, transparent 60%);
    pointer-events: none;
  }
  .hero-tag {
    font-family: var(--mono);
    font-size: 0.78rem; color: var(--accent2);
    letter-spacing: 0.15em; text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .hero-tag::before { 
  content: ''; 
}
  .hero h1 {
    font-family: var(--mono);
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 700; line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    color: #ffffff;
  }
  .hero h1 span { color: var(--accent); }
  .hero-desc {
    font-size: 1.1rem; color: var(--muted);
    max-width: 500px; margin-bottom: 2.5rem;
  }
  .btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 1.6rem;
    background: var(--accent); color: #000000;
    font-family: var(--mono); font-size: 0.82rem;
    font-weight: 700; letter-spacing: 0.06em;
    border: none; cursor: pointer;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    transition: opacity 0.2s, transform 0.15s;
    text-decoration: none;
  }
  .btn:hover { opacity: 0.85; transform: translateY(-1px); }

  /* ── SECTION WRAPPER ── */
  .section {
    padding: 2rem 2.5rem;
    border-top: 1px solid var(--border);
    max-width: 900px; margin: 0 auto;
  }
  .section-label {
    font-family: var(--mono);
    font-size: 0.72rem; color: var(--accent);
    letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 0.75rem;
  }
  .section h2 {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 600; margin-bottom: 2rem;
    color: #ffffff;
  }

  /* ── ABOUT ── */
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
    align-items: start;
  }
  .about-grid p { color: var(--muted); font-size: 1rem; }
  .about-stats { display: flex; flex-direction: column; gap: 1rem; }
  .stat-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.9rem 1.2rem;
    background: var(--surface); border: 1px solid var(--border);
  }
  .stat-label { font-size: 0.82rem; color: var(--muted); }
  .stat-value {
    font-family: var(--mono); font-size: 0.9rem;
    color: var(--accent2); font-weight: 700;
  }

  /* ── SKILLS ── */
  .skills-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
  }
  .skill-chip {
    padding: 0.75rem 1rem;
    background: var(--surface); border: 1px solid var(--border);
    font-family: var(--mono); font-size: 0.82rem;
    color: var(--text); text-align: center;
    cursor: default; transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .skill-chip:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(91,163,245,0.06);
  }

  /* ── PROJECTS ── */
  .projects-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }
  .project-card {
    background: var(--surface); border: 1px solid var(--border);
    padding: 1.6rem; display: flex; flex-direction: column; gap: 0.75rem;
    transition: border-color 0.2s, transform 0.2s;
    cursor: default;
  }
  .project-card:hover { border-color: var(--accent); transform: translateY(-3px); }
  .project-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .project-icon {
    font-size: 1.4rem;
    width: 2.5rem; height: 2.5rem;
    display: flex; align-items: center; justify-content: center;
    background: rgba(91,163,245,0.08); border: 1px solid rgba(91,163,245,0.2);
  }
  .project-status {
    font-family: var(--mono); font-size: 0.65rem;
    padding: 0.2rem 0.6rem;
    background: rgba(91,163,245,0.1); color: var(--accent2);
    border: 1px solid rgba(91,163,245,0.25);
    letter-spacing: 0.08em;
  }
  .project-card h3 { font-size: 1rem; font-weight: 600; color: var(--text); }
  .project-card p { font-size: 0.88rem; color: var(--muted); flex: 1; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tag {
    font-family: var(--mono); font-size: 0.68rem;
    padding: 0.18rem 0.55rem;
    border: 1px solid var(--border); color: var(--muted);
  }

  /* ── CONTACT ── */
  .contact-box {
    background: var(--surface); border: 1px solid var(--border);
    padding: 2.5rem; text-align: center;
  }
  .contact-box p { color: var(--muted); margin-bottom: 1.5rem; }

  /* ── FOOTER ── */
  footer {
    border-top: 1px solid var(--border);
    padding: 2rem 2.5rem;
    display: flex; justify-content: space-between; align-items: center;
    max-width: 900px; margin: 0 auto;
  }
  footer p { font-family: var(--mono); font-size: 0.78rem; color: var(--muted); }
  footer span { color: var(--accent); }

  @media (max-width: 640px) {
    .about-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

/* ───────────────────────── COMPONENTS ───────────────────────────── */

function Header() {
    return (
        <>
            <style>{css}</style>
            <nav className="nav">
                <span className="nav-logo">Ayush's Portfolio</span>
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <section className="hero">
                <p className="hero-tag">Computer Engineering Student</p>
                <h1>
                    Hello, I'm<br />
                    <span>Ayush Upadhyay</span>
                </h1>
                <p className="hero-desc">
                    Third year Computer Engineering student passionate about
                    web development, React, and building meaningful software.
                </p>
                <div>
                    <button
                        className="btn"
                        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                    >
                        View Projects →
                    </button>
                </div>
            </section>
        </>
    );
}

function About() {
    return (
        <section className="section" id="about">
            
            <h2>About Me</h2>
            <div className="about-grid">
                <div>
                    <p>
                        I am a third year Computer Engineering student at MIT World Peace University,
                        interested in web development and building user-focused applications.
                        I enjoy turning ideas into clean, functional interfaces using modern
                        technologies like React and JavaScript.
                    </p>
                    <br />
                    <p>
                        Currently exploring full-stack development, open-source contributions,
                        and learning system design principles.
                    </p>
                </div>
                <div className="about-stats">
                    {[
                        { label: "Year", value: "3rd Year" },
                        { label: "Branch", value: "Comp. Engg." },
                        { label: "University", value: "MIT World Peace University" },
                        { label: "Focus", value: "Web Dev" },
                    ].map((s) => (
                        <div className="stat-item" key={s.label}>
                            <span className="stat-label">{s.label}</span>
                            <span className="stat-value">{s.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Skills() {
    const skills = [
        "HTML", "CSS", "JavaScript", "React",
        "Node.js", "Python", "Git", "GitHub",
        "VS Code", "REST APIs", "SQL", "Figma",
    ];
    return (
        <section className="section" id="skills">
            <h2>Technical Skills</h2>
            <div className="skills-grid">
                {skills.map((skill) => (
                    <div className="skill-chip" key={skill}>{skill}</div>
                ))}
            </div>
        </section>
    );
}

function Projects() {
    const projects = [
        {
            icon: "📁",
            title: "Student Portfolio Management System",
            desc: "A React-based web application to manage and showcase student achievements, skills, and projects in one place.",
            tags: ["React", "JavaScript", "CSS"],
            status: "Completed",
        },
        {
            icon: "📋",
            title: "To-Do List App",
            desc: "A task management application with add, delete, and mark-complete features built with React hooks and state management.",
            tags: ["React", "useState", "localStorage"],
            status: "Completed",
        },
        {
            icon: "🌐",
            title: "Personal Blog Website",
            desc: "A responsive static blog website built with HTML, CSS, and vanilla JavaScript, featuring dark mode toggle.",
            tags: ["HTML", "CSS", "JavaScript"],
            status: "In Progress",
        },
    ];

    return (
        <section className="section" id="projects">
            <h2>Projects</h2>
            <div className="projects-grid">
                {projects.map((p) => (
                    <div className="project-card" key={p.title}>
                        <div className="project-card-top">
                            <div className="project-icon">{p.icon}</div>
                            <span className="project-status">{p.status}</span>
                        </div>
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                        <div className="project-tags">
                            {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Contact() {
    return (
        <section className="section" id="contact">
            <h2>Get In Touch</h2>
            <div className="contact-box">
                <p>Currently open to internship opportunities and project collaborations.</p>
                <a href="mailto:ayush.upadhyay@gmail.com" className="btn">
                    ayush.upadhyay@gmail.com
                </a>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer>
            <p>© 2025 <span>Ayush Upadhyay</span>. Student Portfolio.</p>
            <p>Built with <span>React</span></p>
        </footer>
    );
}

/* ───────────────────────── APP (App.js) ─────────────────────────── */
export default function App() {
    return (
        <div>
            <Header />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
}
