from pathlib import Path
from auth import hash_password
import sqlite3

def init_db():
    base_dir = Path(__file__).resolve().parent.parent
    db_path = base_dir / "disclist.db"

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            );
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS artists (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            );
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS albums (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                artist_id INTEGER NOT NULL REFERENCES artists(id),
                name TEXT NOT NULL,
                cover_url TEXT DEFAULT '',
                year INTEGER,
                UNIQUE (artist_id, name)
            );
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL REFERENCES users(id),
                album_id INTEGER NOT NULL REFERENCES albums(id),
                rating INTEGER NOT NULL CHECK (rating BETWEEN 1 and 5),
                review TEXT DEFAULT '',
                created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (user_id, album_id)
            );
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                post_id INTEGER NOT NULL REFERENCES posts(id),
                user_id INTEGER NOT NULL REFERENCES users(id),
                content TEXT NOT NULL
            );
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS likes (
                post_id INTEGER NOT NULL REFERENCES posts(id),
                user_id INTEGER NOT NULL REFERENCES users(id),
                PRIMARY KEY (post_id, user_id)
            );
        """)

        # --- Seed data ---

        users = [
            ("Evelyn", hash_password("password1")),
            ("Lydia", hash_password("password2")),
            ("Lili", hash_password("password3")),
        ]
        cursor.executemany(
            "INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)", users
        )

        artists = [
            ("Daft Punk",),
            ("LCD Soundsystem",),
            ("Massive Attack",),
            ("Underworld",),
            ("Geese",),
            ("American Football",),
            ("English Teacher",),

        ]
        cursor.executemany(
            "INSERT OR IGNORE INTO artists (name) VALUES (?)", artists
        )

        artist_ids = {row[0]: row[1] for row in cursor.execute("SELECT name, id FROM artists")}

        albums = [
            (artist_ids["Daft Punk"], "Random Access Memories", "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Daft_Punk_-_Random_Access_Memories.png/250px-Daft_Punk_-_Random_Access_Memories.png", 2013),
            (artist_ids["LCD Soundsystem"], "LCD Soundsystem", "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Afc_lcd_LCDSoundsystem.gif/250px-Afc_lcd_LCDSoundsystem.gif", 2005),
            (artist_ids["Massive Attack"], "Mezzanine", "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Massive_Attack_-_Mezzanine.png/250px-Massive_Attack_-_Mezzanine.png", 1998),
            (artist_ids["Underworld"], "Everything, Everything (Live)", "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Underworld.everythingeverything.jpg/250px-Underworld.everythingeverything.jpg", 2000),
            (artist_ids["Geese"], "3D Country", "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Geese_-_3D_Country.png/250px-Geese_-_3D_Country.png", 2023),
            (artist_ids["American Football"], "American Football", "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/American_football_band_lp_cover.png/250px-American_football_band_lp_cover.png", 1999),
            (artist_ids["English Teacher"], "This Could Be Texas", "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/English_Teacher_-_This_Could_Be_Texas.png/250px-English_Teacher_-_This_Could_Be_Texas.png", 2024)
        ]
        cursor.executemany(
            "INSERT OR IGNORE INTO albums (artist_id, name, cover_url, year) VALUES (?, ?, ?, ?)", albums
        )

        album_ids = {row[0]: row[1] for row in cursor.execute("SELECT name, id FROM albums")}

        posts = [
            (1, album_ids["Mezzanine"], 4, "LOVE", "2025-06-01 16:32:50"),
            (1, album_ids["Random Access Memories"], 3, "Pretty good", "2025-06-08 20:12:33"),
            (2, album_ids["Mezzanine"], 5, "A masterpiece", "2025-06-01 16:00:00"),
            (3, album_ids["Mezzanine"], 2, "Not my thing", "2025-06-01 16:00:00")
        ]
        cursor.executemany(
            "INSERT OR IGNORE INTO posts (user_id, album_id, rating, review, created) VALUES (?, ?, ?, ?, ?)", posts
        )

        conn.commit()
    
if __name__ == "__main__":
    init_db()