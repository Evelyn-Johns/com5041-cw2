from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db
from auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(body: RegisterRequest):
    conn = get_db()
    existing = conn.execute(
        "SELECT id FROM users WHERE username = ?", (body.username,)
    ).fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_password = hash_password(body.password)
    conn.execute(
        "INSERT INTO users (username, password_hash) VALUES (?, ?)",
        (body.username, hashed_password)
    )
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(body: LoginRequest):
    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE username = ?", (body.username,)
    ).fetchone()
    conn.close()

    if not user or not verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_access_token(user["id"])
    return {"token": token, "username": user["username"], "user_id": user["id"]}