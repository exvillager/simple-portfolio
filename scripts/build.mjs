import { build } from "esbuild"
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const appDir = path.join(projectRoot, "app")
const outDir = path.join(projectRoot, "build")

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

await build({
  entryPoints: [path.join(appDir, "router.js")],
  bundle: true,
  format: "esm",
  outfile: path.join(outDir, "router.js"),
})

function copyHtmlFiles(srcDir, destDir) {
  const entries = readdirSync(srcDir, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)
    if (entry.isDirectory()) {
      mkdirSync(destPath, { recursive: true })
      copyHtmlFiles(srcPath, destPath)
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      writeFileSync(destPath, readFileSync(srcPath))
    }
  }
}

copyHtmlFiles(appDir, outDir)

console.log("Built app/ -> build/")
