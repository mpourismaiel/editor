export function formatPrice(text, divider = ',') {
  text = text.toString()
  const prices = (text.match(/[0-9]+/g) || []).map(price => {
    price = price.trim()
    const leftPad = 3 - price.length % 3
    if (leftPad !== 3) {
      for (let i = 0; i < leftPad; i++) {
        price = ' ' + price
      }
    }

    let tmp = []
    for (let i = 0, j = 3; j <= price.length + 1; i += 3, j += 3) {
      tmp.push(price.slice(i, j))
    }

    return [price.trim(), tmp.join(divider).trim()]
  })
  let result = text
  prices.forEach(([original, formatted], i) => {
    result = result.replace(original, formatted)
  })

  return result
}
