import db from '../db'
import { rollD10, rollDice } from '../utils/diceRolls'
import { createShootFormatter } from '../utils/outputFormatter'

/**
 * Accepts user mention and the required hit roll value,
 * i.e. `!roll @holdMyTea 20`
 * First it makes the hit roll, if it's less then second arg, prints the miss message,
 * if it's >=, then rolls damage and hit are, and prints them.
 * @param {Object} message - Discord message
 * @param {string[]} args - command args
 */
const processShootCommand = (message, args) => {
  if (message.mentions.users.size !== 1) {
    message.reply('You must tag one player :angry:')
    return
  }
  if (args.length < 2) {
    message.reply('Stap!!1 You must supply two arguments! :cry:')
    return
  }

  const [user, hitRollRequirement] = args
  const discordId = user.slice(3, user.length - 1)

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
        const { damageTotal, damageRolls, damnageConstPart } = rollDamage(weaponDamageStat)
        formatter.appendDamageRoll(
          weaponName,
          weaponDamageStat,
          damageTotal,
          damageRolls,
          damnageConstPart
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
 * @typedef RollDamageResult
 * @property {number} damageTotal - total of damage roll
 * @property {number[]} damageRolls - array of all dice damage rolls
 * @property {number} [damnageConstPart] - the `+3` part of `1D6+3`
 */

/**
 * Parses the value raw string damage stat and rolls the damage for the shot
 * @param {string} damageStat - weapon's damage stat, as appears in rulebook, i.e. `1D6+3`, `5D6`
 * @returns {RollDamageResult} results of the damage roll
 */
function rollDamage (damageStat) {
  const [diceRolls, modifier] = damageStat.split('+')
  const [rollsNumber, sides] = diceRolls.split('D')

  const rolls = []
  let r
  let total = 0
  for (let i = 0; i < rollsNumber; i++) {
    r = rollDice(sides)
    rolls.push(r)
    total += r
  }
  total += Number.parseInt(modifier) || 0

  return {
    damageTotal: total,
    damageRolls: rolls,
    damnageConstPart: modifier
  }
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
