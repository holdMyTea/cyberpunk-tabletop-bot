import { rollD10 } from '../utils/diceRolls'
import db from '../db'

const formatMessage = createMessageFormatter()

const processRoll = (message, args) => {
  if (message.mentions.users.size !== 1) {
    message.reply('You must tag one player :angry:')
    return
  }

  const [user, attribute, shortSkillNotation, modifier = ''] = args

  const discordId = user.slice(3, user.length - 1)

  fetchCharacterStats(discordId, attribute, shortSkillNotation)
    .then(data => {
      if (data.length === 0) {
        message.channel.send('Stap!!1 :cry:')
        return
      }

      const { charName, attrValue, fullSkillName, skillValue } = data[0]

      message.channel.send(
        formatMessage(
          charName,
          attribute,
          attrValue,
          fullSkillName,
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
 * assigned to the discord user (by means of a 6-story select) and
 * the full name of the skill.
 * @param {string} discordId - ID of the discord user
 * @param {string} attribute - name of the attribute
 * @param {string} shortSkillNotation - short name of the skill
 */
function fetchCharacterStats (discordId, attribute, shortSkillNotation) {
  return db.query(`
    SELECT s1.charName, s1.attrValue, s1.skillValue, s2.name as 'fullSkillName' FROM
      (
        SELECT
          c.name AS 'charName',
          chatt.attr_value AS 'attrValue',
          chski.skill_value as 'skillValue'
        FROM characters c
          LEFT JOIN char_attrs chatt ON chatt.char_id = c.id
          LEFT JOIN (
            SELECT * FROM char_skills WHERE skill_id=(
              SELECT id FROM skills WHERE short_name='${shortSkillNotation}'
            )
          ) chski ON chski.char_id = c.id
        WHERE c.user_id = (SELECT id FROM users WHERE discord_id='${discordId}') 
          AND chatt.attribute_id = (SELECT id FROM attributes WHERE name='${attribute}')
      ) s1, 
      (select name from skills WHERE short_name='${shortSkillNotation}') s2;
  `)
}

export {
  processRoll
}
