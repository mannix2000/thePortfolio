export type SkillGroup = { title: string; skills: string[] };

export type Experience = {
  company: string;
  role: string;
  period: string;
  tech: string;
  highlights: string[];
};

export type MediaItem = { title: string; description: string; image: string };

export type Reference = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

export type Content = {
  hero: {
    greeting: string;
    headlineTop: string;
    headlineAccent: string;
    lead: string;
  };
  about: string[];
  skillGroups: SkillGroup[];
  experience: Experience[];
  projects: MediaItem[];
  certificates: MediaItem[];
  references: Reference[];
  techStack: string[];
};

export const defaultContent: Content = {
  hero: {
    greeting: "Hi, I'm Emmanuel 👋",
    headlineTop: "Full-stack web & application developer.",
    headlineAccent: "Let's build together.",
    lead: "I help clients launch high-performing web products with clear UX and maintainable architecture, working across PHP, Laravel, JavaScript, React, Node.js, WordPress, Python, and database design.",
  },
  about: [
    "Emmanuel Magallanes focuses on responsive, user-friendly systems that balance speed, clarity, and maintainability. The portfolio spans parish, government, and utility-focused applications where reliability matters more than novelty.",
    "Beyond IT, my family's main source of income is agriculture. We raise pigs, cows, and chickens, and cultivate a variety of vegetables. That hands-on experience taught me hard work, responsibility, and sustainable practices, which shape my approach to problem-solving and teamwork.",
  ],
  skillGroups: [
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
  ],
  experience: [],
  projects: [
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
  ],
  certificates: [
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
  ],
  references: [
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
  ],
  techStack: [
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
  ],
};

/** Merge saved content over defaults so missing keys never crash the page. */
export function mergeContent(saved: Partial<Content> | null | undefined): Content {
  if (!saved) return defaultContent;
  return {
    ...defaultContent,
    ...saved,
    hero: { ...defaultContent.hero, ...saved.hero },
  };
}
