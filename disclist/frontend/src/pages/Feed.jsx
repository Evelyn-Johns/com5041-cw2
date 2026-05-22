import { useEffect, useState } from "react"
import { fetchPosts } from "../api/posts"
import AlbumCard from "../components/AlbumCard"

export default function Feed() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchPosts()
            .then(setPosts)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg text-primary" /></div>
    if (error) return <div className="alert alert-error m-4">{error}</div>

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-4">
                {posts.map(post => (
                    <AlbumCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}