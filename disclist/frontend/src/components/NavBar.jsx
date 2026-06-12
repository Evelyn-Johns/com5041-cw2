import { useModal } from "../context/ModalContext"
import { useAuth } from "../context/AuthContext"

export default function NavBar() {
    const { openLoginModal } = useModal()
    const { isLoggedIn, user } = useAuth()

    return (
        <div className="navbar bg-base-200 shadow-sm justify-between">
            <a className="btn btn-ghost text-xl">DiscList</a>

            <div className="flex items-center gap-3">

                {isLoggedIn && (
                    <div className="avatar placeholder px-2">
                        <div className="bg-neutral text-neutral-content rounded-full w-11 flex items-center justify-center">
                            <span className="text-l">{user.username[0].toUpperCase()}</span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}