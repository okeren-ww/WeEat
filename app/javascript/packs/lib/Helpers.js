export default function calcStars(rating) {
  let stars = '';
  for (let i = 0; i < rating; i = i + 1) {
    stars = stars + '★';
  }
  return stars;
}
