// ── Theme toggle (dark default, light optional) ──────────────────
// The initial theme is applied in <head> before paint to avoid a flash.
const themeBtn = document.getElementById("theme-btn");

function setThemeLabel() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  themeBtn.textContent = current === "dark" ? "[ light ]" : "[ dark ]";
}
setThemeLabel();

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  setThemeLabel();
});

const projects = [
  {
    title: "Diesel.js",
    description: "A web framework built using Bun.js – similar to Express, but with more advanced features.",
    techs: ["Bun.js", "TypeScript", "Web Framework"],
    githubLink: "https://github.com/exvillager/diesel",
    liveLink: "https://diesel.exvillager.xyz",
    status: "online"
  },
  {
    title: "nanoserve",
    description: "A lightweight HTTP router written in Go with built-in middleware support.",
    techs: ["Go", "HTTP", "Router", "Middleware"],
    githubLink: "https://github.com/exvillager/nanoserve",
    liveLink: null,
    status: "online"
  },
  {
    title: "envy",
    description: "Securely store and sync .env files across machines using Cloudflare R2 with client-side encryption.",
    techs: ["Go", "CLI", "Cloudflare R2", "Encryption"],
    githubLink: "https://github.com/exvillager/envy",
    liveLink: null,
    status: "online"
  },
  {
    title: "OpenFile",
    description: "OpenFile is a secure and encrypted file receiver/sharing service. with help of openfile you can generate a link and share to any anonymous person and that person can send you files anonymously.",
    techs: ["Bun.js", "React", "SQL"],
    githubLink: "https://github.com/exvillager/openfile.in",
    liveLink: "https://openfile.exvillager.xyz",
    status: "online"
  },
  {
    title: "DevTube",
    description: "A YouTube-like full-stack app with video uploads, authentication, comments, likes, and more.",
    techs: ["ReactJS", "ExpressJS", "MongoDB", "TailwindCSS", "JWT", "Multer", "Cloudinary"],
    githubLink: "https://github.com/exvillager/devtube",
    liveLink: "https://devtube.exvillager.xyz",
    status: "online"
  },
  {
    title: "PingFile",
    description: "A CLI tool for running API requests from JSON/YAML/PKFILE configs. Great for automated testing.",
    techs: ["Node.js", "CLI", "TypeScript", "YAML", "API Testing"],
    githubLink: "https://github.com/exvillager/pingfile",
    liveLink: null,
    status: "online"
  },
  {
    title: "ex-router",
    description: "A file-based routing library like Next.js for building modular backends easily.",
    techs: ["Node.js", "File-based Routing", "NPM Package"],
    githubLink: "https://github.com/exvillager/ex-router",
    liveLink: null,
    status: "online"
  }
];

const skills = [
  {
    title: "Web & Backend",
    skills: [
      "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
      "Python", "NoSQL", "SQL",
      "Tailwind CSS", "Git", "Docker", "AWS", "REST APIs", "Go"
    ]
  },
  {
    title: "Mobile App Dev",
    skills: [
      "React Native Expo"
    ]
  },
  {
    title: "App & System Design",
    skills: [
      "Scalability", "API Design", "Caching", "Microservices"
    ]
  }
];

const blogs = [
  {
    title: "Writing my own Trie based HTTP Router taught me more than I expected",
    description: "In this blog I shared how building a Trie based HTTP router for my framework Diesel.js helped me understand routing, middleware design, lazy parameter parsing, and performance focused architecture.",
    date: "Feb 14, 2026",
    readingTime: "3 min read",
    link: "https://medium.com/@exvillager/writing-my-own-trie-based-http-router-taught-me-more-than-i-expected"
  },
  {
    title: "Understanding How Async JavaScript and the Event Loop Work Together",
    description: "in this blog i have explained how async nodejs work with event-loop and libuv",
    date: "Feb 8, 2025",
    readingTime: "3 min read",
    link: "https://medium.com/@exvillager/understanding-how-async-javascript-and-the-event-loop-work-together-962f55882cbf"
  },
  {
    title: "Let's understand the difference between process.nextTick() and setImmediate()",
    description: "in this blog i have explained the difference between process.nextTick() and setImmediate()",
    date: "Feb 18, 2025",
    readingTime: "2 min read",
    link: "https://medium.com/@exvillager/lets-understand-the-difference-between-process-nexttick-and-setimmediate-91c01a603a51"
  }
];

// ── Render skills ────────────────────────────────────────────────
const skillsList = document.getElementById("skills-list");
skillsList.innerHTML = skills.map(({ title, skills: items }) => `
  <p class="skill-group"><span class="label">${title.toLowerCase()}:</span> ${items.join(", ")}</p>
`).join("");

// ── Render projects ──────────────────────────────────────────────
const projectsList = document.getElementById("projects-list");
projectsList.innerHTML = projects.map(({ title, description, techs, githubLink, liveLink }) => {
  const links = [
    githubLink ? `<a href="${githubLink}" target="_blank" rel="noopener">github</a>` : "",
    liveLink   ? `<a href="${liveLink}" target="_blank" rel="noopener">live</a>`     : ""
  ].filter(Boolean).join(" · ");

  return `
    <div class="project">
      <p><span class="project-name">${title}</span> — ${description}</p>
      <p class="techs">${techs.join(", ")}</p>
      ${links ? `<p class="plinks">${links}</p>` : ""}
    </div>`;
}).join("");

// ── Render blogs ─────────────────────────────────────────────────
const blogsList = document.getElementById("blogs-list");
blogsList.innerHTML = blogs.map(({ title, date, readingTime, link }) => `
  <div class="blog">
    <p><a href="${link}" target="_blank" rel="noopener">${title}</a></p>
    <p class="date">${date.toLowerCase()} · ${readingTime}</p>
  </div>
`).join("");

// ── Nav scroll-spy (highlight current section) ───────────────────
const navLinks = [...document.querySelectorAll("nav a")];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
      );
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

navLinks.forEach((a) => {
  const sec = document.querySelector(a.getAttribute("href"));
  if (sec) spy.observe(sec);
});
