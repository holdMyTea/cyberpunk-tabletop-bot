import db from '../db'

/**
 * If called without args, will print the currently equpped weapon.
 * If called with a param, will look up the weapon by the query in the first arg
 * and assign it to the user's char.
 * @param {Object} message - Discord message
 * @param {string[]} args - commands args
 */
const processEquipCommand = (message, args) => {
  const { id } = message.author
  if (args.length === 0) {
    printCurrentWeapon(message, id)
  } else {
    equipWeapon(message, id, args[0])
  }
}

function printCurrentWeapon (message, discordId) {
  db.query(`
    SELECT c.name AS 'characterName', w.name AS 'weaponName' FROM characters c
    LEFT JOIN equipped_weapons ew ON c.id=ew.char_id
    LEFT JOIN weapons w ON ew.weapon_id=w.id
    WHERE c.user_id=(
      SELECT id FROM users WHERE discord_id='${discordId}'
    )
  `).then(data => {
    const { weaponName, characterName } = data[0]

    if (!characterName) {
      message.reply('You need to pick character first!!1 :angry:')
      return
    }

    if (!weaponName) {
      message.reply('You don\'t have an equipped weapon yet :cry:')
      return
    }

    message.reply(`${characterName} is currently armed with ${weaponName}`)
  })
}

function equipWeapon (message, discordId, weaponQuery) {

}

export {
  processEquipCommand
}
