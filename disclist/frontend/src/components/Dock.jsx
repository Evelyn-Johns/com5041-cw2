import { NavLink } from "react-router-dom"

export default function Dock() {
    return (
        <div className="dock bg-base-200">
            <NavLink to="/" className={({ isActive }) => (isActive ? "dock-active" : "")}>
                <span className="dock-label">Home</span>
            </NavLink>

            <NavLink to="/search" className={({ isActive }) => (isActive ? "dock-active" : "")}>
                <span className="dock-label">Search</span>
            </NavLink>

            <NavLink to="/collection" className={({ isActive }) => (isActive ? "dock-active" : "")}>
                <span className="dock-label">Collection</span>
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => (isActive ? "dock-active" : "")}>
                <span className="dock-label">Profile</span>
            </NavLink>
        </div>
    )
}

