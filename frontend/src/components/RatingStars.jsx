export default function RatingStars({ rating }) {
  const stars = Math.round(rating);

  return (
    <div className="rating rating-sm">
      {[1,2,3,4,5].map((num) => (
        <input
          key={num}
          type="radio"
          className="mask mask-star-2 bg-orange-400"
          checked={num <= stars}
          readOnly
        />
      ))}
    </div>
  );
}