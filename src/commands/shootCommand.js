import db from '../db'
import { rollD10, rollDice } from '../utils/diceRolls'
import { createShootFormatter } from '../utils/outputFormatter'

// 1. Make a skill roll for REF + weapon sill + d10
// 2. Make a roll for weapon's damage
// 3. Make a roll for enemy's hit area
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

      if (hitTotal >= hitRollRequirement) {
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
      } else {
        formatter.appendMissMessage(characterName)
      }

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
