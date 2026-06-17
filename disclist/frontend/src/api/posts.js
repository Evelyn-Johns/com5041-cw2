const BASE_URL = "http://localhost:8000"

export async function fetchPosts() {
    const res = await fetch(`${BASE_URL}/posts/`)
    if (!res.ok) throw new Error("Failed to fetch posts")
    return res.json()
}

export async function fetchPostsByAlbum(albumId) {
    const res = await fetch(`${BASE_URL}/posts/album/${albumId}`)
    if (!res.ok) throw new Error("Failed to fetch posts for album")
    return res.json()
}

export async function fetchUserPosts(username) {
    const res = await fetch(`${BASE_URL}/posts/user/${username}`)
    if (!res.ok) throw new Error("Failed to fetch posts")
    return res.json()
}

// export async function createPost(postData) {
//     const res = await fetch(`${BASE_URL}/posts/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(postData)
//     })
//     if (!res.ok) throw new Error("Failed to create post")
//     return res.json()
// }