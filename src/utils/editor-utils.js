export function findWithRegex(regex, contentBlock, callback) {
  const initText = contentBlock.getText()
  let text = initText
  let matchArr = regex.exec(text)
  let start = 0
  let prevLength = 0
  while (matchArr !== null) {
    prevLength = matchArr[0].length
    start = initText.length - text.length + matchArr.index
    callback(start, start + matchArr[0].length)
    text = initText.slice(start + prevLength)
    matchArr = regex.exec(text)
  }
}
