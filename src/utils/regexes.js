export default {
  price: /^(\-|\+)\d+[a-zA-z]*/,
  hashtag: /\B(#[a-zA-Z]+\b)(?!;)/,
  mention: /@\w+/,
}
