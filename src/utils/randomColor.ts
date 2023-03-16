const randomColor = () => {
  const hexValues = '0123456789abcdef'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += hexValues[Math.floor(Math.random() * hexValues.length)]
  }
  return color
}

export { randomColor }
