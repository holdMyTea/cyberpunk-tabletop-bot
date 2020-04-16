import db from '../db'
import { rollD10, rollDice } from '../utils/diceRolls'
import { createShootFormatter } from '../utils/outputFormatter'

// TODO: add a formatter (probably in a separate file)

// 1. Make a skill roll for REF + weapon sill + d10
// 2. Make a roll for weapon's damage
// 3. Make a roll for enemy's hit area
const processShootCommand = (message) => {
  const discordId = message.author.id

  fetchShootStats(discordId)
    .then(data => {
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

      const d10 = rollD10()

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
        d10
      )

      const { damageTotal, damageRolls, damnageConstPart } = rollDamage(weaponDamageStat)
      formatter.appendDamageRoll(
        weaponName,
        weaponDamageStat,
        damageTotal,
        damageRolls,
        damnageConstPart
      )

      message.channel.send(formatter.message)
    })
}

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
  `).then(data => data[0])
}

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

export {
  processShootCommand
}
