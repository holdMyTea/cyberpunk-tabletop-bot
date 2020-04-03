import { rollD10 } from '../utils/diceRolls'
import db from '../db'

const formatMessage = createMessageFormatter()

const processRoll = (message, args) => {
  if (message.mentions.users.size !== 1) {
    message.reply('You must tag one player :angry:')
    return
  }

  const [user, attribute, skill, modifier = ''] = args

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
          rollD10(),
          modifier
        )
      )
    })
}

function createMessageFormatter (lineWidth = 40) {
  const formatLine = (left, right) =>
    left + ':'.padEnd(lineWidth - (left.length + right.length + 1)) + right + '\n'

  /**
   * Formats the roll message and calculates total.
   * @param {string} charName - name of the character
   * @param {string} attribute - name of the attribute
   * @param {number} attrValue - attribute's value
   * @param {string} skill - name of the skill
   * @param {number} skillValue - skill's value
   * @param {number} diceRoll - value of the dice roll
   * @returns {string} formatted message
   */
  const formatMessage = (charName, attribute, attrValue, skill, skillValue, diceRoll, modifier = '') => {
    const intModifier = Number.parseInt(modifier)

    const total = Number.isNaN(intModifier)
      ? attrValue + skillValue + diceRoll
      : attrValue + skillValue + diceRoll + intModifier

    return '```\n' +
      `${charName} rolls:\n` +
      formatLine(attribute, attrValue.toString()) +
      formatLine(skill, skillValue.toString()) +
      formatLine('d10', diceRoll.toString()) +
      (Number.isNaN(intModifier) ? '' : formatLine('Modifier', modifier)) +
      ''.padEnd(lineWidth, '-') + '\n' +
      formatLine('Total', total.toString()) +
      '```\n'
  }

  return formatMessage
}

/**
 * Fetches the db for the attr and skill values of the character
 * assigned to the discord user (by means of a 6-story select)
 * @param {string} discordId - ID of the discord user
 * @param {string} attribute - name of the attribute
 * @param {string} skill - name of the skill
 */
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
