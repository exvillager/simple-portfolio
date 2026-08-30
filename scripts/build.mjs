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

const htmlFiles = readdirSync(appDir).filter((file) => file.endsWith(".html"))
for (const file of htmlFiles) {
  writeFileSync(path.join(outDir, file), readFileSync(path.join(appDir, file)))
}

console.log("Built app/ -> build/")
