import { rollDiceString } from '../utils/diceRolls'
import { formatDiceMessage } from '../utils/outputFormatter'

/**
 * Parses dice string and performs the roll, i.e.:
 * `!dice 3d6+5-3`, `!dice d10`, `!dice 2 D8 + 1 5`
 * @param {Object} message - Discord message
 * @param {string[]} args - message arguments
 */
const processDiceCommand = (message, args) => {
  const diceString = args.join('')

  const rollResult = rollDiceString(diceString)

  if (rollResult === null) {
    message.reply('Bad dice string!!1 :angry:')
    return
  }

  const { total, rolls, staticModifiers } = rollResult
  message.reply(
    formatDiceMessage(total, rolls, staticModifiers)
  )
}

export {
  processDiceCommand
}
