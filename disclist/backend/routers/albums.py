from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db

router = APIRouter(prefix="/albums", tags=["albums"])

@router.get("/")
def get_albums():
    conn = get_db()
    albums = conn.execute("""
        SELECT albums.id,
               albums.name AS album_name,
               artists.name AS artist_name
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
    """).fetchall()
    conn.close()
    return [dict(a) for a in albums]