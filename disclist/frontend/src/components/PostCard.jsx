import StarRating from "./StarRating";

export default function PostCard({ post }) {
    return (
        <div className="card bg-base-200 w-80 shrink-0">
            <div className="card-body p-3">

                <div className="flex gap-3 items-start">
                    <div className="shrink-0">
                        <img
                            src="https://placehold.co/100x100"
                            alt={post.album_name}
                            className="w-15 h-15 rounded-md object-cover"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h2 className="card-title text-sm leading-tight">
                            {post.album_name}
                        </h2>
                        <p className="text-xs opacity-70">
                            {post.artist_name}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <div className="text-xs opacity-70">
                            {post.username}
                        </div>

                        <div className="avatar">
                            <div className="w-8 rounded-full">
                                <img
                                    src="https://placehold.co/100x100"
                                    alt="avatar"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-1">
                    <StarRating
                        name={`rating-${post.id}`}
                        value={post.rating}
                        readonly
                    />

                    {post.review && (
                        <p className="text-xs mt-1 opacity-90">
                            {post.review}
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}