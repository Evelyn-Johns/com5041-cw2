from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from database import init_db
from routers import posts, albums, search

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# init_db()

app.include_router(posts.router)
app.include_router(albums.router)
app.include_router(search.router)