import StarRating from "./StarRating"

export default function AlbumCard({ post }) {
  return (
    <div className="card w-80 bg-base-200">
      <figure>
        <img src={post.cover_url || "https://img.daisyui.com/images/blog/daisyui-5.webp"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.album_name}</h2>
        <p className="text-sm opacity-70">{post.artist_name}</p>
        <StarRating name={`rating-${post.id}`} value={post.rating} readonly />
        <div className="card-actions mt-3">
          <button className="btn btn-sm btn-primary">Rate</button>
          <button className="btn btn-sm btn-ghost">Review</button>
        </div>
      </div>
    </div>
  )
}