import emailjs from "@emailjs/browser";
import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";

const skillGroups = [
  {
    title: "AI Engineering & LLM Systems",
    skills: [
      "LLM orchestration using LangChain & LangGraph",
      "Prompt engineering: zero-shot, one-shot, few-shot, Chain-of-Thought reasoning",
      "Retrieval-Augmented Generation (RAG): document ingestion, chunking, embedding pipelines, context scoring & reranking",
      "Vector databases & semantic search: embeddings, similarity search, hybrid retrieval, metadata filtering",
      "AI agent workflows: multi-step agents, tool usage, LangGraph orchestration vs traditional chains",
      "Model Context Protocol (MCP): connecting LLMs to external APIs, services, and local tools",
      "LLM deployment: Claude, OpenAI, Gemini, Ollama, Gemma, local open-source models",
    ],
  },
  {
    title: "Software Engineering",
    skills: [
      "Flutter, FlutterFlow, React, Python, Golang, Node.js, Laravel, WordPress, PHP",
      "REST & GraphQL API architecture",
      "Android & iOS deployment pipelines",
      "CI/CD: Codemagic, GitHub, GitLab, Vercel, Docker",
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      "Firebase, Supabase, MySQL, SQLite, AWS",
      "Serverless and cloud integrations",
      "Authentication, payments, real-time systems",
    ],
  },
  {
    title: "Automation & IoT",
    skills: [
      "n8n workflow automation, Make, Zapier",
      "Arduino, ESP32, sensor integrations",
      "AI-driven internal tools & business automation",
    ],
  },
  {
    title: "Core Skills",
    skills: [
      "Proficiency in C#",
      "Git Version Control",
      "Software Development Principles",
      "Problem-Solving",
      "Attention to Detail",
      "Communication",
      "Teamwork",
      "Independent Collaboration",
      "Adaptability",
      "Fast Learning",
    ],
  },
  {
    title: "Preferred Skills",
    skills: [
      "C#",
      "SQL Server",
      "AWS",
      "PostgreSQL",
      "Microsoft Azure AI",
      "TypeScript",
      "Vue 3",
      "Nuxt 3",
      "Software Testing",
      "Debugging",
      "Agile Development",
    ],
  },
];

const projects = [
  {
    title: "BAANG Parish System",
    description:
      "Centralized web application for parish management and digitization.",
    image: "/media/baang_parish_system.png",
  },
  {
    title: "DICT Info System",
    description:
      "Data management and project tracking platform for DICT operations.",
    image: "/media/dict_information_system.png",
  },
  {
    title: "MorelinX App",
    description:
      "Mobile app for electricity reading, inspection, and billing workflows.",
    image: "/media/morelinx.jpg",
  },
];

const certificates = [
  {
    title: "Computer Hardware",
    description:
      "Certification in computer hardware servicing and maintenance.",
    image: "/media/computer_hardware.png",
  },
  {
    title: "Cyber Threat Management",
    description:
      "Training in identifying and mitigating digital security threats.",
    image: "/media/cyber_threat_management.png",
  },
  {
    title: "Data Analytics",
    description:
      "Certification in data processing, analysis, and visualization techniques.",
    image: "/media/data_analytics.png",
  },
];

const references = [
  {
    name: "Julio Lopez",
    role: "Contractor / Developer / CEO",
    email: "juliolopez241997@gmail.com",
    phone: "+63 907-512-1814",
  },
  {
    name: "Benjie Lenteria",
    role: "Professor / Supervisor / Co-Developer",
    email: "hawkmanlentrix@gmail.com",
    phone: "+63 917-303-5716",
  },
  {
    name: "Jay Mar Masibay",
    role: "Instructor / Project Officer / Trainor",
    email: "jaymarmasibay@gmail.com",
    phone: "+63 9278635200",
  },
  {
    name: "Jeffry Abaniel",
    role: "Senior Flutter Developer",
    email: "JeffryAbaniel@gmail.com",
    phone: "+63 09482845780",
  },
];

const navigationItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#references", label: "References" },
  { href: "#contact", label: "Contact" },
];

