import { NavLink } from "react-router-dom"
import { House, Search, Library, User } from "lucide-react"

export default function Dock() {
    return (
        <div className="dock bg-base-200">
            <NavLink to="/" className={({ isActive }) => (isActive ? "dock-active" : "")}>
                <House className="w-5 h-5 text-base-content" />
                {/* <span className="dock-label">Home</span> */}
            </NavLink>

            <NavLink to="/search" className={({ isActive }) => (isActive ? "dock-active" : "")}>
                <Search className="w-5 h-5 text-base-content" />
                {/* <span className="dock-label">Search</span> */}
            </NavLink>

            <NavLink to="/collection" className={({ isActive }) => (isActive ? "dock-active" : "")}>
                <Library className="w-5 h-5 text-base-content" />
                {/* <span className="dock-label">Collection</span> */}
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => (isActive ? "dock-active" : "")}>
                <User className="w-5 h-5 text-base-content" />
                {/* <span className="dock-label">Profile</span> */}
            </NavLink>
        </div>
    )
}

