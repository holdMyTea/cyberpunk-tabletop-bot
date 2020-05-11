import { rollD10 } from '../utils/diceRolls'
import db from '../db'
import { formatRollMessage } from '../utils/outputFormatter'

/**
 * Accepts user mention, attribute, shortSkillName and [modifier],
 * i.e. `!roll @holdMyTea REF танцы -3`
 * looks up char assigned to user, pulls his attr and skill stats,
 * rolls the dice, and prints all this out.
 * @param {Object} message - Discord message
 * @param {string[]} args - command args
 */
const processRoll = (message, args) => {
  if (message.mentions.users.size !== 1) {
    message.reply('You must tag one player :angry:')
    return
  }
  if (args.length < 3) {
    message.reply('Stap!!1 You must supply 3 or 4 arguments :cry:')
    return
  }

  const [user, attribute, skillQuery, modifier = ''] = args
  const discordId = user.slice(3, user.length - 1)

  fetchCharacterStats(discordId, attribute, skillQuery)
    .then(data => {
      if (data.length === 0) {
        message.reply('Stap!!1 :cry:')
        return
      }

      const { charName, attrValue, fullSkillName, skillValue } = data[0]

      message.channel.send(
        formatRollMessage(
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

/**
 * Fetches the db for the attr and skill values of the character
 * assigned to the discord user (by means of a 6-story select) and
 * the full name of the skill.
 * @param {string} discordId - ID of the discord user
 * @param {string} attribute - name of the attribute
 * @param {string} skillQuery - query string to match the skill
 */
function fetchCharacterStats (discordId, attribute, skillQuery) {
  // i am not proud of this query, relative db gods forgive me
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
              SELECT id FROM skills WHERE (name LIKE '%${skillQuery}%' OR short_name='${skillQuery}') LIMIT 1
            )
          ) chski ON chski.char_id = c.id
        WHERE c.user_id = (SELECT id FROM users WHERE discord_id='${discordId}') 
          AND chatt.attribute_id = (SELECT id FROM attributes WHERE name='${attribute}')
      ) s1, 
      (SELECT name FROM skills WHERE (name LIKE '%${skillQuery}%' OR short_name='${skillQuery}') LIMIT 1) s2;
  `)
}

export {
  processRoll,
  fetchCharacterStats
}