const highlights = [
  {
    title: "Available for work",
    description: "Open to freelance, company, and team projects.",
  },
  {
    title: "Full-stack delivery",
    description: "From database design to polished, responsive UI.",
  },
  {
    title: "Clear communication",
    description: "Practical updates and maintainable code.",
  },
  {
    title: "Reliable outcomes",
    description: "Parish, government, and utility systems that last.",
  },
];

const techStack = [
  "PHP",
  "Laravel",
  "JavaScript",
  "React",
  "Node.js",
  "WordPress",
  "Python",
  "C#",
  "SQL Server",
  "PostgreSQL",
  "AWS",
  "Git",
];

const stats = [
  { value: "3+", label: "Featured projects" },
  { value: "3", label: "Certificates" },
  { value: "10+", label: "Technologies" },
];

const contactEmail = "magallanesmannix2000@gmail.com";

const emptyContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

function App() {
  const [contactForm, setContactForm] = useState(emptyContactForm);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [contactFeedback, setContactFeedback] = useState<{
    tone: "idle" | "success" | "error";
    message: string;
  }>({ tone: "idle", message: "" });

  const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean);

  const handleContactFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEmailJsConfigured) {
      setContactFeedback({
        tone: "error",
        message:
          "Email delivery is not configured yet. Add the EmailJS environment variables before using this form.",
      });
      return;
    }

    setIsSendingMessage(true);
    setContactFeedback({ tone: "idle", message: "" });

    try {
      await emailjs.send(
        emailJsConfig.serviceId!,
        emailJsConfig.templateId!,
        {
          to_email: contactEmail,
          from_name: contactForm.name,
          from_email: contactForm.email,
          subject: contactForm.subject || "Portfolio inquiry",
          message: contactForm.message,
          reply_to: contactForm.email,
        },
        {
          publicKey: emailJsConfig.publicKey!,
        },
      );

      setContactForm(emptyContactForm);
      setContactFeedback({
        tone: "success",
        message:
          "Message sent successfully. I will receive it in my Gmail inbox.",
      });
    } catch {
      setContactFeedback({
        tone: "error",
        message:
          "Message could not be sent right now. Please try again or use the direct email link.",
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="site">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">EM</span>
            <span className="brand-name">Emmanuel Magallanes</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar-actions">
            <a
              className="btn btn-outline btn-sm hide-sm"
              href="/documents/Emmanuel-Magallanes-Resume.pdf"
              download>
              Resume
            </a>
            <a className="btn btn-primary btn-sm" href="#contact">
              Hire Me
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="container hero">
          <div className="hero-copy">
            <p className="greeting">Hi, I'm Emmanuel 👋</p>
            <h1>
              Full-stack web developer.
              <br />
              <span className="accent">Let's build together.</span>
            </h1>
            <p className="lead">
              I help clients launch high-performing web products with clear UX
              and maintainable architecture, working across PHP, Laravel,
              JavaScript, React, Node.js, WordPress, Python, and database
              design.
            </p>
            <div className="btn-row">
              <a className="btn btn-primary" href="#contact">
                Start a Project
              </a>
              <a className="btn btn-outline" href="#projects">
                View My Work →
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-card">
              <span className="status-badge">
                <span className="dot"></span>
                Available for work
              </span>
              <img
                className="avatar"
                src="/media/profile.jpg"
                alt="Emmanuel Magallanes"
              />
              <p className="profile-name">Emmanuel L. Magallanes</p>
              <p className="profile-role">Full-Stack Web Developer</p>
              <a className="btn btn-primary btn-block" href="#contact">
                Send a Message
              </a>
              <p className="profile-meta">
                Freelance · Company · Team projects
              </p>
            </div>
          </div>
        </section>

        <section className="container strip-wrap">
          <div className="strip">
            {highlights.map((item) => (
              <div className="strip-item" key={item.title}>
                <span className="strip-icon" aria-hidden="true">
                  ✦
                </span>
                <div>
                  <p className="strip-title">{item.title}</p>
                  <p className="strip-text">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="container section">
          <div className="about-grid">
            <img
              className="about-image"
              src="/media/profile.jpg"
              alt="Emmanuel Magallanes"
            />
            <div>
              <p className="kicker">About Me</p>
              <h2>
                A developer who turns <span className="accent">ideas</span>{" "}
                into shipped products.
              </h2>
              <p className="body-text">
                Emmanuel Magallanes focuses on responsive, user-friendly
                systems that balance speed, clarity, and maintainability. The
                portfolio spans parish, government, and utility-focused
                applications where reliability matters more than novelty.
              </p>
              <p className="body-text">
                Beyond IT, my family's main source of income is agriculture. We
                raise pigs, cows, and chickens, and cultivate a variety of
                vegetables. That hands-on experience taught me hard work,
                responsibility, and sustainable practices, which shape my
                approach to problem-solving and teamwork.
              </p>
              <div className="stats">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="band">
          <div className="container">
            <p className="kicker">What I Do</p>
            <h2>
              Turning AI ideas into{" "}
              <span className="accent">real systems.</span>
            </h2>
            <div className="grid grid-2">
              {skillGroups.map((group) => (
                <div className="card" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="bullet-list">
                    {group.skills.map((skill) => (
                      <li key={skill}>
                        <span className="bullet"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="container section">
          <p className="kicker">Selected Projects</p>
          <h2>Recent work worth a look.</h2>
          <div className="grid grid-3">
            {projects.map((project) => (
              <article className="card card-media" key={project.title}>
                <img src={project.image} alt={project.title} />
                <div className="card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container section tight">
          <p className="kicker">Tech I Use</p>
          <h2>Full-stack delivery, end to end.</h2>
          <div className="pills">
            {techStack.map((tech) => (
              <span className="pill" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section id="certificates" className="band">
          <div className="container">
            <p className="kicker">Certificates</p>
            <h2>Training and credentials.</h2>
            <div className="grid grid-3">
              {certificates.map((certificate) => (
                <article className="card card-media" key={certificate.title}>
                  <img src={certificate.image} alt={certificate.title} />
                  <div className="card-body">
                    <h3>{certificate.title}</h3>
                    <p>{certificate.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="references" className="container section">
          <p className="kicker">References</p>
          <h2>Professional contacts.</h2>
          <div className="grid grid-2">
            {references.map((reference) => (
              <article className="card" key={reference.name}>
                <h3>{reference.name}</h3>
                <p className="ref-role">{reference.role}</p>
                <p className="ref-line">{reference.email}</p>
                <p className="ref-line">{reference.phone}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="container cta-inner">
            <div>
              <p className="cta-title">Let's build something amazing together.</p>
              <p className="cta-sub">
                Freelance work, company roles, or team projects.
              </p>
            </div>
            <div className="btn-row">
              <a className="btn btn-white" href="#contact">
                Send Message
              </a>
              <a
                className="btn btn-ghost"
                href="/documents/Emmanuel-Magallanes-Portfolio.pdf"
                download>
                Portfolio PDF
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="container section">
          <div className="contact-grid">
            <div>
              <p className="kicker">Contact</p>
              <h2>Let's build something solid.</h2>
              <p className="body-text">
                For freelance work, company employment opportunities, team
                projects, or project discussions, send a message here. Messages
                are delivered to {contactEmail}.
              </p>
              <ul className="contact-links">
                <li>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </li>
                <li>
                  <a href="tel:09127878519">09127878519</a>
                </li>
                <li>
                  <a
                    href="https://github.com/mannix2000"
                    target="_blank"
                    rel="noreferrer">
                    github.com/mannix2000
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/emmanuel-magallanes-0918312a1/"
                    target="_blank"
                    rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="/documents/Emmanuel-Magallanes-Resume.pdf" download>
                    Download resume PDF
                  </a>
                </li>
              </ul>
            </div>

            <form className="card contact-form" onSubmit={handleContactSubmit}>
              <label className="field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactFieldChange}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactFieldChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="field">
                <span>Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactFieldChange}
                  placeholder="Project inquiry"
                />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactFieldChange}
                  placeholder="Tell me about your project, role, or collaboration idea."
                  rows={5}
                  required
                />
              </label>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSendingMessage}>
                {isSendingMessage ? "Sending..." : "Send message"}
              </button>
              {!isEmailJsConfigured ? (
                <p className="form-hint">
                  Set the EmailJS environment variables to activate email
                  delivery.
                </p>
              ) : null}
              {contactFeedback.message ? (
                <p className={`form-feedback is-${contactFeedback.tone}`}>
                  {contactFeedback.message}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} Emmanuel Magallanes. All rights
            reserved.
          </p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
