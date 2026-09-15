import { ProfileData } from '../types/portfolio';

export const initialPortfolioData: ProfileData = {
  name: "Sachin",
  title: "MERN Full Stack Developer",
  tagline: "Enthusiastic Fresher & Full Stack Web Developer specializing in MongoDB, Express.js, React.js, and Node.js. Dedicated to crafting responsive frontends and secure, performant RESTful backends.",
  typingRoles: [
    "MERN Stack Developer",
    "React.js Developer",
    "Node.js & Express Engineer",
    "Full Stack Web Developer",
    "Fresher (0 Yrs Exp)"
  ],
  bio: [
    "I am an ambitious Computer Science graduate with 0 years of formal corporate experience, but deep hands-on proficiency in modern full-stack web development using the MERN stack (MongoDB, Express.js, React.js, Node.js).",
    "I have built and deployed multiple end-to-end web applications featuring authentication (JWT & cookies), state management (Redux Toolkit), real-time communication (Socket.io), payment integration, and RESTful API architecture.",
    "With a solid grasp of Data Structures, Algorithms, clean code principles, and responsive UI design, I am eager to kickstart my career and deliver value from Day 1 as a Junior / Entry-Level Full Stack Developer."
  ],
  location: "Open to Relocation & Remote",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  resumeUrl: "#",
  email: "sachin26x7@gmail.com",
  adminPin: "1337", // Secret PIN to unlock live customization
  
  stats: [
    {
      id: "stat-1",
      label: "Experience",
      value: "Fresher",
      description: "0 Yrs (Ready to contribute)"
    },
    {
      id: "stat-2",
      label: "Full Stack Projects",
      value: "10+",
      description: "Deployed MERN & React Apps"
    },
    {
      id: "stat-3",
      label: "DSA Problems Solved",
      value: "250+",
      description: "LeetCode & HackerRank"
    },
    {
      id: "stat-4",
      label: "Primary Tech Stack",
      value: "MERN",
      description: "Mongo, Express, React, Node"
    }
  ],

  socials: [
    {
      id: "soc-1",
      name: "GitHub",
      url: "https://github.com",
      icon: "github"
    },
    {
      id: "soc-2",
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: "linkedin"
    },
    {
      id: "soc-3",
      name: "Email",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=sachin26x7@gmail.com",
      icon: "mail"
    }
  ],

  skills: [
    {
      id: "cat-frontend",
      category: "Frontend Development",
      description: "Creating responsive, accessible, and dynamic user interfaces",
      skills: [
        { name: "React.js", level: "Advanced" },
        { name: "JavaScript (ES6+)", level: "Advanced" },
        { name: "HTML5 & CSS3", level: "Expert" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Redux Toolkit", level: "Proficient" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "Responsive UI", level: "Advanced" }
      ]
    },
    {
      id: "cat-backend",
      category: "Backend & APIs",
      description: "Building resilient server architectures, routing, and middleware",
      skills: [
        { name: "Node.js", level: "Advanced" },
        { name: "Express.js", level: "Advanced" },
        { name: "RESTful APIs", level: "Advanced" },
        { name: "JWT Authentication", level: "Proficient" },
        { name: "Socket.io (Realtime)", level: "Intermediate" },
        { name: "MVC Architecture", level: "Proficient" },
        { name: "API Security & CORS", level: "Proficient" }
      ]
    },
    {
      id: "cat-database",
      category: "Database & Storage",
      description: "Data modeling, schema design, and cloud database administration",
      skills: [
        { name: "MongoDB", level: "Advanced" },
        { name: "Mongoose ODM", level: "Advanced" },
        { name: "Aggregation Pipelines", level: "Proficient" },
        { name: "MongoDB Atlas", level: "Proficient" },
        { name: "SQL Basics (MySQL)", level: "Intermediate" },
        { name: "Cloudinary (Media)", level: "Proficient" }
      ]
    },
    {
      id: "cat-tools-devops",
      category: "Tools & Workflow",
      description: "Development environment, version control, and cloud deployments",
      skills: [
        { name: "Git & GitHub", level: "Advanced" },
        { name: "Postman (API Testing)", level: "Advanced" },
        { name: "Vercel & Render", level: "Proficient" },
        { name: "VS Code & Chrome DevTools", level: "Expert" },
        { name: "Data Structures & Algos", level: "Proficient" },
        { name: "Linux / Terminal", level: "Intermediate" }
      ]
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "ShopSphere: Full-Stack MERN E-Commerce Platform",
      category: "Web",
      description: "Comprehensive e-commerce application with product search & filtering, Redux Toolkit shopping cart, secure JWT authentication, admin product management, and PayPal payment integration.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux Toolkit", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "proj-2",
      title: "DevConnect: Developer Social & Collaboration Network",
      category: "Web",
      description: "Social networking app enabling developers to create profiles, share project posts, comment, like, and chat in real time using WebSockets with Socket.io and Cloudinary image uploads.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Cloudinary"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "proj-3",
      title: "TaskFlow: Collaborative Project & Kanban Board",
      category: "Web",
      description: "Trello-inspired task and productivity organizer with drag-and-drop task columns, sub-tasks, priority tags, team member assignments, and deadline notifications.",
      tags: ["React.js", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Mongoose"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: false
    },
    {
      id: "proj-4",
      title: "ChatterBox: Real-Time Instant Messaging App",
      category: "Automation",
      description: "Fast messaging platform with instant private and room chat rooms, online status indicators, typing indicators, and message history stored in MongoDB Atlas.",
      tags: ["React.js", "Socket.io", "Express.js", "Node.js", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "proj-5",
      title: "FoodExpress: Food Ordering & Restaurant Web App",
      category: "Web",
      description: "Full-stack food ordering platform featuring restaurant menu browsing, dynamic cart price calculation, order status tracking, and admin dashboard.",
      tags: ["MERN Stack", "JWT Auth", "Context API", "Stripe API", "CSS Modules"],
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: false
    },
    {
      id: "proj-6",
      title: "DevPortfolio: Interactive Developer Showcase",
      category: "Web",
      description: "Single-page responsive portfolio featuring dark/light mode toggle, dynamic category filtering, interactive Owner Studio, and mobile-first design.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "Vite"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: false
    }
  ],

  experiences: [
    {
      id: "exp-1",
      role: "Full Stack Web Developer (Self-Directed & Academic Projects)",
      organization: "Personal Projects & Open Source",
      location: "Remote",
      period: "2023 — Present",
      type: "work",
      highlights: [
        "Architected and deployed 10+ full-stack MERN web applications using MongoDB, Express.js, React.js, and Node.js.",
        "Implemented secure user authentication with JSON Web Tokens (JWT), password hashing (bcrypt), and role-based route protection.",
        "Designed responsive mobile-first UI components with Tailwind CSS and integrated third-party APIs (Stripe, Cloudinary, PayPal)."
      ]
    },
    {
      id: "exp-2",
      role: "Web Development Virtual Intern / Training",
      organization: "MERN Stack Intensive Training",
      location: "Online",
      period: "2023 — 2024",
      type: "work",
      highlights: [
        "Mastered advanced React concepts: Custom Hooks, Context API, Redux Toolkit, and performance optimization.",
        "Created RESTful endpoints with Express.js, validated request bodies, and designed relational schemas with Mongoose ODM.",
        "Utilized Git & GitHub for feature-branch workflows, pull requests, and automated deployments to Vercel and Render."
      ]
    },
    {
      id: "exp-3",
      role: "Bachelor of Technology in Computer Science (B.Tech)",
      organization: "University / Institute of Technology",
      location: "Graduated: 2024",
      period: "2020 — 2024",
      type: "education",
      highlights: [
        "Relevant Coursework: Web Technologies, Database Management Systems (DBMS), Object-Oriented Programming, Computer Networks, Operating Systems.",
        "Final Year Project: Full-Stack MERN E-Commerce Platform with real-time analytics and payment integration (Awarded Grade A).",
        "Active contributor to college tech clubs; solved 250+ algorithmic coding problems on LeetCode."
      ]
    }
  ]
};
