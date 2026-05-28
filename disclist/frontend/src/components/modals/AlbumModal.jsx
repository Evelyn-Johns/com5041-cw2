import { useEffect, useState, useRef } from "react";
import { fetchPostsByAlbum } from "../../api/posts";
import { X } from "lucide-react";
import StarRating from "../StarRating";
import ModalPostCard from "../ModalPostCard";

export default function AlbumModal({ album, onClose }) {
    const dialogRef = useRef(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, [])

    useEffect(() => {
        if (album) {
            fetchPostsByAlbum(album.id)
                .then(setPosts)
                .catch(e => console.error(e))
                .finally(() => setLoading(false))
        }
    }, [album])

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            <div className="modal-box flex flex-col bg-base-200 p-3 h-[60vh]">

                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => dialogRef.current?.close()}
                >
                    <X className="w-6 h-6 text-primary"/>
                </button>

                <div className="flex gap-4 mb-4">
                    <img
                        src={album.album_cover || "https://placehold.co/100x100"}
                        alt={album.album_name}
                        className="w-32 h-32 rounded-md object-cover"
                    />

                    <div className="flex flex-col justify-center">
                        <h3 className="font-bold text-xl">
                            {album.album_name}
                        </h3>
                        <p className="text-md opacity-70">
                            {album.artist_name}
                        </p>
                        <p className="text-sm opacity-50">
                            {album.album_year}
                        </p>
                        {/*Year + genre + avg rating*/}
                    </div>
                </div>

                <div className="mb-4">
                    <StarRating readonly={true} />
                </div>

                <div className="flex gap-3 mb-4">
                    <button className="btn btn-primary">
                        Rate
                    </button>
                    <button className="btn btn-outline">
                        Review
                    </button>
                </div>

                <h4 className="font-semibold mb-2">
                        Reviews
                </h4>

                <div className="flex-1 overflow-y-auto">

                    {loading ? (
                        <div className="flex justify-center p-4">
                            <span className="loading loading-spinner loading-lg text-primary" />
                        </div>
                    ) : posts.length ? (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                className="py-1"
                            >
                                <ModalPostCard post={post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-sm opacity-50">
                            No reviews yet
                        </p>
                    )}

                </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}