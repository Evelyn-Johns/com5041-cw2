from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db

router = APIRouter(prefix="/posts", tags=["posts"])

# class PostCreate(BaseModel):
#     album_name: str
#     artist_name: str
#     rating: int
#     review: str | None = None

@router.get("/")
def get_posts():
    conn = get_db()
    posts = conn.execute("""
        SELECT posts.id, posts.rating, posts.review,
               albums.name as album_name,
               albums.cover_url as album_cover,
               artists.name as artist_name,
               users.username
        FROM posts
        JOIN albums ON posts.album_id = albums.id
        JOIN artists ON albums.artist_id = artists.id
        JOIN users ON posts.user_id = users.id
    """).fetchall()
    conn.close()
    return [dict(p) for p in posts]

@router.get("/album/{album_id}")
def get_posts_by_album(album_id: int):
    conn = get_db()
    posts = conn.execute("""
        SELECT posts.id, posts.rating, posts.review,
               albums.name as album_name,
               albums.cover_url as album_cover,
               artists.name as artist_name,
               users.username
        FROM posts
        JOIN albums ON posts.album_id = albums.id
        JOIN artists ON albums.artist_id = artists.id
        JOIN users ON posts.user_id = users.id
        WHERE albums.id = ?
    """, (album_id,)).fetchall()
    conn.close()
    return [dict(p) for p in posts]

# @router.post("/")
# def create_post(post: PostCreate):
#     conn = get_db()

#     # get or create artist
#     artist = conn.execute("SELECT id FROM artists WHERE name = ?", (post.artist_name,)).fetchone()
#     if not artist:
#         cursor = conn.execute("INSERT INTO artists (name) VALUES (?)", (post.artist_name,))
#         artist_id = cursor.lastrowid
#     else:
#         artist_id = artist["id"]

#     # get or create album
#     album = conn.execute("SELECT id FROM albums WHERE title = ? AND artist_id = ?", (post.album_name, artist_id)).fetchone()
#     if not album:
#         cursor = conn.execute("INSERT INTO albums (title, artist_id) VALUES (?, ?)", (post.album_name, artist_id))
#         album_id = cursor.lastrowid
#     else:
#         album_id = album["id"]

#     conn.execute(
#         "INSERT INTO posts (user_id, album_id, rating, review) VALUES (?, ?, ?, ?)",
#         (1, album_id, post.rating, post.review)  # user_id hardcoded to 1 until auth is set up
#     )
#     conn.commit()
#     conn.close()
#     return {"message": "Post created"}