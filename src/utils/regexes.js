export default {
  priceDebt: /^(\-\-|\+\+)\d+[a-zA-z]*/,
  price: /^(\-|\+)\d+[a-zA-z]*/,
  hashtag: /\B(#[a-zA-Z]+\b)(?!;)/,
  mention: /@[\w\.\-]+/,
}
