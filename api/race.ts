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

  // raw が string でない場合は強制的に string に変換
  const text = typeof raw === "string" ? raw : JSON.stringify(raw);

  const all = JSON.parse(text);

  const target = all.find(
    (r: any) => r.jcd === jcd && r.race === Number(race)
  );

  if (!target) {
    return new Response("Race not found", { status: 404 });
  }

  return Response.json(target);
}
