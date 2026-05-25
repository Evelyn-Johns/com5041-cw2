import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar"
import Dock from "./components/Dock"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Diary from "./pages/Collection"
import Profile from "./pages/Profile"

export default function App() {
    return (
        <BrowserRouter>
            <div className="bg-base-100 min-h-screen max-w-lg mx-auto relative">
                <NavBar />
                <main className="pb-20">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/collection" element={<Diary />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
                <Dock />
            </div>
        </BrowserRouter>
    )
}