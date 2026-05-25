export default function StarRating({ name = "rating", value = 0, readonly = false, size = "rating-lg" }) {
    if (readonly) {
        return (
        <div className={`rating ${size} rating-readonly`}>
            {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="mask mask-star bg-primary"
                style={{ opacity: star <= value ? 1 : 0.2 }} />
            ))}
        </div>
        );
    }

    return (
        <div className={`rating ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
            <input
                key={star}
                type="radio"
                name={name}
                className="mask mask-star bg-primary"
                aria-label={`${star} star`}
                value={star}
                defaultChecked={value === star}
            />
        ))}
        </div>
    );
}