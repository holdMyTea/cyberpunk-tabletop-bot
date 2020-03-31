import { rollD10 } from '../utils/diceRolls'

const formatMessage = createMessageFormatter()

const processRoll = (message, args) => {
  const [user, attribute, skill] = args

  console.log('Roll command with the following args: ' + args)

  // const discUser = message.mentions
  // console.log(discUser)

  const charName = 'Billy'
  const attrValue = 7
  const skillValue = 6

  const diceRoll = rollD10()

  message.channel.send(
    formatMessage(
      charName,
      attribute,
      attrValue,
      skill,
      skillValue,
      diceRoll
    )
  )
}

function createMessageFormatter (lineWidth = 15) {
  const formatLine = (left, right) =>
    left + ':'.padEnd(lineWidth - (left.length + right.length + 1)) + right + '\n'

  /**
   * Formats the roll message.
   * @param {string} charName - name of the character
   * @param {string} attribute - name of the attribute
   * @param {number} attrValue - attribute's value
   * @param {string} skill - name of the skill
   * @param {number} skillValue - skill's value
   * @param {number} diceRoll - value of the dice roll
   * @returns {string} formatted message
   */
  const formatMessage = (charName, attribute, attrValue, skill, skillValue, diceRoll) => {
    const total = attrValue + skillValue + diceRoll
    return '```\n' +
      `${charName} rolls:\n` +
      formatLine(attribute, attrValue.toString()) +
      formatLine(skill, skillValue.toString()) +
      formatLine('d10', diceRoll.toString()) +
      ''.padEnd(lineWidth, '-') + '\n' +
      formatLine('Total', total.toString()) +
      '```\n'
  }

  return formatMessage
}

export {
  processRoll
}
