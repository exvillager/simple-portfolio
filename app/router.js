import { createRouter } from "starlane-router"
import { render as renderProject } from "./pages/project.js"

const root = document.getElementById("root")
if (!root) throw new Error("missing #root element")

const router = createRouter({
  root,
  routes: {
    "/": {
      url: "/home.html",
      title: "Pradeep Kumar — Software Engineer",
      description: "Software engineer interested in low-level systems, internals, and building things from scratch.",
    },
    "/projects/diesel": {
      url: "/projects/diesel.html",
      title: "Diesel.js — Pradeep Kumar",
      description: "How I built my own backend framework in Bun.",
    },
    "/projects/:slug": {
      url: "/project.html",
      title: "Project — Pradeep Kumar",
      onRender: (path, result) => renderProject(result.params),
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
