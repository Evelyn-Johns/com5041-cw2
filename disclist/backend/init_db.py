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
    
if __name__ == "__main__":
    init_db()