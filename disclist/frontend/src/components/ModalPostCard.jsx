import StarRating from "./StarRating";

export default function ModalPostCard({ post }) {
    return (
        <div className="card bg-base-100 w-full">

            <div className="card-body p-3">

                <div className="flex items-center gap-2">
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

                <div className="">
                    <StarRating value={post.rating} readonly />
                </div>

                {post.review && (
                    <div className="text-sm">
                        {post.review}
                    </div>
                )}

            </div>
        </div>
    );
}