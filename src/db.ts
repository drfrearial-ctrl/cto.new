/**
 * Server-only handle to the team's database (serverless Postgres over TCP).
 * The connection string comes from `DATABASE_URL`, which the owner connects via
 * the database card and which is injected into the sandbox and passed to the live
 * host on publish.
 *
 * This helper uses Bun's built-in Postgres client (`Bun.sql`), which reads
 * `DATABASE_URL` (including its `sslmode`) and connects over the standard Postgres
 * wire protocol. The connection is created lazily (per call, not at module load)
 * so the site still builds and serves before a database is connected — the error
 * only surfaces if a query actually runs without `DATABASE_URL`.
 *
 * (Note: the original implementation used the `@neondatabase/serverless` HTTP
 * driver, which only works against a Neon-hosted database. Our managed
 * `DATABASE_URL` points at a standard Postgres endpoint, so `Bun.sql` is used
 * instead — same tagged-template call signature, compatible with any Postgres.)
 *
 * Use it only inside a `createServerFn()` handler or an `src/routes/api/*` route
 * (never client code):
 *
 *   const getPosts = createServerFn().handler(async () => {
 *     const rows = await sql()`select id, title, created_at from posts`;
 *     // Coerce non-primitive columns (timestamps are JS Dates) to strings before
 *     // returning to the client, or React will refuse to render them:
 *     return rows.map((r) => ({ ...r, created_at: String(r.created_at) }));
 *   });
 */
export const sql = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set — connect a database (via the database card) before running queries."
    );
  }
  // `Bun.sql` is a callable Postgres handle; referencing it lazily keeps the
  // helper safe to import in non-Bun runtimes unless a query is actually run.
  const bunSql = (globalThis as unknown as { Bun?: { sql?: unknown } }).Bun?.sql;
  if (typeof bunSql !== "function" && typeof bunSql !== "object") {
    throw new Error("No database driver available (expected Bun runtime with Bun.sql).");
  }
  return bunSql;
};
