import fetch from "node-fetch";

export default async function handler(req, res) {
  const { jcd, race, date } = req.query;

  const url = `https://www.boatrace.jp/owpc/pc/race/json/race_racer?jcd=${jcd}&race=${race}&hd=${date}`;
  const data = await fetch(url).then(r => r.json());

  res.status(200).json(data);
}