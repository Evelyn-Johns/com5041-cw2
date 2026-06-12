import { useAuth } from "../context/AuthContext"
import { useModal } from "../context/ModalContext"

export default function Profile() {
    const { user, isLoggedIn, logout } = useAuth()
    const { openLoginModal } = useModal()

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
                <p className="opacity-50">You're not signed in</p>
                <button className="btn btn-primary" onClick={openLoginModal}>Sign In</button>
            </div>
        )
    }

    return (
        <div>
            <div className="p-4 border-b border-base-300 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-14 flex items-center justify-center">
                            <span className="text-xl">{user.username[0].toUpperCase()}</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{user.username}</h1>
                    </div>
                </div>
                <button className="btn btn-sm btn-ghost text-error" onClick={logout}>
                    Logout
                </button>
            </div>
            {/* rest of profile content */}
        </div>
    )
}