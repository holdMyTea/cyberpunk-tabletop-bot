import { rollD10 } from '../utils/diceRolls'
import db from '../db'

const formatMessage = createMessageFormatter()

const processRoll = (message, args) => {
  const [user, attribute, skill] = args

  const discordId = user.slice(3, user.length - 1)

  fetchCharacterStats(discordId, attribute, skill)
    .then(data => {
      const { charName, attrValue, skillValue } = data[0]

      message.channel.send(
        formatMessage(
          charName,
          attribute,
          attrValue,
          skill,
          skillValue || 0,
          rollD10()
        )
      )
    })
}

function createMessageFormatter (lineWidth = 40) {
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

function fetchCharacterStats (discordId, attribute, skill) {
  return db.query(`
  SELECT
    c.name AS 'charName',
    chatt.attr_value AS 'attrValue',
    chski.skill_value as 'skillValue'
  FROM characters c
    LEFT JOIN char_attrs chatt ON chatt.char_id = c.id
    LEFT JOIN (
      SELECT * FROM char_skills WHERE skill_id=(
        SELECT id FROM skills WHERE name='${skill}'
      )
    ) chski ON chski.char_id = c.id
  WHERE c.user_id = (SELECT id FROM users WHERE discord_id="${discordId}") 
    AND chatt.attribute_id = (SELECT id FROM attributes WHERE name="${attribute}");
  `)
}

export {
  processRoll
}
