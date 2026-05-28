import AlbumCard from "../components/AlbumCard"

export default function SearchResults({ results, query }) {
    const { posts, albums } = results

    if (!query) {
        return (
            <div className="text-center text-base-content/60 mt-8">
                <p className="text-lg">Search for albums or artists</p>
                <p className="text-sm">Try typing something above</p>
            </div>
        )
    }

    if (posts.length === 0 && albums.length === 0) {
        return (
            <div className="text-center text-base-content/60 mt-8">
                No results found for "{query}"
            </div>
        )
    }

    return (
        <div className="mt-4 space-y-6">

            {albums.length > 0 && (
                <div>
                    <h2 className="text-sm font-semibold mb-2 text-base-content/70">
                        Albums
                    </h2>

                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {albums.map(album => (
                            <div key={album.id}>
                                <AlbumCard key={album.id} album={album} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* {posts.length > 0 && (
                <div>
                    <h2 className="text-sm font-semibold mb-2 text-base-content/70">
                        Posts
                    </h2>

                    <div className="space-y-2">
                        {posts.map(post => (
                            <div
                                key={post.id}
                                className="p-3 rounded-lg hover:bg-base-200 cursor-pointer"
                            >
                                <div className="text-sm">
                                    {post.review}
                                </div>
                                <div className="text-xs text-base-content/60 mt-1">
                                    {post.album_name} • {post.artist_name} • @{post.username}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )} */}

        </div>
    )
}