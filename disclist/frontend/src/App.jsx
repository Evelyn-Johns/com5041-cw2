import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ModalProvider } from "./context/ModalContext"
import { AuthProvider } from "./context/AuthContext"
import AlbumModal from "./components/modals/AlbumModal"
import LoginModal from "./components/modals/LoginModal"
import RegisterModal from "./components/modals/RegisterModal"
import NavBar from "./components/NavBar"
import Dock from "./components/Dock"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Diary from "./pages/Collection"
import Profile from "./pages/Profile"
import { useModal } from "./context/ModalContext"
import { useAuth } from "./context/AuthContext"

function ModalRenderer() {
    const { activeModal, selectedAlbum, closeModal, openLoginModal, openRegisterModal } = useModal();
    return (
        <>
            {activeModal === "album" && (
                <AlbumModal
                    album={selectedAlbum}
                    onClose={closeModal}
                />
            )}
            {activeModal === "login" && (
                <LoginModal
                    onClose={closeModal}
                    onSwitchToRegister={openRegisterModal}
                />
            )}
            {activeModal === "register" &&(
                <RegisterModal
                    onClose={closeModal}
                    onSwitchToLogin={openLoginModal}
                />
            )}
        </>
    )
}

export default function App() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}