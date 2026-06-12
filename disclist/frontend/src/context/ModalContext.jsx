import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [activeModal, setActiveModal] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const openAlbumModal = (album) => {
        setSelectedAlbum(album);
        setActiveModal("album");
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedAlbum(null);
    };

    const openLoginModal = () => {
        setActiveModal("login");
    };

    const openRegisterModal = () => {
        setActiveModal("register");
    };

    return (
        <ModalContext.Provider value={{ activeModal, selectedAlbum, openAlbumModal, openLoginModal, openRegisterModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}