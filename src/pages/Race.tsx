import { useEffect, useState } from "react";

type Racer = {
  name: string;
  nation: string;
  motor: number;
  frame: number;
  weight: number;
  tilt: number;
};

function Race() {
  const [raceData, setRaceData] = useState<Racer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRace() {
      const res = await fetch(`/api/race?jcd=06&race=12&date=20240630`);
      const data = await res.json();

      // APIの構造に合わせて整形
      setRaceData(data.racer);
      setLoading(false);
    }

    loadRace();
  }, []);

  if (loading) {
    return <p className="p-6">読み込み中...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">出走表（尼崎12R）</h2>

      <div className="grid grid-cols-1 gap-4">
        {raceData.map((r) => (
          <div
            key={r.frame}
            className="border rounded-lg p-4 shadow bg-white"
          >
            <div className="flex justify-between mb-2">
              <span className="text-lg font-bold">
                {r.frame}号艇
              </span>
              <span className="text-gray-500">{r.nation}</span>
            </div>

            <p className="text-xl font-semibold">{r.name}</p>

            <div className="mt-2 text-sm text-gray-600">
              <p>モーター：{r.motor}</p>
              <p>体重：{r.weight}kg</p>
              <p>チルト：{r.tilt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Race;
