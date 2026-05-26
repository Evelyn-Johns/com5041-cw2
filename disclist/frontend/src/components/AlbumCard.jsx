export default function AlbumCard({ album }) {
    return (
        <div className="card bg-base-200 w-28 shrink-0 overflow-hidden">
            <figure>
                <img
                    src="https://placehold.co/100x100"
                    alt="Album cover" 
                    className="w-full aspect-square object-cover"
                />
            </figure>
            <div className="card-body p-3">
                <div className="text-sm">
                    <p>{album.album_name}</p>
                </div>
                <div className="text-xs opacity-70">
                    <p>{album.artist_name}</p>
                </div>
            </div>
        </div>
    );
}