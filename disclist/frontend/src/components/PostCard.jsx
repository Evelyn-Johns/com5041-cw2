import StarRating from "./StarRating"

export default function PostCard({ post }) {
    return (
        <div className="card bg-base-200 w-80">
            <div className="card-body">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="card-title">{post.album_name}</h2>
                        <p className="text-sm opacity-70">{post.artist_name}</p>
                    </div>
                    <div className="badge badge-ghost text-xs">{post.username}</div>
                </div>
                <StarRating name={`rating-${post.id}`} value={post.rating} readonly />
                {post.review && <p className="text-sm mt-2">{post.review}</p>}
                <div className="card-actions mt-3 justify-between items-center">
                    {/* <div className="flex gap-2 text-sm opacity-70">
                        <span>♡ {post.like_count ?? 0}</span>
                        <span>💬 {post.comment_count ?? 0}</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}