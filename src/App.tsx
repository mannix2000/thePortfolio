import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Admin from "./Admin";
import { defaultContent, mergeContent, type Content } from "./content";
import { CONTENT_ROW_ID, CONTENT_TABLE, supabase } from "./supabase";
import "./App.css";

type PageKey =
  | "home"
  | "about"
  | "projects"
  | "certificates"
  | "references"
  | "contact";

const navigationItems: Array<{ key: PageKey; label: string }> = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "certificates", label: "Certificates" },
  { key: "references", label: "References" },
  { key: "contact", label: "Contact" },
];

function getPageFromHash(): PageKey {
  const hash = window.location.hash.replace("#", "");
  return navigationItems.some((item) => item.key === hash)
    ? (hash as PageKey)
    : "home";
}

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

const contactEmail = "magallanesmannix2000@gmail.com";

const emptyContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// Public by design: Web3Forms keys only allow sending to the owner's inbox.
const web3FormsAccessKey = "b317c219-232c-4de8-96aa-3c9c12b3199e";

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

function App() {
  const [content, setContent] = useState<Content>(defaultContent);
  const [page, setPage] = useState<PageKey>(getPageFromHash);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const syncPage = () => {
      setPage(getPageFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);
  const footerClicks = useRef({ count: 0, last: 0 });
  const [contactForm, setContactForm] = useState(emptyContactForm);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [contactFeedback, setContactFeedback] = useState<{
    tone: "idle" | "success" | "error";
    message: string;
  }>({ tone: "idle", message: "" });

  const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean);

  const { hero, about, skillGroups, experience, projects, certificates } =
    content;
  const { references, techStack } = content;

  const stats = [
    { value: String(projects.length), label: "Featured projects" },
    { value: String(certificates.length), label: "Certificates" },
    { value: String(techStack.length), label: "Technologies" },
  ];

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from(CONTENT_TABLE)
      .select("data")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.data) setContent(mergeContent(data.data as Partial<Content>));
      });
  }, []);

  // Hidden entry: click the copyright text 5 times quickly.
  const handleSecretClick = () => {
    const now = Date.now();
    const state = footerClicks.current;
    state.count = now - state.last < 1500 ? state.count + 1 : 1;
    state.last = now;
    if (state.count >= 5) {
      state.count = 0;
      setAdminOpen(true);
    }
  };

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

    setIsSendingMessage(true);
    setContactFeedback({ tone: "idle", message: "" });

    try {
      if (isEmailJsConfigured) {
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
      } else {
        // Web3Forms forwards the message to the Gmail tied to this access key.
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsAccessKey,
            subject: `New portfolio message: ${contactForm.subject || "Portfolio inquiry"}`,
            from_name: "Emmanuel Magallanes Portfolio",
            replyto: contactForm.email,
            name: contactForm.name,
            email: contactForm.email,
            message: contactForm.message,
          }),
        });
        const result = await response.json().catch(() => null);
        if (!response.ok || String(result?.success) !== "true") {
          throw new Error(result?.message ?? "Send failed");
        }
      }

      setContactForm(emptyContactForm);
      setContactFeedback({
        tone: "success",
        message:
          "Message sent successfully. I will receive it in my Gmail inbox.",
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "";
      setContactFeedback({
        tone: "error",
        message: /activat/i.test(reason)
          ? "The contact form is waiting for activation. Please use the direct email link for now."
          : "Message could not be sent right now. Please try again or use the direct email link.",
      });
      console.error("Contact form error:", reason);
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="site">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#home">
            <span className="brand-mark">EM</span>
            <span className="brand-name">Emmanuel Magallanes</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={page === item.key ? "is-current" : undefined}
                aria-current={page === item.key ? "page" : undefined}>
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

      <main id="top" key={page}>
        {page === "home" ? (<>
        <section className="container hero">
          <div className="hero-copy">
            <p className="greeting">{hero.greeting}</p>
            <h1>
              {hero.headlineTop}
              <br />
              <span className="accent">{hero.headlineAccent}</span>
            </h1>
            <p className="lead">{hero.lead}</p>
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
              <p className="profile-role">Full-Stack Web &amp; Application Developer</p>
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
        </>) : null}

        {page === "about" ? (<>
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
              {about
                .filter((paragraph) => paragraph.trim())
                .map((paragraph, index) => (
                  <p className="body-text" key={index}>
                    {paragraph}
                  </p>
                ))}
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

        {experience.length > 0 ? (
          <section id="experience" className="container section">
            <p className="kicker">Experience</p>
            <h2>Where I've worked.</h2>
            <ol className="timeline">
              {experience.map((job, index) => (
                <li key={`${job.company}-${index}`}>
                  <span className="timeline-dot"></span>
                  <p className="timeline-period">{job.period}</p>
                  <h3>
                    {job.role} · {job.company}
                  </h3>
                  {job.tech ? <p className="timeline-tech">{job.tech}</p> : null}
                  <ul className="timeline-list">
                    {job.highlights
                      .filter((item) => item.trim())
                      .map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

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
        </>) : null}

        {page === "projects" ? (<>
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

        </>) : null}

        {page === "certificates" ? (<>
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

        </>) : null}

        {page === "references" ? (<>
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

        </>) : null}

        {page === "contact" ? (<>
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
              {contactFeedback.message ? (
                <p className={`form-feedback is-${contactFeedback.tone}`}>
                  {contactFeedback.message}
                </p>
              ) : null}
            </form>
          </div>
        </section>
        </>) : null}
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p onClick={handleSecretClick}>
            © {new Date().getFullYear()} Emmanuel Magallanes. All rights
            reserved.
          </p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </footer>

      {adminOpen ? (
        <Admin
          content={content}
          onChange={setContent}
          onClose={() => setAdminOpen(false)}
        />
      ) : null}
    </div>
  );
}

export default App;
