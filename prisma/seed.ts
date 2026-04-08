import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPassword = await hash("FameWorld123$", 12);
  await prisma.user.upsert({
    where: { email: "munuprestoncapital@gmail.com" },
    update: {},
    create: {
      email: "munuprestoncapital@gmail.com",
      hashedPassword,
      name: "Preston Munu",
    },
  });

  // Metrics - delete and recreate to ensure idempotency and prevent duplicates
  await prisma.metric.deleteMany({});

  await prisma.metric.createMany({
    data: [
      {
        label: "Projects Shipped",
        value: "12",
        suffix: "+",
        sortOrder: 0,
        visible: true,
      },
      {
        label: "Years Experience",
        value: "4",
        suffix: "+",
        sortOrder: 1,
        visible: true,
      },
      {
        label: "Technologies Used",
        value: "20",
        suffix: "+",
        sortOrder: 2,
        visible: true,
      },
      {
        label: "Lines of Code",
        value: "50k",
        suffix: "+",
        sortOrder: 3,
        visible: true,
      },
    ],
  });

  // Projects — delete old ones and replace with current projects
  await prisma.project.deleteMany({});

  await prisma.project.createMany({
    data: [
      {
        slug: "pfis",
        title: "PFIS — Personal Finance Intelligence System",
        summary:
          "A financial intelligence engine that converts raw mobile money data into behavioral insight and decision-level financial control.",
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Node.js"],
        timeline: "2024 - Present",
        role: "Solo Developer",
        featured: true,
        published: true,
        sortOrder: 0,
        problem:
          "People don't lack financial data — they lack awareness, discipline, and feedback loops. Mobile money statements sit unread while spending habits go unchecked.",
        constraints:
          "Must handle real MTN and Airtel statement formats. Financial calculations must be accurate. Insights must be actionable, not just informational.",
        architecture:
          "Core pipeline: raw mobile money statements → normalized transaction data → categorized spending → behavioral analysis. Two engines: The Auditor (detects bad patterns, flags inefficiencies) and The Strategist (goal feasibility, savings optimization, outcome projection).",
        dataModel:
          "Transactions normalized from raw CSV/PDF statements. Categories, tags, and behavioral scores computed on ingestion. Goals and constraints stored separately for the planning engine.",
        keyDecisions:
          "Chose behavioral intelligence over simple tracking — the goal is decision support, not data display. Separated audit from planning into two distinct engines to keep concerns clean.",
        improvements:
          "Add bank statement parsing alongside mobile money. Build a mobile-first interface. Add subscription billing for SaaS distribution.",
        roadmap:
          "Phase 1: Statement parsing and normalization. Phase 2: Behavioral intelligence engines. Phase 3: SaaS packaging and distribution.",
      },
      {
        slug: "resultflow",
        title: "ResultFlow",
        summary:
          "Academic result checking system — CSV-based admin upload, validation, and a clean student-facing lookup interface for schools and universities.",
        stack: [
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Prisma",
          "Tailwind CSS",
        ],
        timeline: "2024",
        role: "Solo Developer",
        featured: false,
        published: true,
        sortOrder: 1,
        problem:
          "Students and parents cannot easily access academic results. Schools manage results in spreadsheets with no structured access layer.",
        constraints:
          "Must handle CSV uploads from non-technical admins. Lookup must be fast and work on low-end devices. Data validation must catch errors before publication.",
        architecture:
          "Admin panel for CSV upload and validation. Server-side parsing with error reporting. Student-facing lookup by index number or registration. Results stored in PostgreSQL with per-exam indexing.",
        keyDecisions:
          "CSV input chosen because it matches how schools already manage data. Validation happens before any data is saved — no partial imports. Lookup interface kept minimal to work on any device.",
        improvements:
          "Add SMS result delivery. Support multiple institutions under one deployment. Build analytics for institutional reporting.",
      },
      {
        slug: "axiom",
        title: "Axiom — Study Operating System",
        summary:
          "A deterministic study OS that converts academic input into structured execution, measurable retention, and quantified exam risk.",
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
        timeline: "2025 - Present",
        role: "Solo Developer",
        featured: false,
        published: true,
        sortOrder: 2,
        problem:
          "Students rely on guesswork, passive reading, and last-minute cramming. There is no feedback, no measurement, and no predictability — just hope.",
        constraints:
          "System must be deterministic — same inputs must produce consistent, defensible outputs. UX must be simple enough for students under exam pressure to actually use it.",
        architecture:
          "Three engines: Spaced Repetition Engine (schedules reviews based on recall performance), Scheduler Engine (allocates study time using exam timelines and subject difficulty), Retention & Risk Engine (quantifies preparedness and flags weak areas). System loop: Study → Review → Measure → Adjust.",
        keyDecisions:
          "Deterministic over probabilistic — students need to trust the plan. Closed-loop design so performance feeds back into scheduling. Exam risk classification added because students need to know what's dangerous, not just what's weak.",
        improvements:
          "Validate accuracy with real student outcomes. Add institutional integration for exam timetable import.",
        roadmap:
          "Phase 1: Core engines. Phase 2: Student interface. Phase 3: Outcome validation and accuracy proof.",
      },
      {
        slug: "renderboundary",
        title: "RenderBoundary — Engineering Blog",
        summary:
          "A technical blog focused on React and Next.js internals, real-world debugging, and system-level thinking — built for engineers, not beginners.",
        stack: ["Next.js", "TypeScript", "MDX", "Tailwind CSS"],
        timeline: "2025 - Present",
        role: "Author & Developer",
        featured: false,
        published: true,
        sortOrder: 3,
        problem:
          "Generic JavaScript blogs are oversaturated and interchangeable. Most are shallow tutorials that add no value beyond official docs or AI-generated content.",
        architecture:
          "Static Next.js site with MDX for content. No CMS — content is code. Optimized for reading speed and long-form technical writing.",
        keyDecisions:
          "Content derived only from real problems — bugs hit in production, performance issues debugged, architectural decisions made on live projects. No theory-only posts.",
        improvements:
          "Add search. Build a dedicated debugging case studies section.",
      },
      {
        slug: "portfolio-system",
        title: "Portfolio System",
        summary:
          "A production-grade portfolio with PostgreSQL-backed content, admin dashboard, and a self-contained AI assistant — no external AI API.",
        stack: [
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Prisma",
          "Tailwind CSS",
          "NextAuth",
        ],
        timeline: "2025 - Present",
        role: "Full Stack Engineer",
        featured: false,
        published: true,
        sortOrder: 4,
        problem:
          "Most portfolio sites are static marketing pages. I wanted a system that could grow — dynamic content, real admin tooling, and an AI that actually understands the work without depending on external APIs.",
        architecture:
          "Next.js App Router with server components for all data-fetching pages. PostgreSQL for content via Prisma. NextAuth v5 for admin auth. Self-contained AI using keyword-based intent classification and local knowledge retrieval.",
        keyDecisions:
          "Replaced OpenAI dependency with local knowledge retrieval — the bot answers from database records, not a language model. Server components by default. Flat project fields over a generic CMS.",
      },
    ],
  });

  // Decisions (ADR format)
  await prisma.decision.createMany({
    data: [
      {
        title: "Use PostgreSQL over SQLite for Portfolio",
        context:
          "Need a database for the portfolio site. SQLite is simpler but PostgreSQL offers better concurrency, JSON support, and scales if needed.",
        decision:
          "Use PostgreSQL locally and in production. The overhead is minimal and it matches the production mental model.",
        consequences:
          "Requires PostgreSQL installation locally. Slightly more setup than SQLite. But: proper concurrent access, full-text search capability, and no migration pain if the site grows.",
        status: "ACCEPTED",
        tags: ["database", "infrastructure", "portfolio"],
        published: true,
      },
      {
        title: "Server Components by Default",
        context:
          "Next.js App Router supports React Server Components. Need to decide the default rendering strategy.",
        decision:
          "Use server components for all data-fetching pages. Only add 'use client' when interactivity is required (forms, toggles, the AI chat panel).",
        consequences:
          "Smaller client bundles. Direct database access in components. Trade-off: cannot use hooks or browser APIs in server components, requiring clear component boundaries.",
        status: "ACCEPTED",
        tags: ["architecture", "next.js", "performance"],
        published: true,
      },
      {
        title: "Flat Project Fields vs Generic CMS",
        context:
          "Projects need multiple content sections (problem, architecture, failures, etc). Could use a generic CMS with dynamic fields or flat columns.",
        decision:
          "Use flat fields on the Project model. Each section is a nullable text column. No dynamic field resolution needed.",
        consequences:
          "Schema is explicit and queryable. Adding a new section requires a migration. But: no runtime field resolution, no complex joins, and the schema documents exactly what a project contains.",
        status: "ACCEPTED",
        tags: ["data-model", "simplicity", "portfolio"],
        published: true,
      },
    ],
    skipDuplicates: true,
  });

  // System content
  await prisma.systemContent.createMany({
    data: [
      {
        key: "stack",
        title: "Technology Stack",
        content:
          "**Primary**: Next.js, TypeScript, PostgreSQL, Prisma ORM, Tailwind CSS\n\n**Auth**: NextAuth.js v5 with credentials provider\n\n**AI**: OpenAI GPT-4o-mini with 4-layer context assembly\n\n**Tooling**: ESLint, Prettier, shadcn/ui components\n\n**Infrastructure**: Vercel (frontend), PostgreSQL (managed or local)",
        sortOrder: 0,
      },
      {
        key: "philosophy",
        title: "Engineering Philosophy",
        content:
          "**Simplicity over cleverness.** Every abstraction must earn its place. Three similar lines of code are better than a premature abstraction.\n\n**Explicit over magical.** Prefer flat data models, direct database queries, and readable code over framework magic.\n\n**Ship incrementally.** Build the smallest useful version first. Each phase should produce a working system, not a half-built one.\n\n**Document decisions, not just code.** Architecture Decision Records capture the *why* — the context that comments can't convey.",
        sortOrder: 1,
      },
      {
        key: "infrastructure",
        title: "Infrastructure",
        content:
          "This site runs on Next.js with the App Router, deployed to Vercel. The database is PostgreSQL, managed through Prisma ORM.\n\nServer components handle all data-fetching pages — no client-side state management for content display. Client components are used only where interactivity is required: the theme toggle, contact form, admin dashboard, and AI chat panel.\n\nThe admin area is protected by NextAuth.js v5 with a credentials provider. There is one admin user (me).",
        sortOrder: 2,
      },
      {
        key: "ai-architecture",
        title: "AI Architecture",
        content:
          "The AI assistant uses a 4-layer prompt assembly system:\n\n**Layer 1 — Page Context**: Automatically detects which page the user is viewing and fetches relevant data (e.g., project details if on a case study).\n\n**Layer 2 — Knowledge Retrieval**: Classifies user intent (project-specific, architecture, career, etc.) and retrieves the most relevant knowledge blocks from the database.\n\n**Layer 3 — System Personality**: A consistent system prompt that defines the assistant's voice: precise, technical, calm, no fluff.\n\n**Layer 4 — Conversation History**: Maintains session memory so follow-up questions work naturally. Last 8 messages are included for context.\n\nThis architecture means the AI gives different answers depending on where you ask and what you ask about — it's context-aware, not a generic chatbot.",
        sortOrder: 3,
      },
    ],
    skipDuplicates: true,
  });

  // AI Knowledge Blocks — delete and recreate to stay idempotent
  await prisma.aIKnowledgeBlock.deleteMany({});
  await prisma.aIKnowledgeBlock.createMany({
    data: [
      // ── CAREER ──────────────────────────────────────────────────────────────
      {
        type: "CAREER",
        title: "About Preston",
        summary: "Who Preston is — background, identity, and focus",
        content:
          "Preston Munu is a software developer based in Uganda. He works as a Junior Developer at Kakebe Technologies, where he builds real production systems — backend services, dashboards, and API integrations. He's also the founder of CodeSphere Web Solutions, through which he builds and deploys web applications and hosting solutions for clients. He has a Certificate in ICT (expected 2025). He's focused on full-stack development with TypeScript, Next.js, and PostgreSQL, and is driven by a long-term goal of building scalable SaaS products in Africa.",
        tags: [
          "about",
          "who",
          "preston",
          "background",
          "identity",
          "uganda",
          "africa",
        ],
        active: true,
      },
      {
        type: "CAREER",
        title: "Work Experience",
        summary: "Preston's roles at Kakebe Technologies and CodeSphere",
        content:
          "Kakebe Technologies (Junior Developer): Works on production systems with real engineering constraints — timeouts, infrastructure issues, system failures. Responsibilities include backend development, dashboard building, API integration, and debugging. Exposure to the full weight of shipping code that real users depend on.\n\nCodeSphere Web Solutions (Founder & Developer): Founded and runs his own web solutions business. Builds and deploys websites and web applications for clients. Provides hosting solutions. Manages the full project lifecycle from initial idea through build, deployment, and ongoing support.",
        tags: [
          "experience",
          "kakebe",
          "codesphere",
          "work",
          "job",
          "role",
          "employment",
          "founder",
          "developer",
        ],
        active: true,
      },
      {
        type: "CAREER",
        title: "What Preston is Looking For",
        summary: "Availability, ideal roles, and long-term goals",
        content:
          "Preston is open to freelance and contract engagements — particularly web applications, SaaS products, and dashboards. He wants to work on real systems with real constraints, not toy projects or tutorial-style work. Long-term, his goal is to build scalable SaaS products serving the African market. He's not looking for entry-level work — he wants to contribute meaningfully to systems that ship.",
        tags: [
          "hire",
          "freelance",
          "contract",
          "available",
          "looking",
          "opportunities",
          "saas",
          "africa",
          "goals",
        ],
        active: true,
      },
      {
        type: "CAREER",
        title: "Education",
        summary: "Preston's formal education and certifications",
        content:
          "Preston is completing a Certificate in ICT, expected in 2025. His practical skills have been built through hands-on production work at Kakebe Technologies and through running CodeSphere Web Solutions — building, deploying, and maintaining real client projects.",
        tags: [
          "education",
          "certificate",
          "ict",
          "degree",
          "school",
          "qualifications",
        ],
        active: true,
      },

      // ── STACK ────────────────────────────────────────────────────────────────
      {
        type: "STACK",
        title: "Core Technology Stack",
        summary: "Primary technologies and tools Preston uses",
        content:
          "Primary language: JavaScript and TypeScript.\n\nFrontend: React, Next.js (App Router).\n\nBackend: Node.js, API design and integration.\n\nDatabase: PostgreSQL.\n\nMobile: React Native.\n\nAdditional tools: Prisma ORM, Tailwind CSS, shadcn/ui.\n\nPrefers server components for data-fetching pages and client components only where interactivity is required. Comfortable across the full stack — from schema design to UI polish.",
        tags: [
          "stack",
          "technology",
          "tools",
          "next.js",
          "typescript",
          "javascript",
          "postgres",
          "react",
          "node",
          "react native",
          "mobile",
        ],
        active: true,
      },

      // ── PHILOSOPHY ───────────────────────────────────────────────────────────
      {
        type: "PHILOSOPHY",
        title: "Engineering Approach",
        summary: "How Preston thinks about and approaches software development",
        content:
          "Values simplicity over cleverness — every abstraction must earn its place. Prefers explicit code over magic. Believes in shipping incrementally: each phase should produce a working system, not a half-built one. Documents architecture decisions formally using ADR format so the 'why' is never lost. Favors flat data models and direct queries. Has a strong bias toward building things that actually ship and work under real production conditions.",
        tags: ["philosophy", "approach", "values", "engineering", "mindset"],
        active: true,
      },

      // ── PROJECTS ─────────────────────────────────────────────────────────────
      {
        type: "PROJECT",
        title: "ResultFlow",
        summary: "Academic result checking system for schools and universities",
        content:
          "ResultFlow is a result checking system that solves a clear, recurring problem: students and parents cannot easily access academic results.\n\nWhat was built: A structured data input system using CSV uploads, an admin panel for uploading and validating result data, and a clean student-facing lookup interface where students can find their results.\n\nWhy it matters: Clear commercial use case — any school or university needs this. Solves a real problem that repeats every exam cycle, which makes it a strong SaaS candidate.",
        tags: [
          "resultflow",
          "results",
          "school",
          "university",
          "academic",
          "csv",
          "upload",
          "student",
          "lookup",
        ],
        active: true,
        projectId: null,
      },
      {
        type: "PROJECT",
        title: "PFIS — Personal Finance Intelligence System",
        summary:
          "Financial intelligence engine that turns raw mobile money data into behavioral insight",
        content:
          "PFIS (Personal Finance Intelligence System) is a financial intelligence engine that converts raw mobile money data into behavioral insight and decision-level financial control.\n\nProblem: People don't lack data — they lack awareness, discipline, and feedback loops.\n\nCore pipeline:\n- Parses MTN/Airtel mobile money statements\n- Normalizes and categorizes transactions\n- Calculates income vs expenses, savings rate, cash flow trends, income stability\n- Detects impulse spending, spending leaks, and discipline patterns\n\nTwo engines:\n- The Auditor (Brutal Truth Engine) — flags bad financial behavior, detects inefficiencies, exposes patterns\n- The Strategist (Planning Engine) — calculates goal feasibility, optimizes savings strategy, projects financial outcomes\n\nThis moves beyond simple CRUD into genuine decision-support — strong SaaS potential.",
        tags: [
          "pfis",
          "finance",
          "financial",
          "money",
          "mobile money",
          "mtn",
          "airtel",
          "budgeting",
          "spending",
          "savings",
          "intelligence",
        ],
        active: true,
        projectId: null,
      },
      {
        type: "PROJECT",
        title: "Axiom — Study Operating System",
        summary:
          "Deterministic study OS that converts academic input into structured execution and measurable retention",
        content:
          "Axiom is a deterministic study operating system — not a study app, but a system that converts academic input into structured execution, measurable retention, and quantified exam risk.\n\nProblem: Students rely on guesswork, passive reading, and last-minute cramming — no control, no feedback, no predictability.\n\nWhat was built:\n- Spaced Repetition Engine — schedules reviews based on recall performance\n- Scheduler Engine — allocates study time using exam timelines and subject difficulty\n- Retention & Risk Engine — quantifies preparedness and flags weak areas\n\nSystem loop: Study → Review → Measure → Adjust\n\nOutputs: Daily study plan, review schedule, retention score per subject, exam risk classification.\n\nWhat makes it strong: It's deterministic (not guess-based), operates as a closed loop (most study apps don't), and produces measurable performance data — which is rare.",
        tags: [
          "axiom",
          "study",
          "education",
          "spaced repetition",
          "retention",
          "exam",
          "scheduler",
          "learning",
          "students",
        ],
        active: true,
        projectId: null,
      },
      {
        type: "PROJECT",
        title: "RenderBoundary — Engineering Blog",
        summary:
          "Technical blog focused on React and Next.js internals and real-world debugging",
        content:
          "RenderBoundary is a technical blog and engineering lab focused on deep React and Next.js internals, real-world debugging, and system-level thinking.\n\nProblem: Generic JavaScript blogs are oversaturated, shallow, and interchangeable. Most are basic tutorials that fail to differentiate from official docs or AI-generated content.\n\nApproach: Content is derived from actual problems — bugs hit in production, performance issues debugged, architectural decisions made on real projects. Not theory.\n\nBuilt as a static, high-performance Next.js platform using MDX, optimized for clarity, speed, and long-form technical writing.\n\nThe goal is to build authority through demonstrated engineering thinking — measured, validated, and specific.",
        tags: [
          "renderboundary",
          "blog",
          "writing",
          "react",
          "next.js",
          "internals",
          "debugging",
          "technical writing",
          "mdx",
        ],
        active: true,
        projectId: null,
      },
      {
        type: "PROJECT",
        title: "Portfolio System",
        summary: "This portfolio website — architecture and design decisions",
        content:
          "This portfolio is a production system, not a static site. Features: PostgreSQL-backed dynamic content, admin dashboard with full CRUD, self-contained AI assistant that answers questions about Preston using local knowledge retrieval. Built with Next.js App Router, Prisma, NextAuth v5, Tailwind CSS, and shadcn/ui. Every piece of content — projects, decisions, metrics, system sections — is managed through the admin panel.",
        tags: ["portfolio", "architecture", "this-site", "next.js", "prisma"],
        active: true,
        projectId: null,
      },

      // ── ARCHITECTURE ─────────────────────────────────────────────────────────
      {
        type: "ARCHITECTURE",
        title: "AI Assistant Architecture",
        summary:
          "How the AI chat system on this site works — fully self-contained",
        content:
          "The assistant on this site runs without any external AI API. It uses local keyword-based intent classification to understand what you're asking, then retrieves the most relevant knowledge blocks from the database and builds a response directly from that content.\n\nArchitecture: (1) Intent classification — keyword matching routes the question to the right knowledge category. (2) Knowledge retrieval — queries the database for active blocks matching the intent, scored by tag overlap. (3) Response builder — assembles the answer from the top-scoring blocks. (4) Streaming — response is streamed word by word for a natural feel.\n\nNo OpenAI. No external dependencies. Fully self-contained.",
        tags: [
          "ai",
          "architecture",
          "chat",
          "self-contained",
          "knowledge",
          "retrieval",
        ],
        active: true,
      },

      // ── GENERAL ──────────────────────────────────────────────────────────────
      {
        type: "GENERAL",
        title: "Contact and Location",
        summary: "How to reach Preston, where he is, and his availability",
        content:
          "Location: Kampala, Uganda. Timezone: EAT (UTC+3).\n\nAvailability: Open to freelance and contract work. Available for remote opportunities.\n\nContact:\n- WhatsApp / Phone: 0761308920\n- Contact form on this site (submissions go straight to his inbox)\n\nHe responds to serious project enquiries. If you have a clear problem and a real brief, reach out.",
        tags: [
          "contact",
          "location",
          "kampala",
          "uganda",
          "eat",
          "timezone",
          "phone",
          "whatsapp",
          "hire",
          "reach-out",
          "available",
          "remote",
          "freelance",
          "email",
        ],
        active: true,
      },
      {
        type: "GENERAL",
        title: "Rates and Pricing",
        summary: "Preston's freelance rates for hourly and project-based work",
        content:
          "Freelance rates:\n\n- **Hourly**: $20–$40/hr depending on scope and complexity\n- **Small to mid-scope projects**: $300–$800+\n- **SaaS and system-heavy builds** (auth, dashboards, data pipelines): $800 and above\n\nPricing reflects the value of the system being built, not just hours logged. Preston solves problems — he doesn't just complete tasks.",
        tags: [
          "rate",
          "rates",
          "price",
          "pricing",
          "cost",
          "charge",
          "hourly",
          "project",
          "budget",
          "fee",
          "how much",
        ],
        active: true,
      },
      {
        type: "GENERAL",
        title: "Availability and Turnaround",
        summary:
          "How fast Preston can start and how long projects typically take",
        content:
          "**Start time**: 1–3 days after agreement and project brief is confirmed.\n\n**Typical turnaround**:\n- Small web app (landing page with logic, simple CRUD): 1–3 weeks\n- Systems with auth, dashboards, or analytics: 2–4 weeks\n- SaaS or data-driven platforms: scoped per project\n\nTimelines depend on clarity of brief. Vague projects take longer — clear projects ship faster.",
        tags: [
          "start",
          "turnaround",
          "timeline",
          "availability",
          "how long",
          "when",
          "delivery",
          "deadline",
          "fast",
          "quick",
        ],
        active: true,
      },
      {
        type: "CAREER",
        title: "Skills and Proficiency",
        summary: "Honest breakdown of Preston's technical skill levels",
        content:
          "**Strong** (delivers confidently here):\n- JavaScript\n- TypeScript\n- React\n- Next.js\n\n**Comfortable to Strong**:\n- Node.js\n- API design and integration\n\n**Comfortable**:\n- PostgreSQL\n\n**Early stage**:\n- React Native (building depth)\n\nCurrently deepening: backend system design, PostgreSQL data modeling, API performance and reliability, SaaS architecture.",
        tags: [
          "skills",
          "proficiency",
          "level",
          "javascript",
          "typescript",
          "react",
          "next.js",
          "node",
          "postgres",
          "react native",
          "how good",
          "expertise",
        ],
        active: true,
      },
      {
        type: "CAREER",
        title: "What Preston Is Currently Learning",
        summary: "Areas Preston is actively improving in",
        content:
          "Currently focused on:\n\n- **Backend system design** — scalability, structure, long-term maintainability\n- **PostgreSQL data modeling** — schema design for complex, data-heavy systems\n- **API performance and reliability** — handling real-world constraints like timeouts and failures\n- **SaaS architecture** — building systems that can grow, bill, and scale",
        tags: [
          "learning",
          "improving",
          "currently",
          "growth",
          "studying",
          "focus",
          "backend",
          "saas",
          "architecture",
        ],
        active: true,
      },
      {
        type: "GENERAL",
        title: "What Preston Does Not Do",
        summary: "Project types and work Preston declines",
        content:
          "Preston does not take on:\n\n- **WordPress or no-code builds** — he builds real systems with code\n- **Purely static sites without logic** — brochure sites with no engineering challenge\n- **Vague projects without clear objectives** — if you can't define what success looks like, he's not the right fit\n\nThis isn't gatekeeping — it's filtering for projects where engineering actually matters.",
        tags: [
          "wordpress",
          "no-code",
          "static",
          "won't",
          "don't",
          "not",
          "decline",
          "avoid",
          "filter",
          "scope",
        ],
        active: true,
      },
      {
        type: "CAREER",
        title: "Past Clients and Industries",
        summary: "Industries and client types Preston has worked with",
        content:
          "Industries worked in:\n\n- **Education** — student-facing tools, result access systems, school management\n- **Small business** — web platforms, operational dashboards\n- **Internal tooling** — production systems at Kakebe Technologies (backend, dashboards, API integration)\n\nWork style: primarily solo builder, capable of collaborating when the project requires it. Operates across the full lifecycle — scoping, building, deploying, and maintaining.",
        tags: [
          "clients",
          "industries",
          "past work",
          "experience",
          "education",
          "business",
          "internal tools",
          "who have you worked with",
        ],
        active: true,
      },
      {
        type: "PHILOSOPHY",
        title: "What Makes Preston Different",
        summary:
          "Preston's positioning — what sets him apart from other developers",
        content:
          "Preston doesn't build features — he builds control systems.\n\nHis work focuses on:\n- **Behavior and data** — systems that model real human behavior (finance, studying, academic performance)\n- **Data → decisions** — turning raw data into something actionable, not just displayable\n- **Production thinking** — already operating in a real engineering environment at Kakebe Technologies\n\nHe's not building toward being a developer. He's building toward owning scalable SaaS products in Africa.\n\nRenderBoundary (his technical blog) documents the real engineering problems he solves — system design decisions, failures, fixes, API constraints. This isn't a portfolio trick — it's proof of thinking.",
        tags: [
          "different",
          "unique",
          "positioning",
          "why hire",
          "why choose",
          "value",
          "saas",
          "africa",
          "control systems",
          "standout",
        ],
        active: true,
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
