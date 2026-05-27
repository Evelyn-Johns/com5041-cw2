import { useEffect, useState } from "react"
import { search } from "../api/search"
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults"

export default function Search() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState({ posts: [], albums: []})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!query) {
            setResults({ posts: [], albums: [] })
            setLoading(false)
            return
        } 

        const timeout = setTimeout(() => {
            setLoading(true)

            search(query)
                .then(data => setResults(data))
                .catch(e => setError(e.message))
                .finally(() => setLoading(false))
        }, 300)

        return () => clearTimeout(timeout)
    }, [query])

    // if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg text-primary" /></div>
    if (error) return <div className="alert alert-error m-4">{error}</div>

    return (

        <div className="p-4 flex flex-col justify-center">

            <SearchBar query={query} setQuery={setQuery}/>

            {loading && (
                <div className="flex justify-center p-4">
                    <span className="loading loading-spinner loading-lg text-primary" />
                </div>
            )}

            {!loading && (
                <SearchResults results={results} query={query} />
            )}

        </div>
    )
}