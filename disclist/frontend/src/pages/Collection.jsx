import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useModal } from "../context/ModalContext"
import { fetchUserPosts } from "../api/posts"
import StarRating from "../components/StarRating"
import CollectionPostCard from "../components/CollectionPostCard"

export default function Collection() {
    const { user, isLoggedIn, token } = useAuth()
    const { openLoginModal } = useModal()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false)
            return
        }
        fetchUserPosts(user.username)
            .then(setPosts)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [isLoggedIn])

    if (!isLoggedIn) return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <p className="opacity-50">Sign in to see your collection</p>
            <button className="btn btn-primary" onClick={openLoginModal}>Sign In</button>
        </div>
    )

    if (loading) return (
        <div className="flex justify-center p-8">
            <span className="loading loading-spinner loading-lg text-primary" />
        </div>
    )

    if (error) return <div className="alert alert-error m-4">{error}</div>

    return (
        <div>
            {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] gap-2">
                    <p className="opacity-50">No ratings yet</p>
                    <p className="text-sm opacity-30">Start rating albums to build your collection</p>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto space-y-3 p-3">
                    {posts.map(post => (
                        <CollectionPostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}