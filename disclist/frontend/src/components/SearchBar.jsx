import { Search } from "lucide-react"

export default function SearchBar({ query, setQuery }) {
    return (
        <div>
            <label className="input bg-base-200 w-full rounded-md border-transparent flex items-center gap-2">
                    <input type="search" placeholder="Search..." className="input" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button className="btn btn-xs btn-primary btn-circle">
                        <Search className="w-4 h-4 text-primary-content"/>
                    </button>
            </label>
        </div>
    );
}