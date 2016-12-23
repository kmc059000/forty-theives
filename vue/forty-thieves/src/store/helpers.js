
export const topCard = stack => {
  if (stack._stack.length) {
    return stack._stack[stack._stack.length - 1]
  }
}

export const anyCards = stack => {
  return !!stack._stack.length
}

export const pushCard = (stack, card) => {
  stack._stack.push(card)
}

export const popCard = (stack, card) => {
  return stack._stack.pop()
}
