const tones = {
  Alex: '#1a73e8',
  Nathan: '#188038',
  Maya: '#9334e6',
  Sam: '#e37400',
  Riley: '#d93025',
  Joseph: '#174ea6',
  John: '#1967d2',
  Priya: '#c5221f',
}

export function initial(name) {
  return name.slice(0, 1)
}

export function tone(name) {
  return tones[name] || '#5f6368'
}
