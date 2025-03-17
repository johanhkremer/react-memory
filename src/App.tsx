import { Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GamePage />} />
      </Routes>
    </div>
  )
}

export default App