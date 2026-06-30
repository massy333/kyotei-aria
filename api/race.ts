import { Redis } from "@upstash/redis";

export const config = {
  runtime: "edge"
};

const redis = Redis.fromEnv();

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const jcd = url.searchParams.get("jcd");
  const race = url.searchParams.get("race");

  if (!jcd || !race) {
    return new Response("Missing parameters", { status: 400 });
  }

  const raw = await redis.get("races");

  if (!raw) {
    return new Response("No data", { status: 404 });
  }

  // raw は string であるべき
  const all = JSON.parse(raw as string);

  const target = all.find((r: any) => r.jcd === jcd && r.race === Number(race));

  if (!target) {
    return new Response("Race not found", { status: 404 });
  }

  return Response.json(target);
}
