export default function (value) {
  const input = createInputElement()
  document.body.appendChild(input)
  input.value = value
  selectText(input)
  const success = document.execCommand('copy')
  document.body.removeChild(input)
  return success
}

function createInputElement () {
  const input = document.createElement('input')
  input.setAttribute('readonly', 'readonly') // for iOS/Android
  input.style.fontSize = '16px' // for iOS
  hideElementSpuriously(input)
  return input
}

function hideElementSpuriously (element) {
  element.style.position = 'fixed'
  element.style.zIndex = '-1'
}

function selectText (element) {
  element.select()
  const range = document.createRange()
  range.selectNodeContents(element)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  element.setSelectionRange(0, 999999)
}
