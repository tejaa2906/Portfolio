export const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/about" },
  { label: "Travel Blog", href: "/travel-blog" }
];

export const introParagraphs = [
  "I'm a Computer Science student at Memorial University of Newfoundland in St. John's, completing my Bachelor of Science in December 2026. My experience brings together technology, market research, sales, and community outreach.",
  "At Memorial's Research Innovation Office, I support business development by researching commercialization pathways, industry partnerships, licensing opportunities, and startup initiatives. I also coordinate website and social media content for Secularism on the Move and help students with front-desk services, 3D printing, and equipment loans at the Hatcher Office.",
  "At Crescent Gold & Diamond Centres, I help customers find jewellery that suits their needs and build relationships through personalized service and outreach. Across these roles, I bring technical skills, clear communication, and a practical approach to solving problems."
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Memorial University of Newfoundland",
    location: "St. John's, NL",
    period: "Sept 2021 - Dec 2026",
    details: []
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
    label: "Sales & Business Development",
    items: [
      "Market Research", "Salesforce CRM", "IP Valuation", "Customer Discovery",
      "Customer Service", "Outreach", "Communication", "Time Management",
      "Problem Solving", "Microsoft 365"
    ]
  }
];

export const workExperience = [
  {
    role: "Market Research Assistant",
    organization: "Memorial University of Newfoundland, Research Innovation Office",
    location: "St. John's, NL",
    period: "Jun 2026 - Present",
    bullets: [
      "Support the Business Development team by researching commercialization pathways, potential industry partnerships, licensing opportunities, and startup initiatives for university-developed innovations.",
      "Analyze innovation ecosystem resources, identify gaps in researcher support, and develop recommendations to improve commercialization and industry engagement opportunities.",
      "Research common questions around intellectual property and commercialization, and develop FAQ content, LinkedIn outreach materials, and awareness strategies to engage researchers and industry stakeholders."
    ]
  },
  {
    role: "Sales Representative",
    organization: "Crescent Gold & Diamond Centres",
    location: "St. John's, NL",
    period: "Jan 2023 - Aug 2023, Sept 2026 - Present",
    bullets: [
      "Meet sales targets by actively listening to customers, understanding their needs and preferences, and recommending jewellery that fits their occasion, budget, and expectations.",
      "Build trust and rapport with customers throughout the purchasing process, explaining product features, quality, and value clearly to help them make confident decisions.",
      "Conduct outbound calls to existing customers to communicate promotional offers, provide repair updates, and maintain strong customer relationships."
    ]
  },
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
    role: "Student Help Desk Assistant",
    organization: "Memorial University of Newfoundland, Hatcher Office",
    location: "St. John's, NL",
    period: "Sept 2026 - Present",
    bullets: [
      "Assist students with check-ins, student card printing, general inquiries, and front-desk support in a busy campus environment.",
      "Support 3D printing requests and equipment loans, including checkout, returns, basic troubleshooting, and accurate record keeping."
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
  },
  {
    role: "Fundraising Intern",
    organization: "Youth Empowerment Foundation",
    location: "India",
    period: "2020 - 2021",
    bullets: [
      "Supported fundraising and community outreach initiatives for an NGO focused on educating underprivileged children and encouraging youth-led social impact."
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
