const BASE_URL = "http://localhost:8000"

export async function registerUser(username, password) {
    const res = await fetch(`${BASE_URL}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail)
    }
    return res.json()
}

export async function loginUser(username, password) {
    const res = await fetch(`${BASE_URL}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail)
    }
    return res.json()
}