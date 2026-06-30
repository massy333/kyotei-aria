import { Routes, Route, Link } from "react-router-dom";
import Race from "./pages/Race";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <Routes>
        {/* トップページ */}
        <Route
          path="/"
          element={
            <div>
              <h1 className="text-3xl font-bold mb-4 text-center">
                競艇アリア（後継）
              </h1>

              <div className="max-w-md mx-auto space-y-4">
                <Link to="/race">
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg shadow">
                    レースを選ぶ
                  </button>
                </Link>
              </div>
            </div>
          }
        />

        {/* 出走表ページ */}
        <Route path="/race" element={<Race />} />
      </Routes>

    </div>
  );
}

export default App;
