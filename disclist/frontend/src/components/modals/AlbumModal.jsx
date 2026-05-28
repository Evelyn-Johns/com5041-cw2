import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function AlbumModal({ album, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, [])

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            <div className="modal-box">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => dialogRef.current?.close()}
                >
                    <X className="w-6 h-6 text-primary"/>
                </button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-base-300 rounded w-14 h-14 flex items-center justify-center text-2xl flex-shrink-0">
                        🎵
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{album.album_name}</h3>
                        <p className="text-sm opacity-50">{album.artist_name}</p>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}