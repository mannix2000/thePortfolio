import emailjs from "@emailjs/browser";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import "./App.css";

type PageKey = "about" | "projects" | "certificates" | "references" | "contact";

const skillGroups = [
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

const navigationItems: Array<{ key: PageKey; label: string }> = [
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "certificates", label: "Certificates" },
  { key: "references", label: "References" },
  { key: "contact", label: "Contact" },
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

function isPageKey(value: string): value is PageKey {
  return navigationItems.some((item) => item.key === value);
}

function getInitialPage(): PageKey {
  if (typeof window === "undefined") {
    return "about";
  }

  const hashPage = window.location.hash.replace("#", "");
  return isPageKey(hashPage) ? hashPage : "about";
}

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [activePage, setActivePage] = useState<PageKey>(getInitialPage);
  const [contactForm, setContactForm] = useState(emptyContactForm);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [contactFeedback, setContactFeedback] = useState<{
    tone: "idle" | "success" | "error";
    message: string;
  }>({ tone: "idle", message: "" });

  const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean);

  useEffect(() => {
    const syncPageWithHash = () => {
      const hashPage = window.location.hash.replace("#", "");

      if (isPageKey(hashPage)) {
        setActivePage(hashPage);
      }
    };

    window.addEventListener("hashchange", syncPageWithHash);
    return () => window.removeEventListener("hashchange", syncPageWithHash);
  }, []);

  const showPage = (page: PageKey) => {
    setActivePage(page);
    window.location.hash = page;
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
          "Message could not be sent right now. Please try again or use the direct email link below.",
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  let pageContent: ReactNode;

  switch (activePage) {
    case "projects":
      pageContent = (
        <section className="stack" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="section-kicker">Projects</p>
            <h3 id="projects-title">Selected work</h3>
          </div>
          <div className="card-grid three-up">
            {projects.map((project) => (
              <article className="media-card" key={project.title}>
                <img src={project.image} alt={project.title} />
                <div className="media-copy">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
      break;
    case "certificates":
      pageContent = (
        <section className="stack" aria-labelledby="certificates-title">
          <div className="section-heading">
            <p className="section-kicker">Certificates</p>
            <h3 id="certificates-title">Training and credentials</h3>
          </div>
          <div className="card-grid three-up">
            {certificates.map((certificate) => (
              <article className="media-card" key={certificate.title}>
                <img src={certificate.image} alt={certificate.title} />
                <div className="media-copy">
                  <h4>{certificate.title}</h4>
                  <p>{certificate.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
      break;
    case "references":
      pageContent = (
        <section className="stack" aria-labelledby="references-title">
          <div className="section-heading">
            <p className="section-kicker">References</p>
            <h3 id="references-title">Professional contacts</h3>
          </div>
          <div className="card-grid two-up">
            {references.map((reference) => (
              <article className="reference-card" key={reference.name}>
                <h4>{reference.name}</h4>
                <p className="reference-role">{reference.role}</p>
                <p>{reference.email}</p>
                <p>{reference.phone}</p>
              </article>
            ))}
          </div>
        </section>
      );
      break;
    case "contact":
      pageContent = (
        <section className="contact-panel" aria-labelledby="contact-title">
          <div className="contact-copy">
            <div>
              <p className="section-kicker">Contact</p>
              <h3 id="contact-title">Let’s build something solid.</h3>
              <p>
                For freelance work, company employment opportunities, team
                projects, or project discussions, send a message here.
              </p>
              <p className="contact-note">
                Messages from this form are delivered to {contactEmail}.
              </p>
            </div>

            <div className="contact-actions">
              <a href="/documents/Emmanuel-Magallanes-Resume.pdf" download>
                Download resume PDF
              </a>
              <a href="/documents/Emmanuel-Magallanes-Portfolio.pdf" download>
                Download portfolio PDF
              </a>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href="tel:09127878519">09127878519</a>
              <a
                href="https://github.com/mannix2000"
                target="_blank"
                rel="noreferrer">
                github.com/mannix2000
              </a>
              <a
                href="https://www.facebook.com/in/emmanuel-magallanes-0918312a1/"
                target="_blank"
                rel="noreferrer">
                Facebook profile
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label className="field-group">
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

            <label className="field-group">
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

            <label className="field-group">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactFieldChange}
                placeholder="Project inquiry"
              />
            </label>

            <label className="field-group field-group-full">
              <span>Message</span>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactFieldChange}
                placeholder="Tell me about your project, role, or collaboration idea."
                rows={6}
                required
              />
            </label>

            <div className="contact-form-footer">
              <button
                type="submit"
                className="action-primary contact-submit"
                disabled={isSendingMessage}>
                {isSendingMessage ? "Sending..." : "Send message"}
              </button>
              <p className="contact-form-hint">
                {isEmailJsConfigured
                  ? "Replies will be sent to your Gmail inbox."
                  : "Set the EmailJS environment variables to activate email delivery."}
              </p>
            </div>

            {contactFeedback.message ? (
              <p className={`contact-feedback is-${contactFeedback.tone}`}>
                {contactFeedback.message}
              </p>
            ) : null}
          </form>
        </section>
      );
      break;
    case "about":
    default:
      pageContent = (
        <>
          <section className="hero-panel" aria-labelledby="about-hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                Full-Stack Web Developer / Freelance / Company / Team Projects
              </p>
              <h2 id="about-hero-title">
                I help clients launch high-performing web products with clear UX and maintainable architecture. I also offer free additional services on certain projects to help clients maximize their budget and achieve better outcomes.

              </h2>
              <p className="hero-text">
                I work across PHP, Laravel, JavaScript, React, Node.js,
                WordPress, Python, and database design to turn ideas into
                usable, scalable digital products.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="action-primary"
                  onClick={() => showPage("projects")}>
                  View Projects
                </button>
                <a
                  className="action-secondary"
                  href="/documents/Emmanuel-Magallanes-Resume.pdf"
                  download
                  target="_blank"
                  rel="noreferrer">
                  Download Resume
                </a>
                <a
                  className="action-secondary"
                  href="/documents/Emmanuel-Magallanes-Portfolio.pdf"
                  download
                  target="_blank"
                  rel="noreferrer">
                  Download PDF Portfolio
                </a>
              </div>

              <div className="contact-grid">
                <span>Email: {contactEmail}</span>
                <span>Phone: 09127878519</span>
                <a
                  href="https://github.com/mannix2000"
                  target="_blank"
                  rel="noreferrer">
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/emmanuel-magallanes-0918312a1/"
                  target="_blank"
                  rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="portrait-frame">
                <img src="/media/profile.jpg" alt="Emmanuel Magallanes" />
              </div>
              <div className="status-card">
                <span>Status</span>
                <strong>
                  Available for freelance, company, and team projects
                </strong>
              </div>
            </div>
          </section>

          <section className="content-grid" aria-label="About details">
            <article className="panel panel-large">
              <p className="section-kicker">About</p>
              <h3>Delivery-first development with practical outcomes.</h3>
              <p>
                Emmanuel Magallanes focuses on responsive, user-friendly systems
                that balance speed, clarity, and maintainability. The portfolio
                spans parish, government, and utility-focused applications where
                reliability matters more than novelty.
              </p>
            </article>

            <article className="panel">
              <p className="section-kicker">Agricultural Experience</p>
              <h3>Hands-on farming and livestock management</h3>
              <p>
                In addition to IT expertise, my family’s main source of income
                is agriculture. We raise pigs, cows, and chickens, and cultivate
                a variety of vegetables. This hands-on experience in farming and
                livestock management has taught me the value of hard work,
                responsibility, and sustainable practices—skills that complement
                my technical background and shape my approach to problem-solving
                and teamwork.
              </p>
            </article>

            <article className="panel">
              <p className="section-kicker">Technical Skills</p>
              <div className="skill-groups">
                {skillGroups.map((group) => (
                  <section className="skill-group" key={group.title}>
                    <h4>{group.title}</h4>
                    <div className="skill-list">
                      {group.skills.map((skill) => (
                        <span className="skill-pill" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </section>
        </>
      );
      break;
  }

  return (
    <div className={`app-shell ${isInitialized ? "is-active" : ""}`}>
      <div className="atmosphere" aria-hidden="true">
        <span className="orb orb-a"></span>
        <span className="orb orb-b"></span>
        <span className="orb orb-c"></span>
        <span className="hacker-scene">
          <span className="hacker-monitor"></span>
          <span className="hacker-code"></span>
          <span className="hacker-figure">
            <span className="hacker-hood"></span>
            <span className="hacker-face"></span>
            <span className="hacker-eye"></span>
            <span className="hacker-body"></span>
          </span>
        </span>
        <span className="grid-fade"></span>
      </div>

      {!isInitialized ? (
        <div className="intro-overlay">
          <button
            type="button"
            className="profile-trigger"
            onClick={() => setIsInitialized(true)}>
            <span className="profile-ring"></span>
            <img src="/media/profile.jpg" alt="Emmanuel Magallanes" />
          </button>
          <div className="intro-copy">
            <p className="eyebrow">Click profile to initialize</p>
            <h1>Emmanuel L. Magallanes</h1>
            <p>
              Full-stack developer open to freelance work, company employment,
              and team-based web projects for business and institutional work.
            </p>
          </div>
        </div>
      ) : null}

      <header className="topbar">
        <a
          className="brand"
          href="#about"
          onClick={(event) => {
            event.preventDefault();
            showPage("about");
          }}>
          <span className="brand-mark">ELM</span>
          <span className="brand-copy">
            <strong>Emmanuel Magallanes</strong>
            <small>Full-Stack Web Developer</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Page navigation">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={activePage === item.key ? "is-current" : undefined}
              aria-current={activePage === item.key ? "page" : undefined}
              onClick={() => showPage(item.key)}>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="page" key={activePage}>
        <div className="page-shell">{pageContent}</div>
      </main>
    </div>
  );
}

export default App;
