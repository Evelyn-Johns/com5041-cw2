import { useEffect, useState } from "react"
import { fetchPosts } from "../api/posts"
import PostCard from "../components/PostCard"

export default function Home() {
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

        <div className="p-4 flex flex-col justify-center">

            <div className="mb-2">
                <p className="text-l">Recent</p>
            </div>

            <div className="carousel carousel-center rounded-box max-w-md space-x-4">
                {posts.map(post => (
                    <div key={post.id} className="carousel-item">
                        <PostCard key={post.id} post={post} />
                    </div>
                ))}
            </div>

        </div>
    )
}