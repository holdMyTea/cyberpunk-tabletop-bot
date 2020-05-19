const rollDice = (d) => Math.floor(Math.random() * d) + 1

const rollD6 = () => rollDice(6)
const rollD10 = () => rollDice(10)

/**
 * @typedef RollDiceStringResult
 * @property {number} total - total of the roll
 * @property {number[]} rolls - array of rolled dice results
 * @property {string[]} staticModifiers - array of static modifiers
 * i.e. in `3d6+5-3` it will be ['+5','-3']
 */

/**
 * Parses dice string makes rolls and returnes total and its breakdown
 * @param {string} query - dice string query, i.e. `4d6+5` or `D10-3`
 * @returns {RollDiceStringResult|null}
 */
const rollDiceString = (query) => {
  if (!/\d?d\d+((\+|-)\d)*/i.test(query)) {
    return null
  }

  const diceRoll = query.match(/\d?d\d+/i)[0]
  const staticModifiers = query.match(/((\+|-)\d+)/g)
  const [rollsNumber, sides] = diceRoll.split(/d/i)

  const rolls = []
  let r
  let total = 0
  for (let i = 0; i < rollsNumber; i++) {
    r = rollDice(sides)
    rolls.push(r)
    total += r
  }
  staticModifiers.forEach(m => (total += Number.parseInt(m)))

  return {
    total,
    rolls,
    staticModifiers
  }
}

export {
  rollDiceString,
  rollDice,
  rollD6,
  rollD10
}
