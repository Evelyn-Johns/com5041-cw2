import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import StarRating from "../StarRating"
import { useAuth } from "../../context/AuthContext"
import { createPost } from "../../api/posts"

export default function CreatePostModal({ album, existingPost, onClose, onSaved }) {
    const dialogRef = useRef(null)
    const { token } = useAuth()
    const [rating, setRating] = useState(existingPost?.rating || 0)
    const [review, setReview] = useState(existingPost?.review || "")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dialogRef.current?.showModal()
    }, [])

    const handleSubmit = async () => {
        if (rating === 0) return setError("Please select a rating")
        setLoading(true)
        setError(null)
        try {
            await createOrUpdatePost({ album_id: album.id, rating, review }, token)
            onSaved?.({ rating, review })
            dialogRef.current?.close()
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            <div className="modal-box flex flex-col gap-4 bg-base-200">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => dialogRef.current?.close()}
                >
                    <X className="w-5 h-5 text-primary" />
                </button>

                <div className="flex gap-3 items-center">
                    <img
                        src={album.album_cover || "https://placehold.co/100x100"}
                        alt={album.album_name}
                        className="w-14 h-14 rounded-md object-cover"
                    />
                    <div>
                        <h3 className="font-bold">{album.album_name}</h3>
                        <p className="text-sm opacity-70">{album.artist_name}</p>
                    </div>
                </div>

                {error && <div className="alert alert-error text-sm">{error}</div>}

                <div>
                    <label className="text-sm opacity-70 mb-1 block">Your rating</label>
                    <StarRating name="create-post-rating" value={rating} onChange={setRating} />
                </div>

                <div>
                    <label className="text-sm opacity-70 mb-1 block">Review (optional)</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        rows={3}
                        placeholder="What did you think?"
                        value={review}
                        onChange={e => setReview(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary w-full" onClick={handleSubmit} disabled={loading}>
                    {loading ? <span className="loading loading-spinner" /> : "Post"}
                </button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}