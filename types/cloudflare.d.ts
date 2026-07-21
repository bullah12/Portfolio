interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

declare module "cloudflare:workers" {
  export const env: {
    DB?: import("drizzle-orm/d1/driver").AnyD1Database;
  };
}
