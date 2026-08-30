import { createRouter } from "starlane-router"

const root = document.getElementById("root")
if (!root) throw new Error("missing #root element")

// placeholder write-ups — fill these in for real, this is just proving the
// /projects/:slug route works end to end
const PROJECT_WRITEUPS = {
  "starlane-router": {
    title: "starlane-router",
    techs: "TypeScript · Trie Routing · Zero Dependencies",
    body: "Placeholder write-up. TODO: what starlane-router is, why it exists, and what building the trie-based matcher taught me.",
  },
  diesel: {
    title: "Diesel.js",
    techs: "Bun.js · TypeScript · Web Framework",
    body: "Placeholder write-up. TODO: design decisions behind Diesel.js and lessons from building a backend framework from scratch.",
  },
}

const router = createRouter({
  root,
  routes: {
    "/": {
      url: "/home.html",
      title: "Pradeep Kumar — Software Engineer",
      description: "Software engineer interested in low-level systems, internals, and building things from scratch.",
    },
    "/projects/:slug": {
      url: "/project.html",
      title: "Project — Pradeep Kumar",
    },
  },
  notFound: {
    url: "/404.html",
    title: "404 Not Found — Pradeep Kumar",
  },
})

// ── Theme toggle (light-pink, pink, dark, light) ────────────────
const themes = ["light-pink", "pink", "dark", "light"]

function getNextTheme(current) {
  const idx = themes.indexOf(current)
  return idx === -1 ? "pink" : themes[(idx + 1) % themes.length]
}

function setTheme(themeBtn, theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)
  const next = getNextTheme(theme)
  themeBtn.textContent = `[ ${next} ]`
  themeBtn.setAttribute("aria-label", `Switch to ${next} theme`)
}

// content is injected into #root after each navigation, so page-specific
// scripts have to (re-)run once the elements they target actually exist,
// instead of once at a fixed point in a static document.
function initPageScripts() {
  const themeBtn = document.getElementById("theme-btn")
  if (themeBtn) {
    const current = document.documentElement.getAttribute("data-theme") || "light-pink"
    setTheme(themeBtn, current)
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light-pink"
      setTheme(themeBtn, getNextTheme(current))
    })
  }

  const copyEmailBtn = document.getElementById("copy-email-btn")
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("pradeep@exvillager.xyz")
        copyEmailBtn.textContent = "[ copied! ]"
        setTimeout(() => {
          copyEmailBtn.textContent = "[ copy ]"
        }, 2000)
      } catch (err) {
        console.error("Failed to copy email:", err)
      }
    })
  }

  const currentMonthEl = document.getElementById("current-month")
  if (currentMonthEl) {
    const now = new Date()
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
    currentMonthEl.textContent = `${months[now.getMonth()]} ${now.getFullYear()}`
  }

  const projectTitleEl = document.getElementById("project-title")
  if (projectTitleEl) {
    // createRouter doesn't expose matched :param values yet, so the slug
    // is read straight from the URL here instead
    const slug = window.location.pathname.match(/^\/projects\/([^/]+)$/)?.[1]
    const project = PROJECT_WRITEUPS[slug]
    projectTitleEl.textContent = project ? project.title : "Project not found"
    document.getElementById("project-techs").textContent = project?.techs ?? ""
    document.getElementById("project-body").textContent = project
      ? project.body
      : `No write-up yet for "${slug}".`
  }
}

new MutationObserver(initPageScripts).observe(root, { childList: true })

// Keyboard shortcut: press 't' to toggle theme
window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return
  if (e.key === "t" || e.key === "T") {
    document.getElementById("theme-btn")?.click()
  }
})

router.start()
