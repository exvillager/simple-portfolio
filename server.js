import { Diesel } from "diesel-core"
import { serve } from "diesel-core/node"

const ROOT = import.meta.dirname
const PORT = 5500

const app = new Diesel()
  .static(`${ROOT}/build`, "/")
  // no static file matched the request -> fall back to the build's entry
  // page so the client-side router can handle the path itself
  .routeNotFound((ctx) => ctx.file(`${ROOT}/build/index.html`))

serve({
  fetch: app.fetch,
  port: PORT,
})

console.log(`Serving http://localhost:${PORT}/`)
