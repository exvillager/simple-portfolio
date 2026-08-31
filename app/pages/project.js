// placeholder write-ups — fill these in for real, this is just proving the
// /projects/:slug route works end to end
const PROJECT_WRITEUPS = {
  "starlane-router": {
    title: "starlane-router",
    techs: "Frontend · TypeScript · Client Side Router",
    body: "Placeholder write-up. TODO: what starlane-router is, why it exists, and what building the trie-based matcher taught me.",
  },
  diesel: {
    title: "Diesel.js",
    techs: "Bun.js · TypeScript · Web Framework · Web Standard",
    body: "Placeholder write-up. TODO: design decisions behind Diesel.js and lessons from building a backend framework from scratch.",
  },
}

export function render(params) {
  const project = PROJECT_WRITEUPS[params?.slug]
  document.getElementById("project-title").textContent = project ? project.title : "Project not found"
  document.getElementById("project-techs").textContent = project?.techs ?? ""
  document.getElementById("project-body").textContent = project
    ? project.body
    : `No write-up yet for "${params?.slug}".`
}
