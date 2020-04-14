import db from '../db'
import { rollD10 } from '../utils/diceRolls'
import { fetchCharacterStats } from './rollCommand'

// TODO: add a formatter (probably in a separate file)
// TODO: refactor queries, here are double or even triple fetches of the same data

// 1. Make a skill roll for REF + weapon sill + d10
// 2. Make a roll for weapon's damage
// 3. Make a roll for enemy's hit area
const processShootCommand = (message) => {
  const discordId = message.author.id
  let response = ''

  fetchStatsForHitRoll(discordId)
    .then(data => {
      const { charName, attrValue, fullSkillName, skillValue } = data
      const d10 = rollD10()
      response += '```' +
       `${charName} shoots:\n` +
       `REF: ${attrValue}\n` +
       `${fullSkillName}: ${skillValue || 0}\n` +
       `d10: ${d10}\n` +
       `TOTAL: ${attrValue + skillValue + d10}\n` +
       '```'
    })
    .then(() => {
      message.channel.send(response)
    })
}

// TODO: add weapon accuracy to the roll
function fetchStatsForHitRoll (discordId) {
  return db.query(`
    SELECT short_name AS 'weaponSkillName' FROM skills WHERE id=(
      SELECT skill_id FROM weapon_types WHERE id=(
        SELECT weapon_type_id FROM weapons WHERE id=(
          SELECT weapon_id FROM equipped_weapons WHERE char_id=(
            SELECT id FROM characters WHERE user_id=(
              SELECT id FROM users WHERE discord_id='${discordId}'
            )
          )
        )
      )
    )
  `).then(data => {
    const { weaponSkillName } = data[0]
    return fetchCharacterStats(discordId, 'REF', weaponSkillName)
  }).then(data => data[0])
}

export {
  processShootCommand
}
