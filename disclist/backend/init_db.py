from pathlib import Path
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
            ("Evelyn", "hashed_password_1"),
            ("Lydia", "hashed_password_2"),
            ("Lili", "hashed_password_3"),
        ]
        cursor.executemany(
            "INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)", users
        )

        artists = [
            ("Daft Punk",),
            ("LCD Soundsystem",),
            ("Massive Attack",),
            ("Underworld",),
        ]
        cursor.executemany(
            "INSERT OR IGNORE INTO artists (name) VALUES (?)", artists
        )

        artist_ids = {row[0]: row[1] for row in cursor.execute("SELECT name, id FROM artists")}

        albums = [
            (artist_ids["Daft Punk"], "Random Access Memories", "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Daft_Punk_-_Random_Access_Memories.png/250px-Daft_Punk_-_Random_Access_Memories.png"),
            (artist_ids["LCD Soundsystem"], "LCD Soundsystem", "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Afc_lcd_LCDSoundsystem.gif/250px-Afc_lcd_LCDSoundsystem.gif"),
            (artist_ids["Massive Attack"], "Mezzanine", "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Massive_Attack_-_Mezzanine.png/250px-Massive_Attack_-_Mezzanine.png"),
            (artist_ids["Underworld"], "Everything, Everything (Live)", "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Underworld.everythingeverything.jpg/250px-Underworld.everythingeverything.jpg")
        ]
        cursor.executemany(
            "INSERT OR IGNORE INTO albums (artist_id, name, cover_url) VALUES (?, ?, ?)", albums
        )

        album_ids = {row[0]: row[1] for row in cursor.execute("SELECT name, id FROM albums")}

        posts = [
            (1, album_ids["Mezzanine"], 4, "LOVE" ),
            (1, album_ids["Random Access Memories"], 3, "Pretty good"),
            (2, album_ids["Mezzanine"], 5, "A masterpiece"),
            (3, album_ids["Mezzanine"], 2, "Not my thing")
        ]
        cursor.executemany(
            "INSERT OR IGNORE INTO posts (user_id, album_id, rating, review) VALUES (?, ?, ?, ?)", posts
        )

        conn.commit()
    
if __name__ == "__main__":
    init_db()