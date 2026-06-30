const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_READ_ONLY_TOKEN;

export default async function handler() {
  const res = await fetch(`${url}/get/races`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  return Response.json(data);
}