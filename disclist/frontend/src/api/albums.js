const BASE_URL = "http://localhost:8000"

export async function fetchAlbums() {
    const res = await fetch(`${BASE_URL}/albums/`)
    if (!res.ok) throw new Error("Failed to fetch albums")
    return res.json()
}