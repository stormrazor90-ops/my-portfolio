/**
 * projectsData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all portfolio projects.
 *
 * Projects:
 *  1. Portfolio Website          — personal, live on Vercel
 *  2. Blogging Platform          — remote client (Pakistan), live
 *  3. Hospital Management System — university project (OOP / Java)
 *  4. Student Management System  — university project (Data Structures)
 *  5. Library Management System  — university project (Database Systems)
 */

export const PROJECTS_DATA = [

  /* ═══════════════════════════════════════════════════════════════════
     1 — PORTFOLIO WEBSITE  (live)
  ═══════════════════════════════════════════════════════════════════ */
  {
    id:       1,
    slug:     'portfolio-website',
    title:    'Portfolio Website',
    subtitle: 'A cinematic personal portfolio built with React, GSAP, and Three.js — the site you are looking at right now.',
    cat:      'Creative',
    year:     '2026',
    tech:     'React · GSAP · Three.js',
    tags:     ['React', 'GSAP', 'Three.js', 'Lenis', 'Framer Motion'],
    stack:    ['React 18', 'Vite', 'GSAP', 'ScrollTrigger', 'Three.js', 'Lenis', 'Framer Motion', 'CSS Modules'],
    desc:     'Cinematic personal portfolio with WebGL shader background, scroll-driven animations, and custom cursor.',
    img:      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&auto=format&fit=crop',
    heroImg:  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80&auto=format&fit=crop',
    color:    '#0d0d0d',

    liveUrl:  'https://my-portfolio-six-lime-23.vercel.app/',
    repoUrl:  'https://github.com/stormrazor90-ops/my-portfolio',

    role:     'Designer & Developer',
    duration: '3 Weeks',
    client:   'Personal Project',
    status:   'Live ✓',

    stats: [
      { n: '10+',  label: 'Animations' },
      { n: '6',    label: 'Pages' },
      { n: '100%', label: 'Custom Design' },
    ],

    details: [
      { label: 'Type',       value: 'Personal Portfolio' },
      { label: 'Framework',  value: 'React 18 + Vite' },
      { label: 'Animations', value: 'GSAP + ScrollTrigger + Framer Motion' },
      { label: 'Background', value: 'Three.js WebGL Shader' },
      { label: 'Scroll',     value: 'Lenis Smooth Scroll' },
      { label: 'Styling',    value: 'CSS Modules + Custom Properties' },
      { label: 'Hosting',    value: 'Vercel' },
      { label: 'Year',       value: '2026' },
    ],

    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587620962725-abab19836100?w=800&q=80&auto=format&fit=crop',
    ],

    goal: {
      summary:
        'Build a standout portfolio that reflects both engineering depth and design sensibility — going beyond a simple list of projects to create an immersive, memorable experience for potential employers and clients.',
      points: [
        'Showcase full-stack and creative coding capabilities in a single cohesive site',
        'Demonstrate GSAP, Three.js, and Framer Motion skills through real UI',
        'Make navigation, micro-interactions, and transitions feel polished and intentional',
        'Keep performance high despite heavy animation — Lighthouse score 90+',
        'Be fully responsive from mobile to ultrawide displays',
      ],
      stats: [
        { n: '90+',  label: 'Lighthouse Score' },
        { n: '6',    label: 'Route Pages' },
      ],
    },
    goalImages: [
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop',
    ],

    challenges: {
      summary:
        'Building a heavily animated site in React while keeping the DOM stable and performance smooth required solving several non-trivial architectural problems.',
      items: [
        {
          title: 'GSAP + React DOM Conflicts',
          desc:  'GSAP ScrollTrigger\'s pin spacers and React\'s reconciler both mutate the DOM, causing removeChild crashes on route changes. Fixed by scoping every gsap.context() to a page-level ref so cleanup never touches nodes owned by other components.',
        },
        {
          title: 'Three.js Canvas Ownership',
          desc:  'The original shader background used appendChild to inject the WebGL canvas, bypassing React\'s virtual DOM. Refactored to render the canvas in JSX and pass it to THREE.WebGLRenderer({ canvas }) so React retains full ownership.',
        },
        {
          title: 'Smooth Scroll + ScrollTrigger Sync',
          desc:  'Lenis and GSAP ScrollTrigger each track scroll position independently. Wired them together via scrollerProxy on document.body and lenis.on("scroll", ScrollTrigger.update) to keep pin timing and scrub animations perfectly in sync.',
        },
        {
          title: 'Performance on Low-End Devices',
          desc:  'Shader animations and multiple GSAP timelines were heavy on budget devices. Added devicePixelRatio caps, reduced shader opacity on mobile via media queries, and lazy-loaded all project images.',
        },
      ],
      stats: [
        { n: '4',  label: 'Major Bugs Fixed' },
        { n: '3w', label: 'Build Time' },
      ],
    },
    challengeImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop',
    ],

    process: {
      summary:
        'Designed and built entirely solo — from Figma wireframes through to a live Vercel deployment in three weeks.',
      steps: [
        { n: '01', title: 'Design in Figma',      desc: 'Sketched layout, colour system (dark + gold accent), typography scale, and motion principles before writing a single line of code.' },
        { n: '02', title: 'Component Architecture', desc: 'Scaffolded reusable components (Navbar, CustomCursor, ShaderBackground, Typewriter) and set up CSS Modules with a global design-token layer.' },
        { n: '03', title: 'Animations & 3D',       desc: 'Implemented GSAP ScrollTrigger scroll sequences, Framer Motion page transitions, and the Three.js WebGL shader background.' },
        { n: '04', title: 'Data & Pages',           desc: 'Built all six route pages (Home, About, Projects, Project Detail, Resume, Contact) with a centralised projectsData.js driving the project sections.' },
        { n: '05', title: 'QA & Deploy',            desc: 'Ran Lighthouse audits, fixed the GSAP/React DOM conflicts, optimised images, and deployed to Vercel with a custom domain.' },
      ],
      stats: [
        { n: '3w',  label: 'Timeline' },
        { n: '100%', label: 'Solo Build' },
      ],
    },
    processImages: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80&auto=format&fit=crop',
    ],

    result: {
      summary:
        'A fully live, production-grade portfolio deployed on Vercel — serving as both a personal brand and a live demonstration of front-end engineering capability.',
      points: [
        'Live at my-portfolio-six-lime-23.vercel.app with zero downtime since launch',
        'Smooth 60 fps animations across desktop, tablet, and mobile',
        'WebGL shader background with adaptive opacity for readability on all screen sizes',
        'Custom cursor, scroll-driven parallax, and stacking service cards all working in sync',
        'Full project detail pages with deep-dive write-ups for every project',
      ],
      stats: [
        { n: 'Live',  label: 'Status' },
        { n: '6',     label: 'Pages' },
        { n: '90+',   label: 'Lighthouse' },
      ],
    },
  },


  /* ═══════════════════════════════════════════════════════════════════
     2 — BLOGGING PLATFORM  (live · remote client)
  ═══════════════════════════════════════════════════════════════════ */
  {
    id:       2,
    slug:     'blogging-platform',
    title:    'Blogging Platform',
    subtitle: 'A full-featured blogging CMS built remotely for a client from Pakistan — with rich-text editing, auth, and a clean reader UI.',
    cat:      'Full-Stack',
    year:     '2024',
    tech:     'React · Node.js · MongoDB',
    tags:     ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    stack:    ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Auth', 'REST API', 'CSS3'],
    desc:     'Full-stack blogging platform with admin dashboard, rich-text editor, category management, and JWT-secured authentication.',
    img:      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80&auto=format&fit=crop',
    heroImg:  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&q=80&auto=format&fit=crop',
    color:    '#1a1a2e',

    liveUrl:  'https://blogs-two-rosy.vercel.app/',
    repoUrl:  '#',   // private client repo

    role:     'Full-Stack Developer',
    duration: '5 Weeks',
    client:   'Remote Client — Pakistan',
    status:   'Delivered ✓',

    stats: [
      { n: 'CRUD',  label: 'Full CRUD' },
      { n: 'JWT',   label: 'Auth System' },
      { n: '5w',    label: 'Delivered In' },
    ],

    details: [
      { label: 'Type',      value: 'Client Project — Remote' },
      { label: 'Frontend',  value: 'React + CSS3' },
      { label: 'Backend',   value: 'Node.js + Express.js' },
      { label: 'Database',  value: 'MongoDB + Mongoose' },
      { label: 'Auth',      value: 'JWT (JSON Web Tokens)' },
      { label: 'Client',    value: 'Remote — Pakistan' },
      { label: 'Delivery',  value: '5 Weeks' },
      { label: 'Year',      value: '2024' },
    ],

    images: [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80&auto=format&fit=crop',
    ],

    goal: {
      summary:
        'The client needed a self-hosted blogging platform they could manage without technical knowledge — a clean public-facing blog plus a private admin dashboard for writing, editing, and organising posts.',
      points: [
        'Public blog with posts, categories, and search — no login required for readers',
        'Admin dashboard with rich-text editor for creating and updating posts',
        'Secure JWT authentication so only the client can access the admin panel',
        'Category and tag management to organise content',
        'Responsive design that looks great on both desktop and mobile',
      ],
      stats: [
        { n: '5w',   label: 'Timeline' },
        { n: '100%', label: 'Requirements Met' },
      ],
    },
    goalImages: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&q=80&auto=format&fit=crop',
    ],

    challenges: {
      summary:
        'Working remotely across time zones while building a full-stack product with a non-technical client required clear communication, careful scoping, and iterative delivery.',
      items: [
        {
          title: 'Remote Communication',
          desc:  'Client was non-technical, so all requirements had to be gathered through clear written briefs and screen-share walkthroughs. Used structured Loom walkthroughs to demonstrate features before handoff.',
        },
        {
          title: 'Rich-Text Editor Integration',
          desc:  'Integrating a WYSIWYG editor that produced clean HTML, stored it safely in MongoDB, and rendered it correctly on the public blog required careful sanitisation to prevent XSS.',
        },
        {
          title: 'JWT Session Management',
          desc:  'Implementing secure admin-only routes with JWT refresh tokens, handling token expiry gracefully on the frontend, and protecting all write-API endpoints.',
        },
        {
          title: 'Scope Creep Management',
          desc:  'Mid-project, the client requested additional features (comments section, newsletter subscription). Managed expectations by scoping Phase 2 clearly without delaying the original delivery.',
        },
      ],
      stats: [
        { n: '5w',  label: 'Delivered' },
        { n: '0',   label: 'Missed Deadlines' },
      ],
    },
    challengeImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop',
    ],

    process: {
      summary:
        'Followed an iterative delivery model — shipping a working MVP at week two, then refining and adding features through weekly check-ins with the client.',
      steps: [
        { n: '01', title: 'Requirements & Scoping', desc: 'Gathered requirements via written brief and a video call. Defined MVP scope: public blog, admin CRUD, auth. Documented out-of-scope items.' },
        { n: '02', title: 'Backend API',             desc: 'Built the Express REST API with CRUD endpoints for posts, categories, and users. Set up MongoDB Atlas and Mongoose schemas.' },
        { n: '03', title: 'JWT Authentication',      desc: 'Implemented register/login endpoints, JWT signing with refresh token rotation, and protected route middleware.' },
        { n: '04', title: 'Frontend — Public Blog',  desc: 'Built the reader-facing blog with post listing, single post view, category filter, and search using React.' },
        { n: '05', title: 'Admin Dashboard',         desc: 'Built the private admin panel with rich-text editor, post management table, category CRUD, and analytics summary.' },
        { n: '06', title: 'Handoff & Deployment',    desc: 'Deployed backend to a VPS and frontend to a static host. Recorded a walkthrough video for the client explaining how to manage content.' },
      ],
      stats: [
        { n: '6',  label: 'Dev Phases' },
        { n: '5w', label: 'Total Time' },
      ],
    },
    processImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80&auto=format&fit=crop',
    ],

    result: {
      summary:
        'Delivered a fully functional blogging platform to the client on time and within scope. The client has been managing their content independently since handoff with no support issues.',
      points: [
        'Full CRUD admin dashboard deployed and handed off to client',
        'JWT-secured authentication preventing unauthorised access',
        'Rich-text posts rendering correctly across all browsers',
        'Client trained and managing content independently post-handoff',
        'Scope for Phase 2 (comments + newsletter) documented for future development',
      ],
      stats: [
        { n: 'Delivered', label: 'Status' },
        { n: '5w',        label: 'On Schedule' },
        { n: '0',         label: 'Support Tickets' },
      ],
    },
  },


  /* ═══════════════════════════════════════════════════════════════════
     3 — HOSPITAL MANAGEMENT SYSTEM  (university · OOP / Java)
  ═══════════════════════════════════════════════════════════════════ */
  {
    id:       3,
    slug:     'hospital-management-system',
    title:    'Hospital Management System',
    subtitle: 'A desktop-grade Java application for managing patients, doctors, appointments, and billing — built as a university OOP course project.',
    cat:      'Full-Stack',
    year:     '2024',
    tech:     'Java · MySQL · OOP',
    tags:     ['Java', 'MySQL', 'OOP', 'JDBC', 'Swing'],
    stack:    ['Java SE', 'Java Swing (GUI)', 'MySQL', 'JDBC', 'OOP Principles', 'MVC Pattern'],
    desc:     'Desktop hospital management app built in Java with patient records, doctor scheduling, appointment booking, and billing modules.',
    img:      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80&auto=format&fit=crop',
    heroImg:  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1400&q=80&auto=format&fit=crop',
    color:    '#0a1628',

    liveUrl:  '#',
    repoUrl:  '#',

    role:     'Developer (University Project)',
    duration: '4 Weeks',
    client:   'University — OOP Course',
    status:   'Completed ✓',

    stats: [
      { n: '4',    label: 'Core Modules' },
      { n: 'OOP',  label: 'Architecture' },
      { n: 'JDBC', label: 'DB Layer' },
    ],

    details: [
      { label: 'Type',        value: 'University Project — OOP Course' },
      { label: 'Language',    value: 'Java SE' },
      { label: 'GUI',         value: 'Java Swing' },
      { label: 'Database',    value: 'MySQL + JDBC' },
      { label: 'Pattern',     value: 'MVC Architecture' },
      { label: 'Concepts',    value: 'Inheritance, Polymorphism, Encapsulation, Abstraction' },
      { label: 'University',  value: 'GIFT University / Virtual University' },
      { label: 'Year',        value: '2024' },
    ],

    images: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80&auto=format&fit=crop',
    ],

    goal: {
      summary:
        'Demonstrate core Object-Oriented Programming principles by building a real-world desktop application. The project required applying inheritance, polymorphism, encapsulation, and abstraction in a meaningful domain.',
      points: [
        'Patient registration and record management with full CRUD',
        'Doctor profiles with specialisation and schedule management',
        'Appointment booking system with conflict detection',
        'Billing and invoice generation per patient visit',
        'Apply all four pillars of OOP across a multi-module system',
      ],
      stats: [
        { n: '4',    label: 'OOP Pillars Applied' },
        { n: '4',    label: 'Modules Built' },
      ],
    },
    goalImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80&auto=format&fit=crop',
    ],

    challenges: {
      summary:
        'Designing a multi-module system in Java Swing from scratch while applying strict OOP principles and maintaining a clean separation between business logic and UI.',
      items: [
        {
          title: 'MVC in Swing',
          desc:  'Java Swing does not enforce MVC, so separating the View (Swing panels), Controller (event handlers), and Model (domain objects + JDBC) required deliberate architectural discipline.',
        },
        {
          title: 'Database Relationship Design',
          desc:  'Designing the MySQL schema to handle the one-to-many relationship between doctors and appointments, and many-to-many between patients and doctors, required careful normalisation.',
        },
        {
          title: 'Appointment Conflict Detection',
          desc:  'Preventing double-booking required querying existing appointments by doctor and time slot on every booking attempt and surfacing a clear error in the UI.',
        },
      ],
      stats: [
        { n: '4w', label: 'Completed In' },
        { n: 'A',  label: 'Grade Received' },
      ],
    },
    challengeImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop',
    ],

    process: {
      summary:
        'Followed an academic development cycle — UML class diagrams first, then schema design, then coding bottom-up from the model layer to the Swing UI.',
      steps: [
        { n: '01', title: 'UML & Class Diagrams',  desc: 'Designed class hierarchy using UML — Person → Patient/Doctor, with composition for Appointment and Billing. Identified abstract classes and interfaces.' },
        { n: '02', title: 'Database Schema',        desc: 'Designed and created the MySQL schema: patients, doctors, appointments, and bills tables with proper foreign keys.' },
        { n: '03', title: 'JDBC Data Layer',        desc: 'Implemented DAO (Data Access Object) classes for each entity, encapsulating all SQL queries and JDBC connection handling.' },
        { n: '04', title: 'Business Logic Layer',   desc: 'Built service classes for appointment booking (with conflict detection), billing calculation, and patient record management.' },
        { n: '05', title: 'Swing GUI',               desc: 'Designed and wired up the Swing UI — main window with tabbed panels for each module, forms for data entry, and tables for record display.' },
      ],
      stats: [
        { n: '4w',  label: 'Build Time' },
        { n: 'MVC', label: 'Architecture' },
      ],
    },
    processImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80&auto=format&fit=crop',
    ],

    result: {
      summary:
        'Successfully demonstrated all four OOP pillars in a working multi-module desktop application. Received full marks for the OOP course project.',
      points: [
        'Full patient, doctor, appointment, and billing CRUD working end-to-end',
        'Clean MVC separation between Swing UI, service layer, and JDBC data layer',
        'Appointment conflict detection preventing double-booking',
        'UML diagrams and documentation submitted alongside source code',
        'All four OOP pillars evidenced through the class hierarchy',
      ],
      stats: [
        { n: 'A',    label: 'Grade' },
        { n: '4',    label: 'Modules' },
        { n: '100%', label: 'Requirements' },
      ],
    },
  },


  /* ═══════════════════════════════════════════════════════════════════
     4 — STUDENT MANAGEMENT SYSTEM  (university · Data Structures)
  ═══════════════════════════════════════════════════════════════════ */
  {
    id:       4,
    slug:     'student-management-system',
    title:    'Student Management System',
    subtitle: 'A console and GUI-based student records system built to apply data structures — linked lists, trees, and sorting algorithms — on real academic data.',
    cat:      'Web App',
    year:     '2023',
    tech:     'Java · Data Structures · MySQL',
    tags:     ['Java', 'Data Structures', 'Linked List', 'Binary Tree', 'MySQL'],
    stack:    ['Java SE', 'Custom Data Structures', 'MySQL', 'JDBC', 'Java Swing'],
    desc:     'Student records system demonstrating linked lists, binary search trees, and sorting algorithms applied to academic data management.',
    img:      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80&auto=format&fit=crop',
    heroImg:  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80&auto=format&fit=crop',
    color:    '#0f1923',

    liveUrl:  '#',
    repoUrl:  '#',

    role:     'Developer (University Project)',
    duration: '3 Weeks',
    client:   'University — Data Structures Course',
    status:   'Completed ✓',

    stats: [
      { n: '3+', label: 'Data Structures' },
      { n: 'O(log n)', label: 'BST Search' },
      { n: 'CRUD', label: 'Operations' },
    ],

    details: [
      { label: 'Type',        value: 'University Project — Data Structures Course' },
      { label: 'Language',    value: 'Java SE' },
      { label: 'Structures',  value: 'Linked List, Binary Search Tree, Sorting Algorithms' },
      { label: 'Database',    value: 'MySQL + JDBC' },
      { label: 'Complexity',  value: 'O(log n) search, O(n log n) sort' },
      { label: 'University',  value: 'GIFT University / Virtual University' },
      { label: 'Year',        value: '2023' },
    ],

    images: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop',
    ],

    goal: {
      summary:
        'Apply data structures concepts learned in class — linked lists, trees, and sorting algorithms — to a practical student records system instead of isolated textbook exercises.',
      points: [
        'Store and traverse student records using a custom linked list',
        'Implement a Binary Search Tree for efficient student lookup by ID',
        'Apply merge sort and quick sort on student GPA and name fields',
        'Full CRUD for student profiles, enrolment, and grade records',
        'Compare time complexity of linear search vs BST search empirically',
      ],
      stats: [
        { n: '3',       label: 'DSA Concepts' },
        { n: 'O(log n)', label: 'Best Search' },
      ],
    },
    goalImages: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&auto=format&fit=crop',
    ],

    challenges: {
      summary:
        'Implementing custom data structures from scratch — without using Java Collections — and correctly wiring them to a persistent MySQL backend for real data.',
      items: [
        {
          title: 'No Java Collections Allowed',
          desc:  'The course constraint required implementing LinkedList, BST, and sorting algorithms from scratch using nodes and pointers — no ArrayList or HashMap permitted.',
        },
        {
          title: 'BST Persistence',
          desc:  'A binary search tree lives in memory; persisting it to MySQL on shutdown and reconstructing it correctly on startup required a deliberate serialisation strategy (in-order traversal → INSERT).',
        },
        {
          title: 'Algorithm Comparison',
          desc:  'The project required benchmarking linear search vs BST and bubble sort vs merge sort on datasets of 100, 500, and 1000 records, and presenting the results in the report.',
        },
      ],
      stats: [
        { n: '3w', label: 'Completed In' },
        { n: 'A',  label: 'Grade Received' },
      ],
    },
    challengeImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop',
    ],

    process: {
      summary:
        'Built bottom-up: data structures first, then JDBC persistence, then the application logic, then a simple Swing UI for demonstration.',
      steps: [
        { n: '01', title: 'Pseudocode & Design',    desc: 'Wrote pseudocode for each data structure, drew diagrams of the BST node relationships and linked list traversal before coding.' },
        { n: '02', title: 'Data Structure Impl.',   desc: 'Implemented SinglyLinkedList<Student>, BinarySearchTree<Student> (keyed on ID), and sorting utilities using generic Java classes.' },
        { n: '03', title: 'MySQL Schema & JDBC',    desc: 'Designed the students, grades, and courses tables. Wrote DAO classes to load data into the linked list on startup and flush changes on exit.' },
        { n: '04', title: 'Application Layer',      desc: 'Built search (BST lookup), enrolment, grade entry, and reporting operations on top of the data structures.' },
        { n: '05', title: 'Benchmarking & Report',  desc: 'Measured and tabulated execution times for each algorithm at three dataset sizes. Wrote the course report with Big-O analysis.' },
      ],
      stats: [
        { n: '3w',  label: 'Build Time' },
        { n: '5',   label: 'Phases' },
      ],
    },
    processImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80&auto=format&fit=crop',
    ],

    result: {
      summary:
        'Delivered a working student records system with hand-rolled data structures, backed by MySQL persistence, and accompanied by a performance benchmarking report.',
      points: [
        'Custom linked list, BST, and sorting algorithms all working on real data',
        'BST lookup demonstrably faster than linear search at 500+ records',
        'Full CRUD for students, grades, and course enrolment',
        'Benchmarking report showing O(n) vs O(log n) search time comparison',
        'All source code and UML diagrams submitted with project',
      ],
      stats: [
        { n: 'A',      label: 'Grade' },
        { n: '3',      label: 'DSA Implemented' },
        { n: 'O(log n)', label: 'Search Complexity' },
      ],
    },
  },


  /* ═══════════════════════════════════════════════════════════════════
     5 — LIBRARY MANAGEMENT SYSTEM  (university · Database Systems)
  ═══════════════════════════════════════════════════════════════════ */
  {
    id:       5,
    slug:     'library-management-system',
    title:    'Library Management System',
    subtitle: 'A database-driven library system covering book inventory, member management, borrow/return tracking, and fine calculation — built for the Database Systems course.',
    cat:      'Full-Stack',
    year:     '2023',
    tech:     'PHP · MySQL · HTML/CSS',
    tags:     ['PHP', 'MySQL', 'SQL', 'HTML5', 'CSS3', 'Database Design'],
    stack:    ['PHP', 'MySQL', 'PDO', 'HTML5', 'CSS3', 'SQL Stored Procedures', 'ER Diagrams'],
    desc:     'Web-based library management system with book inventory, member tracking, borrow/return workflow, and automated fine calculation using stored procedures.',
    img:      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop',
    heroImg:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80&auto=format&fit=crop',
    color:    '#12100e',

    liveUrl:  '#',
    repoUrl:  '#',

    role:     'Developer (University Project)',
    duration: '3 Weeks',
    client:   'University — Database Systems Course',
    status:   'Completed ✓',

    stats: [
      { n: '3NF',    label: 'Normalised' },
      { n: 'SQL SP', label: 'Stored Procs' },
      { n: 'Auto',   label: 'Fine Calc.' },
    ],

    details: [
      { label: 'Type',       value: 'University Project — Database Systems Course' },
      { label: 'Backend',    value: 'PHP + PDO' },
      { label: 'Database',   value: 'MySQL' },
      { label: 'Design',     value: 'ER Diagram → 3NF Normalisation' },
      { label: 'Features',   value: 'Stored Procedures, Triggers, Views' },
      { label: 'Frontend',   value: 'HTML5 + CSS3' },
      { label: 'University', value: 'GIFT University / Virtual University' },
      { label: 'Year',       value: '2023' },
    ],

    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80&auto=format&fit=crop',
    ],

    goal: {
      summary:
        'Design a fully normalised relational database and build a web application on top of it — demonstrating ER modelling, 3NF normalisation, stored procedures, triggers, and views as required by the Database Systems course.',
      points: [
        'ER diagram covering books, members, loans, and fines entities',
        'Schema normalised to Third Normal Form (3NF)',
        'Book inventory with ISBN, author, genre, and availability tracking',
        'Member registration and borrow/return workflow',
        'Automatic fine calculation via MySQL triggers on overdue loans',
        'Stored procedures for common queries (available books, member history)',
      ],
      stats: [
        { n: '3NF', label: 'Normal Form' },
        { n: '4',   label: 'Core Entities' },
      ],
    },
    goalImages: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=80&auto=format&fit=crop',
    ],

    challenges: {
      summary:
        'The primary challenge was designing a schema that was both fully normalised and efficient for the application\'s query patterns, then implementing business logic at the database level using stored procedures and triggers.',
      items: [
        {
          title: '3NF Normalisation',
          desc:  'Ensuring no transitive dependencies in the schema required multiple iterations of the ER diagram, particularly for the loans table which initially mixed book and member attributes.',
        },
        {
          title: 'Fine Calculation Logic',
          desc:  'Implementing automatic fine accumulation using a MySQL trigger on the loans table — firing on each day a book is overdue — and surfacing the running total through a view.',
        },
        {
          title: 'Concurrency on Availability',
          desc:  'Preventing two members from borrowing the same copy simultaneously required a transaction with a SELECT FOR UPDATE lock on the book availability column.',
        },
      ],
      stats: [
        { n: '3w', label: 'Completed In' },
        { n: 'A',  label: 'Grade Received' },
      ],
    },
    challengeImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop',
    ],

    process: {
      summary:
        'Database-design-first approach: ER diagram → normalisation → DDL → stored procedures → PHP application layer → HTML/CSS frontend.',
      steps: [
        { n: '01', title: 'ER Diagram',           desc: 'Drew the entity-relationship diagram covering books, members, copies, loans, and fines with all cardinalities.' },
        { n: '02', title: 'Normalisation',         desc: 'Applied 1NF, 2NF, and 3NF rules to eliminate redundancy and transitive dependencies. Documented each normalisation step.' },
        { n: '03', title: 'DDL & Seed Data',       desc: 'Wrote CREATE TABLE statements with constraints, indexes, and foreign keys. Generated seed data for 50 books and 20 members.' },
        { n: '04', title: 'Stored Procs & Triggers', desc: 'Implemented stored procedures for borrow/return operations and a trigger for automatic fine accumulation on overdue loans.' },
        { n: '05', title: 'PHP Application',       desc: 'Built the web interface in PHP using PDO prepared statements throughout for SQL injection prevention.' },
      ],
      stats: [
        { n: '3w',  label: 'Build Time' },
        { n: '3NF', label: 'Schema Quality' },
      ],
    },
    processImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80&auto=format&fit=crop',
    ],

    result: {
      summary:
        'Delivered a fully normalised, database-centric library system with server-side business logic via stored procedures and triggers — demonstrating every major concept from the Database Systems course.',
      points: [
        'Schema fully normalised to 3NF with documented proof of normalisation steps',
        'Stored procedures and triggers handling borrow, return, and fine logic',
        'Concurrency-safe availability tracking with transaction locks',
        'PDO prepared statements throughout — no raw SQL string concatenation',
        'ER diagram, normalisation report, and DDL submitted with project',
      ],
      stats: [
        { n: 'A',   label: 'Grade' },
        { n: '3NF', label: 'Normal Form' },
        { n: '5',   label: 'Stored Procs' },
      ],
    },
  },


]
