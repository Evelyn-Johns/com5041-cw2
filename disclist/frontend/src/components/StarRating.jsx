export default function StarRating({ name, value, onChange, readonly, size = "rating-lg" }) {
  return (
    <div className={`rating ${size} ${readonly ? "pointer-events-none" : ""}`}>
      {[1,2,3,4,5].map(i => (
        <input
          key={i}
          type="radio"
          name={name}
          className={`mask mask-star-2 bg-primary ${readonly && i > value ? "opacity-30" : ""}`}
          checked={readonly ? i === value : undefined}
          onChange={() => onChange?.(i)}
        />
      ))}
    </div>
  )
}