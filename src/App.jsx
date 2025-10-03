import { Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import Landing from "./pages/Landing"
import PrototypePage from "./pages/PrototypePage"
import EssayPage from "./pages/EssayPage"
import Craft from "./pages/Craft"
import Proyectos from "./pages/Proyectos"

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/craft" element={<Craft />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/prototype/:id" element={<PrototypePage />} />
        <Route path="/essay/:slug" element={<EssayPage />} />
      </Routes>
    </LanguageProvider>
  )
}