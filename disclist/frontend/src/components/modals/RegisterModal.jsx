import { useEffect, useRef, useState } from "react"
import { registerUser } from "../../api/auth"
import { X } from "lucide-react"

export default function RegisterModal({ onClose, onSwitchToLogin }) {
    const dialogRef = useRef(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dialogRef.current?.showModal()
    }, [])

    const handleSubmit = async () => {
        if (password !== confirm) return setError("Passwords do not match")
        if (password.length < 6) return setError("Password must be at least 6 characters")
        setLoading(true)
        setError(null)
        try {
            await registerUser(username, password)
            onSwitchToLogin()
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            <div className="modal-box relative flex flex-col bg-base-200 gap-4 pt-10">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => dialogRef.current?.close()}
                >
                    <X className="w-6 h-6 text-primary" />
                </button>

                <div>
                    <h3 className="font-bold text-lg">Create account</h3>
                </div>

                {error && <div className="alert alert-error text-sm">{error}</div>}

                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered w-full"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="input input-bordered w-full"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    />
                </div>

                <button
                    className="btn btn-primary w-full"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <span className="loading loading-spinner" /> : "Create Account"}
                </button>

                <p className="text-sm text-center opacity-50">
                    Already have an account?{" "}
                    <button className="text-primary" onClick={onSwitchToLogin}>Sign in</button>
                </p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}