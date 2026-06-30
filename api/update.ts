import { Redis } from "@upstash/redis";

export const config = {
  runtime: "edge",
  schedule: "*/10 * * * *"
};

const redis = Redis.fromEnv();

export default async function handler() {
  const places = ["06", "12", "09", "11"];
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const all: any[] = [];

  for (const jcd of places) {
    for (let race = 1; race <= 12; race++) {
      const url = `https://www.boatrace.jp/owpc/pc/race/json/race_racer?jcd=${jcd}&race=${race}&hd=${today}`;
      const data = await fetch(url).then(r => r.json());
      all.push({ jcd, race, data });
    }
  }

  await redis.set("races", all);

  return new Response("OK");
}
