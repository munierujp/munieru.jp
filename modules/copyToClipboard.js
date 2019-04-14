export default function (value) {
  const input = document.createElement('input')
  hideElementSpuriously(input)
  document.body.appendChild(input)
  input.value = value
  input.select()
  const success = document.execCommand('copy')
  document.body.removeChild(input)
  return success
}

function hideElementSpuriously (element) {
  element.style.position = 'fixed'
  element.style.zIndex = '-1'
}
