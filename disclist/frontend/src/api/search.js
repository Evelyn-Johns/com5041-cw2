const BASE_URL = "http://localhost:8000"

export async function search(query) {
    const res = await fetch(`${BASE_URL}/search?q=${query}`)
    if (!res.ok) throw new Error("Failed to fetch posts")
    return res.json()
}