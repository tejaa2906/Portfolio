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
      "Relevant coursework: Data Structures & Algorithms, Object Oriented Programming, Data Preparation Techniques"
    ]
  }
];

export const technicalSkills = [
  {
    label: "Languages",
    items: ["JavaScript", "Python", "Java", "C"]
  },
  {
    label: "Frameworks / Technologies",
    items: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "MERN Stack",
      "Vercel"
    ]
  },
  {
    label: "Databases",
    items: ["SQL", "MongoDB"]
  },
  {
    label: "Libraries / Tools",
    items: ["Pandas", "Git"]
  }
];

export const workExperience = [
  {
    role: "Market Research and Administrative Support Assistant",
    organization: "Memorial University of Newfoundland, Research Innovation Office",
    location: "St. John's, NL",
    period: "Jan 2026 - Present",
    bullets: [
      "Conduct market research, IP valuation, and customer discovery for university-developed technologies while handling sensitive and confidential information.",
      "Prepare reports summarizing market opportunities, competing solutions, commercialization potential, and prospective customers or industry partners.",
      "Support office operations through data entry, document review, records management, vendor sourcing, and general administrative assistance."
    ]
  },
  {
    role: "Sales Representative",
    organization: "Charm Diamond Centres",
    location: "St. John's, NL",
    period: "Jan 2023 - Jul 2023",
    bullets: [
      "Met sales targets by identifying customer needs, recommending suitable products, and clearly communicating product features, quality, and value.",
      "Built positive customer relationships, answered questions, and supported purchasing decisions through personalized service and strong product knowledge.",
      "Maintained showroom organization and collaborated with team members to support store operations and deliver a positive customer experience."
    ]
  },
  {
    role: "Hostess",
    organization: "Mallard Cottage",
    location: "St. John's, NL",
    period: "Jul 2024 - Dec 2024",
    bullets: [
      "Managed guest greetings, seating, and waitlist coordination in a fast-paced restaurant environment over a 6-month front-of-house role.",
      "Collaborated with servers and kitchen staff through daily shifts to support efficient guest flow and a welcoming dining experience."
    ]
  },
  {
    role: "Technical Operations & Website Support",
    organization: "Gimbal House",
    location: "Hyderabad, India",
    period: "Feb 2020 - Apr 2022",
    bullets: [
      "Maintained and updated the company website to support business visibility and customer communication.",
      "Prepared, tested, and troubleshot equipment before dispatch, supporting reliable day-to-day operations."
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
      "Contributed over a 2-year period by supporting 2 core areas: data entry and field assistance for animal care operations.",
      "Assisted the veterinary doctor with on-field support involving dogs and other animals while helping maintain organized care records."
    ]
  },
  {
    role: "Radio Jockey",
    organization: "Narayana Group of Schools",
    location: "Hyderabad, India",
    period: "2016 - 2019",
    bullets: [
      "Hosted school radio programming over a 4-year period, keeping students engaged and entertained during daily breaks.",
      "Presented daily trivia and announcements over the radio, strengthening communication, confidence, and public speaking skills."
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
