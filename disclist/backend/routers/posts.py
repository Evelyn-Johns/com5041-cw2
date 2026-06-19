from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from database import get_db
from auth import get_current_user
import sqlite3

router = APIRouter(prefix="/posts", tags=["posts"])

class PostCreate(BaseModel):
    album_id: int
    rating: int
    review: str | None = None

@router.post("/")
def create_post(post: PostCreate, current_user = Depends(get_current_user)):
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO posts (user_id, album_id, rating, review) VALUES (?, ?, ?, ?)",
            (current_user["id"], post.album_id, post.rating, post.review)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="You have already reviewed this album")
    finally:
        conn.close()
    return {"message": "Post created"} 

@router.get("/")
def get_posts():
    conn = get_db()
    posts = conn.execute("""
        SELECT posts.id, posts.rating, posts.review,
               albums.name as album_name,
               albums.year as album_year,
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
               albums.year as album_year,
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

@router.get("/album/{album_id}/me")
def get_user_post_for_album(album_id: int, current_user = Depends(get_current_user)):
    conn = get_db()
    post = conn.execute(
        "SELECT * FROM posts WHERE album_id = ? AND user_id = ?",
        (album_id, current_user["id"])
    ).fetchone()
    conn.close()
    return dict(post) if post else None

@router.get("/user/{username}")
def get_user_posts(username: str):
    conn = get_db()
    user = conn.execute("SELECT id FROM users WHERE username = ?", (username,)).fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    posts = conn.execute("""
        SELECT posts.id, posts.rating, posts.review, posts.created,
               albums.name as album_name,
               albums.cover_url as album_cover,
               artists.name as artist_name
        FROM posts
        JOIN albums ON posts.album_id = albums.id
        JOIN artists ON albums.artist_id = artists.id
        WHERE posts.user_id = ?
        ORDER BY posts.created DESC
    """, (user["id"],)).fetchall()
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