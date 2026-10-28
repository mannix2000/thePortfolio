export type SkillGroup = { title: string; skills: string[] };

export type Experience = {
  company: string;
  role: string;
  period: string;
  tech: string;
  highlights: string[];
};

export type MediaItem = {
  title: string;
  description: string;
  image: string;
  tech?: string;
};

export type Education = { degree: string; school: string; period: string };

export type Reference = {
  name: string;
  role: string;
  email: string;
  phone: string;
  link?: string;
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
  education: Education[];
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
    lead: "Full-Stack Developer with 4 years of combined IT experience, designing and delivering scalable web-based systems and mobile apps with PHP Laravel, React, React Native, Node.js, Python, Supabase, and Firebase.",
  },
  about: [
    "Full-Stack Developer with 4 years of combined IT experience (Jan 2020 – Jan 2024), including 2 years of hands-on front-end and back-end web development (Jan 2022 – Jan 2024) and 2 years of computer technician work (Jan 2020 – Dec 2021).",
    "Strong foundation in network administration, system management, and user support. Experienced in designing and delivering scalable web-based systems, troubleshooting technical issues, and working with cross-functional teams to improve efficiency and security.",
    "Based in La Salvacion, Carmen, Bohol, Philippines. Languages: English (Advanced), Tagalog (Proficient), Bisaya (Advanced).",
  ],
  skillGroups: [
    {
      title: "Web Development",
      skills: [
        "HTML5, CSS3, JavaScript",
        "WordPress and Elementor",
        "React JS and Vite",
        "React Native (mobile apps)",
      ],
    },
    {
      title: "Backend & Frameworks",
      skills: [
        "PHP Laravel, Native PHP, CodeIgniter",
        "Node.js and Python",
        "Web-based information systems and process automation",
      ],
    },
    {
      title: "Databases & Live Hosting",
      skills: [
        "Databases and backend services: Supabase, Firebase, PostgreSQL",
        "Live hosting and deployment: Render, Hostinger, GoDaddy, Vercel",
      ],
    },
    {
      title: "Data Analysis",
      skills: [
        "R Programming, Python, and Orange for data analysis and data mining",
        "Analysis and recording of data, such as the BMI analysis in the NutriSynch capstone project",
      ],
    },
    {
      title: "Agentic AI",
      skills: [
        "Agentic AI and AI-assisted development workflows",
        "Using AI agents to speed up building, testing, and debugging software",
      ],
    },
    {
      title: "Systems & IT Support",
      skills: [
        "System administration and network administration",
        "Cloud computing",
        "Hardware diagnostics, software installation, system upgrades, network troubleshooting",
      ],
    },
    {
      title: "Core Engineering",
      skills: [
        "Object-oriented programming with PHP (Laravel), Python, and JavaScript/TypeScript",
        "Significant experience with JavaScript, CSS, and HTML",
        "Building and consuming REST APIs",
        "Design and implementation of object structures in relational databases (PostgreSQL, Supabase, MySQL)",
        "Building applications with front-end frameworks such as React",
        "Building and deploying software in the cloud (Vercel, Render, Supabase, Firebase)",
        "Mobile app development with React Native",
        "Ability to quickly learn and evaluate new technologies",
      ],
    },
    {
      title: "Other Skills",
      skills: ["Project management", "Real estate and vehicle appraisal"],
    },
    {
      title: "Tools",
      skills: ["VS Code", "Git", "GitHub", "Vercel"],
    },
  ],
  experience: [
    {
      company:
        "Department of Information and Communications Technology (DICT) — Tagbilaran Office, Bohol",
      role: "Web-Based System Developer",
      period: "Jan 2022 – Jan 2024 (2 years)",
      tech: "Project: DICT Projects Information System · Tech: PHP (Native)",
      highlights: [
        "Developed and maintained a web-based Project Information System for efficient project tracking and management",
        "Contributed to the design, implementation, and optimization of system features to meet user and organizational needs",
        "Ensured seamless integration with the existing IT infrastructure",
        "Provided technical support to system users",
      ],
    },
    {
      company: "Computer Republic — CPG North Ave., Tagbilaran City, Bohol",
      role: "Computer Technician",
      period: "Jan 2020 – Dec 2021 (2 years)",
      tech: "",
      highlights: [
        "Provided technical support and repair services, including hardware diagnostics, software installation, system upgrades, and network troubleshooting",
        "Assisted customers with a wide range of technical issues, ensuring timely and effective solutions",
        "Maintained high standards of service quality and customer satisfaction while managing day-to-day technical operations",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      school:
        "Bohol Island State University, Balilihan Campus — Magsija, Balilihan, Bohol",
      period: "2021 – 2024",
    },
    {
      degree: "Computer System Servicing",
      school: "Bilar National High School — Yanaya, Bilar, Bohol",
      period: "2018 – 2019",
    },
  ],
  projects: [
    {
      title: "CMC SAO Attendance",
      tech: "React JS, Vite, Node.js",
      description:
        "Attendance system for school flag ceremonies, events, and meetings.",
      image: "",
    },
    {
      title: "NutriSynch",
      tech: "Python, React JS",
      description:
        "MIS capstone project that analyzes and records the BMI of students at La Salvacion Elementary School, Carmen, Bohol, Philippines.",
      image: "",
    },
    {
      title: "DTR MNNX",
      tech: "React Native",
      description:
        "Personal daily time record (DTR) mobile app for logging immersion and internship training hours, also used to record work hours as a college MIS instructor.",
      image: "",
    },
    {
      title: "Baang Parish Management System",
      tech: "PHP (Native)",
      description:
        "Led development and automation of a parish management system covering member registration, sacrament scheduling, donation tracking, and record management, with user-friendly interfaces, secure backend workflows, and room to scale.",
      image: "/media/baang_parish_system.png",
    },
    {
      title: "DICT Projects Information System",
      tech: "PHP (Native) · Jan 2022 – Jan 2024",
      description:
        "Built and automated a system to centralize project data, timelines, and documentation, enabling efficient project tracking, improved data accuracy, and real-time reporting for better decision-making.",
      image: "/media/dict_information_system.png",
    },
  ],
  certificates: [
    {
      title: "Computer System Servicing NC II",
      description: "TESDA Bohol",
      image: "",
    },
    {
      title: "Python Essentials Training",
      description: "DICT Tagbilaran City",
      image: "",
    },
    {
      title: "Cyber Hygiene Awareness Seminar",
      description: "DICT Tagbilaran City, Bohol",
      image: "",
    },
    {
      title: "Service Award (Band Member)",
      description: "BISU Balilihan Campus",
      image: "",
    },
    {
      title: "Computer Hardware Basics",
      description: "Cisco Networking Academy (online)",
      image: "/media/computer_hardware.png",
    },
    {
      title: "Networking and Basic Troubleshooting",
      description: "Cisco Networking Academy (online)",
      image: "",
    },
    {
      title: "Data Analytics Essentials",
      description: "Cisco Networking Academy (online)",
      image: "/media/data_analytics.png",
    },
    {
      title: "Cyber Threat Management",
      description: "Cisco Networking Academy (online)",
      image: "/media/cyber_threat_management.png",
    },
  ],
  references: [
    {
      name: "John Paul Tapuyo",
      role: "AI Systems & Automation Engineer | Senior Flutter & Full-Stack Developer",
      email: "johnpaultapuyo@gmail.com",
      phone: "+63 960 434 8306",
      link: "https://johntaps.vercel.app/",
    },
    {
      name: "Jay Mar Masibay",
      role: "Instructor / Project Officer / Trainor",
      email: "jaymarmasibay@gmail.com",
      phone: "+63 927 863 5200",
    },
    {
      name: "Engr. Jimmy Ratilla",
      role: "Free Wi-Fi 4 All Project Officer, DICT",
      email: "",
      phone: "",
    },
    {
      name: "Julio Lopez",
      role: "Contractor / Developer / CEO",
      email: "juliolopez241997@gmail.com",
      phone: "+63 907 512 1814",
    },
    {
      name: "Benjie Lenteria",
      role: "Professor / Supervisor / Co-Developer",
      email: "hawkmanlentrix@gmail.com",
      phone: "+63 917 303 5716",
    },
    {
      name: "Jeffry Abaniel",
      role: "Senior Flutter Developer",
      email: "JeffryAbaniel@gmail.com",
      phone: "+63 948 284 5780",
    },
  ],
  techStack: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Vite",
    "React Native",
    "WordPress",
    "Elementor",
    "PHP",
    "Laravel",
    "CodeIgniter",
    "Node.js",
    "Python",
    "R",
    "Supabase",
    "Firebase",
    "PostgreSQL",
    "Vercel",
    "Git",
    "GitHub",
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
