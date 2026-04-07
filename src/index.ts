import { Hono } from "hono";
import * as dotenv from "dotenv";
import { cache } from "hono/cache";
import { rateLimiter } from "hono-rate-limiter";
import routes from "./routes/routes.js";

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = new Hono();

// Rate limiter: 100 requests per 15 minutes per IP
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-6",
  keyGenerator: (c) => {
    // Generate key using IP, fallback to user agent + IP or a generic string
    return c.req.header("x-forwarded-for") || c.req.header("remote-addr") || "unknown_user";
  },
});

app.use("/api/*", limiter);

app.use(
  "/api/*",
  cache({
    cacheName: "vlrgg-api-cache",
    cacheControl: "max-age=86400", // cache for 1 day
  })
);

app.route("/api", routes);

app.get("/", (c) => {
  return c.text("Welcome to vlr.gg api!");
});

console.log(`Server started on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
