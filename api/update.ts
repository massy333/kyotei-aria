export const config = {
  runtime: "edge",
  schedule: "*/10 * * * *"
};

export default async function handler() {
  // Edge Runtimeではトップレベルでprocess.envを読むとエラーになるので関数内で読む
//  const KV_URL = process.env.KV_REST_API_URL!;
//  const KV_TOKEN = process.env.KV_REST_API_TOKEN!;
  const KV_URL = (process as any).env.KV_REST_API_URL;
  const KV_TOKEN = (process as any).env.KV_REST_API_TOKEN;
  
  const places = ["06", "12", "09", "11"];
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const all: any[] = [];

  for (const jcd of places) {
    for (let race = 1; race <= 12; race++) {
      const api = `https://www.boatrace.jp/owpc/pc/race/json/race_racer?jcd=${jcd}&race=${race}&hd=${today}`;
      const data = await fetch(api).then((r) => r.json());
      all.push({ jcd, race, data });
    }
  }

  await fetch(`${KV_URL}/set/races`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(all)
  });

  return new Response("OK");
}
