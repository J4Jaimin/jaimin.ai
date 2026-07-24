import type { LucideIcon } from "lucide-react";
import {
  Server,
  Network,
  Database,
  Layers,
  Workflow,
  Cloud,
  Sparkles,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Profile                                                                    */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Jaimin Rana",
  firstName: "Jaimin",
  lastName: "Rana",
  role: "AI Full-Stack Developer",
  location: "Ahmedabad, India",
  availability: "Available for select work",
  email: "jaiminrana1102@gmail.com",
  phone: "+91 95104 25401",
  resume: "/resume.pdf",
  // One powerful sentence — what he builds.
  tagline:
    "I build AI-powered full-stack products — agentic systems, RAG pipelines and LLM apps — backed by the same rigor I bring to backend and frontend engineering.",
  intro:
    "AI full-stack developer with experience across AI, backend and frontend engineering. I ship production systems in Node.js, Express, MongoDB and MySQL, and build generative-AI applications with LangChain, LangGraph, MCP and RAG. I care about clean architecture, tight latency budgets, and code that reads as well as it runs.",
  socials: {
    github: "https://github.com/J4Jaimin",
    linkedin: "https://www.linkedin.com/in/jaimin-r-56a756212",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Metrics — quiet proof, drawn only from the résumé                          */
/* -------------------------------------------------------------------------- */

export const metrics = [
  { value: "2.5+", label: "Years shipping production backends" },
  { value: "30%", label: "Avg. API throughput gains delivered" },
  { value: "500k+", label: "Records served at sub-200ms" },
  { value: "6+", label: "Systems designed end-to-end" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

export const services: Service[] = [
  {
    icon: Sparkles,
    title: "AI & Agentic Systems",
    description:
      "Generative-AI applications — multi-agent workflows, RAG pipelines and LLM integrations built with LangChain, LangGraph and MCP.",
    points: ["LangChain / LangGraph", "RAG & vector search", "Agentic AI / MCP"],
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description:
      "Scalable service architectures in Node.js & Express, built for throughput and clarity.",
    points: ["Node.js / Express", "System design", "Clean architecture"],
  },
  {
    icon: Network,
    title: "API Architecture",
    description:
      "RESTful APIs with pagination, filtering and lean payloads that stay a joy to consume.",
    points: ["REST design", "Pagination & filtering", "Versioned contracts"],
  },
  {
    icon: Database,
    title: "Databases & Performance",
    description:
      "Query and schema optimization across MongoDB and MySQL to cut latency where it counts.",
    points: ["MongoDB / MySQL", "Query tuning", "Schema design"],
  },
  {
    icon: Layers,
    title: "Distributed Caching",
    description:
      "Redis caching strategies for metadata, sessions and hot paths — measurable load relief.",
    points: ["Redis", "Cache invalidation", "Token stores"],
  },
  {
    icon: Workflow,
    title: "Automation & Pipelines",
    description:
      "Python, Pandas and Prefect workflows that quietly remove the manual, repetitive work.",
    points: ["Python / Pandas", "Prefect", "Data pipelines"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Containerized services and CI/CD on Docker and AWS for calm, repeatable deploys.",
    points: ["Docker", "AWS (S3, EC2, SQS)", "CI/CD"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects — mapped to real repositories where they exist publicly           */
/* -------------------------------------------------------------------------- */

export type Project = {
  name: string;
  category: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  github?: string;
  demo?: string;
  status?: string; // shown when there is no public link (client / internal work)
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Multi-Agent Pricer",
    category: "Agentic AI · Deal Intelligence",
    period: "2025",
    summary:
      "An autonomous agentic-AI framework that scans live RSS deal feeds, estimates true market value with an ensemble of a RAG frontier agent and a neural network, and pushes alerts on significant discounts.",
    highlights: [
      "Planning agent orchestrates a scan → price → decide → alert pipeline",
      "Ensemble pricing: RAG frontier agent (Chroma + MiniLM) blended with a DNN regressor",
      "Gradio dashboard with live logs, deals table & 3D t-SNE embedding view",
    ],
    stack: ["Python", "LangChain", "RAG", "Chroma", "Groq LLM", "Gradio"],
    github: "https://github.com/J4Jaimin/Multi-agent-pricer",
    featured: true,
  },
  {
    name: "ownCloud",
    category: "File Storage & Collaboration",
    period: "2025",
    summary:
      "A scalable file-storage platform with a flattened directory model and Redis-backed metadata lookups — architected for low-latency listing at scale.",
    highlights: [
      "Flattened directory structure cut listing latency ~35%",
      "Redis caching for metadata & directory reads",
      "Dockerized, deployed on Render + Vercel",
    ],
    stack: ["Node.js", "Redis", "Docker", "MongoDB"],
    github: "https://github.com/J4Jaimin/File-System",
    demo: "https://file-system-rho.vercel.app",
    featured: true,
  },
  {
    name: "HealthQuery",
    category: "Medical Search Engine",
    period: "2024 – 2025",
    summary:
      "A production-grade search engine returning results in sub-200ms across 500k+ health records, with a flexible schema for dynamic filters and advanced criteria.",
    highlights: [
      "Sub-200ms queries across 500k+ records",
      "Redis caching cut database load ~50%",
      "Schema designed for dynamic, advanced filters",
    ],
    stack: ["Node.js", "MongoDB", "Redis"],
    status: "Internal tool",
    featured: true,
  },
  {
    name: "own-git",
    category: "Version Control, from scratch",
    period: "2024",
    summary:
      "A step-by-step reimplementation of core Git internals in JavaScript — objects, hashing and the content-addressable store — built to understand the machinery underneath.",
    highlights: [
      "Content-addressable object store",
      "init, add, commit & log reimplemented",
      "A study in systems fundamentals",
    ],
    stack: ["JavaScript", "Node.js", "Filesystem"],
    github: "https://github.com/J4Jaimin/own-git",
  },
  {
    name: "Job Portal Backend",
    category: "API Platform",
    period: "2024",
    summary:
      "A full-fledged job-portal backend with authentication, filtering and pagination — the kind of query-flow work that keeps payloads small and responses quick.",
    highlights: [
      "Auth, roles & registration flows",
      "Filtering + pagination query engine",
      "Structured, maintainable REST APIs",
    ],
    stack: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/J4Jaimin/JOB_portal_backend",
  },
  {
    name: "Wayin",
    category: "Event Management Platform",
    period: "2024",
    summary:
      "Core backend for an event platform — event hosting, ticket booking and an end-to-end booking + cancellation workflow, plus optimized revenue reporting.",
    highlights: [
      "End-to-end booking & cancellation flow",
      "Booking failures reduced ~40%",
      "Revenue report generation ~55% faster",
    ],
    stack: ["Node.js", "Express", "MySQL"],
    status: "Client work",
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience                                                                 */
/* -------------------------------------------------------------------------- */

export type Experience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    role: "Freelance Backend Developer",
    company: "Fireflyz Tech",
    period: "Sep 2025 — Present",
    current: true,
    description:
      "Building and modernizing high-performance backend services, and integrating payments end-to-end.",
    achievements: [
      "Boosted API performance ~30% with refactored services",
      "Modernized legacy APIs & data pipelines, cutting inconsistencies ~40%",
      "Added pagination & optimized queries, trimming payloads ~60%",
      "Integrated Stripe with webhooks for secure transactions",
    ],
    tags: ["Node.js", "Express", "Stripe", "REST"],
  },
  {
    role: "Software Engineer",
    company: "AGS Health Pvt. Ltd.",
    location: "Ahmedabad",
    period: "Jul 2023 — Present",
    current: true,
    description:
      "Engineering scalable backend architectures and automation, with contributions across the stack.",
    achievements: [
      "Improved API throughput ~30% with scalable Node/Express design",
      "Cut average response latency ~25% via MongoDB/MySQL tuning",
      "Built Python automation workflows, reducing manual work ~50%",
      "Shipped CI/CD & Dockerized services; ran Prefect data pipelines",
    ],
    tags: ["Node.js", "Python", "Docker", "Prefect"],
  },
  {
    role: "B.E. Computer Engineering",
    company: "Sardar Vallabhbhai Patel Institute of Technology",
    location: "Vasad",
    period: "2019 — 2023",
    description:
      "Graduated with an 8.41 CGPA. Led a four-member team through end-to-end research, planning and technical execution.",
    achievements: [
      "CGPA 8.41 / 10",
      "Led a 4-member final-year project team",
      "Foundations in DSA, systems & databases",
    ],
    tags: ["Computer Engineering", "DSA", "Systems"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Recognition                                                                */
/* -------------------------------------------------------------------------- */

export const recognition = [
  {
    title: "RockStar Award",
    detail: "Outstanding performance in Software Engineering — AGS Health (Q1 2024)",
  },
  {
    title: "Full-Stack Web Development",
    detail: "MERN stack certification — Angela Yu (2023)",
  },
  {
    title: "Advanced Backend Development",
    detail: "Professional Node.js — Anurag Singh (2025)",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
