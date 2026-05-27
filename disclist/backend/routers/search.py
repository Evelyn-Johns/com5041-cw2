from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/")
def search(q: str = ""):
    conn = get_db()

    posts = conn.execute("""
        SELECT posts.id, posts.rating, posts.review,
               albums.name as album_name,
               artists.name as artist_name,
               users.username
        FROM posts
        JOIN albums ON posts.album_id = albums.id
        JOIN artists ON albums.artist_id = artists.id
        JOIN users ON posts.user_id = users.id
        WHERE albums.name LIKE ?
        OR artists.name LIKE ?
        OR users.username LIKE ?
        OR posts.review LIKE ?
    """, (f"%{q}%", f"%{q}%", f"%{q}%", f"%{q}%")).fetchall()

    albums = conn.execute("""
        SELECT albums.id,
               albums.name AS album_name,
               albums.cover_url AS album_cover,
               artists.name AS artist_name
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        WHERE albums.name LIKE ?
           OR artists.name LIKE ?
    """, (f"%{q}%", f"%{q}%")).fetchall()

    conn.close()
    return {
        "posts": [dict(p) for p in posts],
        "albums": [dict(a) for a in albums]
    }