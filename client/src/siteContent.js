export const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/about" },
  { label: "Travel Blog", href: "/travel-blog" }
];

export const introParagraphs = [
  "I've always liked the process of learning, building, and exploring new things. A lot of the way I move through life comes from curiosity. I like following ideas, seeing where they lead, and turning them into something meaningful, whether that becomes a project, a story, or simply a lesson I carry with me.",
  "Projects, travel, random interests, and late-night ideas all shape who I am and what I create. They influence the way I think, the way I solve problems, and the way I see the world. I do not see these parts of my life as separate. They all connect in ways that continue to inspire me.",
  "This site is where I keep those pieces together. It is a collection of the things I have built, the places that inspired me, and the side quests that made the journey more interesting. It reflects what I am learning, what I care about, and the person I am becoming along the way."
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Memorial University of Newfoundland",
    location: "St. John's, NL",
    period: "Sept 2021 - Dec 2026",
    details: [
      "Relevant coursework: Data Structures & Algorithms, Object Oriented Programming, Data Preparation Techniques, Video Game Programming, Mobile App Development"
    ]
  }
];

export const technicalSkills = [
  {
    label: "Languages",
    items: ["Python", "C", "JavaScript", "TypeScript", "Java", "SQL"]
  },
  {
    label: "Frameworks / Technologies",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "REST APIs",
      "AWS",
      "Vercel"
    ]
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Prisma ORM"]
  },
  {
    label: "Libraries / Tools",
    items: ["Pandas", "Git"]
  },
  {
    label: "Administrative & Business",
    items: [
      "Market Research", "IP Valuation", "Customer Discovery", "Customer Service",
      "Data Entry", "File Organization", "Records Management", "Outreach",
      "Communication", "Time Management", "Problem Solving", "Microsoft Office"
    ]
  }
];

export const workExperience = [
  {
    role: "Social Media and Website Coordinator",
    organization: "Memorial University of Newfoundland, Secularism on the Move",
    location: "St. John's, NL",
    period: "Sept 2026 - Present",
    bullets: [
      "Support and update the project's bilingual website and social media channels to promote research activities, events, and project updates.",
      "Create and coordinate digital content for web and social media, ensuring information is clear, accurate, and consistent across platforms.",
      "Support online event promotion and collaborate with members of a national research team on digital outreach and project visibility."
    ]
  },
  {
    role: "Sales Representative",
    organization: "Crescent Gold & Diamond Centres",
    location: "St. John's, NL",
    period: "Sept 2026 - Present",
    bullets: [
      "Met sales targets by identifying customer needs, recommending suitable products, and clearly communicating product features, quality, and value.",
      "Built positive customer relationships, answered questions, and supported purchasing decisions through personalized service and strong product knowledge.",
      "Maintained showroom organization and collaborated with team members to support store operations and deliver a positive customer experience."
    ]
  },
  {
    role: "Market Research and Administrative Support Assistant",
    organization: "Memorial University of Newfoundland, Research Innovation Office",
    location: "St. John's, NL",
    period: "Jun 2026 - Aug 2026",
    bullets: [
      "Conducted market research, IP valuation, and customer discovery for university-developed technologies while handling sensitive and confidential information.",
      "Prepared reports summarizing market opportunities, competing solutions, commercialization potential, and prospective customers or industry partners.",
      "Supported office operations through data entry, document review, records management, vendor sourcing, and general administrative assistance."
    ]
  }
];

export const volunteeringExperience = [
  {
    role: "Volunteer Assistant",
    organization: "Blue Cross Hyderabad, Animal Birth Control Centre",
    location: "Hyderabad, India",
    period: "2020 - 2021",
    bullets: [
      "Supported data entry and field assistance for animal care operations while helping maintain organized records."
    ]
  },
  {
    role: "Radio Jockey",
    organization: "Narayana Group of Schools",
    location: "Hyderabad, India",
    period: "2016 - 2019",
    bullets: [
      "Hosted school radio segments and announcements, strengthening communication, confidence, and public-speaking skills."
    ]
  }
];

export const seedProjects = [
  {
    id: "fraud-alert-compliance-case-management",
    slug: "fraud-alert-compliance-case-management",
    title: "Fraud Alert and Compliance Case Management System",
    year: "",
    type: "Full-Stack Compliance Prototype",
    description:
      "Built a full-stack fraud monitoring and compliance prototype featuring transaction reviews, suspicious activity alerts, risk scoring, and case management workflows. Developed a Node.js and TypeScript REST API with JWT authentication, Prisma ORM, and PostgreSQL models for users, transactions, alerts, cases, and evidence notes. Deployed the backend using AWS Elastic Beanstalk and Amazon RDS for PostgreSQL, with a Next.js frontend deployed on Vercel.",
    stack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    linkUrl: "",
    displayOrder: 1
  },
  {
    id: "medqueue",
    slug: "medqueue",
    title: "MedQueue",
    year: "",
    type: "Healthcare Web App",
    description:
      "Built and deployed a MERN-stack healthcare prototype on Vercel to improve ER wait-time transparency for patients and hospital staff. The interface includes a patient portal, nurse dashboard, and operations view with a demo mode for the full end-to-end experience. It tracks queue status, estimated wait time, and return instructions in real time while supporting role-based workflows for patients and nurses.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Vercel"],
    linkUrl: "",
    displayOrder: 2
  }
];
