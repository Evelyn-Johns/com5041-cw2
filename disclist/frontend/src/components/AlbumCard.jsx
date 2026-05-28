import { useModal } from "../context/ModalContext";

export default function AlbumCard({ album }) {
    const { openAlbumModal } = useModal();
    
    return (
        <div className="card bg-base-200 w-24 shrink-0 overflow-hidden" onClick={() => openAlbumModal(album)}>
            <figure>
                <img
                    src={album.album_cover || "https://placehold.co/100x100"}
                    alt="Album cover" 
                    className="w-full aspect-square object-cover"
                />
            </figure>
            <div className="card-body p-2 justify-start">
                <div className="flex flex-col gap-0">
                    <p className="text-xs">
                        {album.album_name}
                    </p>
                    <p className="text-[10px] font-light opacity-70">
                        {album.artist_name}
                    </p>
                </div>
            </div>
        </div>
    );
}