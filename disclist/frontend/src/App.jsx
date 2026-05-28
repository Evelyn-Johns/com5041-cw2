import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ModalProvider } from "./context/ModalContext"
import AlbumModal from "./components/modals/AlbumModal"
import NavBar from "./components/NavBar"
import Dock from "./components/Dock"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Diary from "./pages/Collection"
import Profile from "./pages/Profile"
import { useModal } from "./context/ModalContext"

function ModalRenderer() {
    const { activeModal, selectedAlbum, closeModal } = useModal();
    return (
        <>
            {activeModal === "album" && (
                <AlbumModal
                    album={selectedAlbum}
                    onClose={closeModal}
                />
            )}
        </>
    )
}

export default function App() {
    return (
        <ModalProvider>
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
                    <ModalRenderer />
                    <Dock />
                </div>
            </BrowserRouter>
        </ModalProvider>
    )
}