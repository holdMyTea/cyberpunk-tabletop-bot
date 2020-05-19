import db from '../db'
import { rollD10, rollDiceString } from '../utils/diceRolls'
import { createShootFormatter } from '../utils/outputFormatter'

/**
 * Accepts the required hit roll value,
 * i.e. `!shoot 20`
 * First it makes the hit roll, if it's less then second arg, prints the miss message,
 * if it's >=, then rolls damage and hit area, and prints them.
 * @param {Object} message - Discord message
 * @param {string[]} args - command args
 */
const processShootCommand = (message, args) => {
  if (args.length !== 1) {
    message.reply('Stap!!1 You must supply only the hit roll requirement! :cry:')
    return
  }

  const [hitRollRequirement] = args
  const discordId = message.author.id

  fetchShootStats(discordId)
    .then(data => {
      // all these are non-null, otherwise promise would be rejected
      const {
        weaponName,
        weaponDamageStat,
        weaponType,
        weaponAccuracy,
        characterName,
        skillName,
        skillValue,
        refValue
      } = data

      const hitRoll = rollD10()
      const hitTotal = refValue + skillValue + weaponAccuracy + hitRoll

      const formatter = createShootFormatter()
      formatter.initializeShootMessage(
        characterName,
        weaponName,
        weaponType
      )

      formatter.appendHitRoll(
        refValue,
        skillName,
        skillValue || 0,
        weaponAccuracy,
        hitRoll,
        hitTotal
      )

      if (hitTotal >= hitRollRequirement) { // character hits their shots
        const { total, rolls, staticModifiers } = rollDiceString(weaponDamageStat)
        formatter.appendDamageRoll(
          weaponName,
          weaponDamageStat,
          total,
          rolls,
          staticModifiers
        )

        const hitAreaRoll = rollD10()
        const hitArea = rollHitArea(hitAreaRoll)
        formatter.appendHitAreaRoll(
          characterName,
          hitArea,
          hitAreaRoll
        )
      } else { // character misses their shots
        formatter.appendMissMessage(characterName)
      }

      message.channel.send(formatter.message)
    })
    // either user did not pick char, or not equipped a weapon
    .catch(error => message.reply(error.message + '!!1 :angry:'))
}

/**
 * @typedef FetchShootStatsResult
 * @property {string} [weaponName] - name of the weapon or `null` of nothing is equipped for the cahracter
 * @property {string} [weaponDamageStat] - weapon's damage stat i.e. `1D6+3` or `null` if weapon is not equipped
 * @property {string} [weaponType] - weapon type i.e. `Light Autopistol` or `null` if weapon is not equipped
 * @property {number} [weaponAccuracy] - weapon's accuracy stat or `null` if weapon is not equipped
 * @property {string} [characterName] - name of the character or `null` if no character picked
 * @property {string} [skillName] - full skill name i.e. `пистолет` or `null` if weapon is not equipped
 * @property {number} [skillValue] - value of the skill required to shoot `weaponType`, can be `null` if no char/weapon picked
 * @property {number} [refValue] - char's `REF` attribute value or `null` if no character picked
 */

/**
 * Fetches db by `discordId` to pull shooting-dependent stats.
 * Resioves with data or thrwos and error.
 * @param {string} discordId - Id of the discord user
 * @returns {Promise<FetchShootStatsResult>} promise resolving into fetched results
 */
function fetchShootStats (discordId) {
  return db.query(`
    SELECT
      w.name AS 'weaponName',
      w.damage AS 'weaponDamageStat',
      wt.name AS 'weaponType',
      w.accuracy AS 'weaponAccuracy',
      c.name AS 'characterName',
      s.name AS 'skillName',
      cs.skill_value AS 'skillValue',
      ca.attr_value AS 'refValue'
    FROM weapons w
      LEFT JOIN weapon_types wt ON w.weapon_type_id=wt.id
      LEFT JOIN equipped_weapons eq ON w.id=eq.weapon_id
      LEFT JOIN skills s ON wt.skill_id=s.id
      LEFT JOIN characters c ON eq.char_id=c.id
      LEFT JOIN char_skills cs ON cs.skill_id=wt.skill_id AND cs.char_id=c.id
      LEFT JOIN char_attrs ca ON ca.char_id=c.id AND ca.attribute_id=(
        SELECT id FROM attributes WHERE name='REF'
      )
    WHERE c.user_id=(SELECT id FROM users WHERE discord_id='${discordId}')
  `).then(data => {
    if (data.length === 0) {
      throw new Error('No character picked or no weapon equipped')
    }
    return data[0]
  })
}

/**
 * Matches the `d10` value with the hit area
 * @param {number} d10
 * @returns {string}
 */
function rollHitArea (d10) {
  switch (d10) {
    case 1:
      return 'head'
    case 2:
    case 3:
    case 4:
      return 'torso'
    case 5:
      return 'right arm'
    case 6:
      return 'left arm'
    case 7:
    case 8:
      return 'right leg'
    case 9:
    case 10:
      return 'left leg'
  }
}

export {
  processShootCommand
}
