import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PrototypePage from "./pages/PrototypePage"
import EssayPage from "./pages/EssayPage"
import Craft from "./pages/Craft"
import Proyectos from "./pages/Proyectos"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/craft" element={<Craft />} />
      <Route path="/proyectos" element={<Proyectos />} />
      <Route path="/prototype/:id" element={<PrototypePage />} />
      <Route path="/essay/:slug" element={<EssayPage />} />
    </Routes>
  )
}