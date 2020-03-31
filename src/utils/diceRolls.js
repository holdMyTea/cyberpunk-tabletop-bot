const rollDice = (d) => Math.floor(Math.random() * d) + 1

const rollD6 = () => rollDice(6)
const rollD10 = () => rollDice(10)

export {
  rollD6,
  rollD10
}
