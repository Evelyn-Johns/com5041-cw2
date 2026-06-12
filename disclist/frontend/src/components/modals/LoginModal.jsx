import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/auth";

export default function LoginModal() {
    const dialogRef = useRef(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    useEffect(() => {
        dialogRef.current?.showModal();
    }, [])

    return (

    );
}