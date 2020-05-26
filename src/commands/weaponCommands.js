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
    equipWeapon(message, id, args.join(' '))
  }
}

/**
 * Runs query to db and prints the currently equipped weapon of the character.
 * In case there is no weapon or no character assigned replies with error.
 * @param {Object} message - Discord message
 * @param {string} discordId - Discord ID of the author
 */
function printCurrentWeapon (message, discordId) {
  db.query(`
    SELECT
      c.name AS 'characterName',
      w.name AS 'weaponName',
      wt.name AS 'weaponType'
    FROM characters c
      LEFT JOIN equipped_weapons ew ON c.id=ew.char_id
      LEFT JOIN weapons w ON ew.weapon_id=w.id
      LEFT JOIN weapon_types wt ON w.weapon_type_id=wt.id
    WHERE c.user_id=${discordId}
  `).then(data => {
    const { characterName, weaponName, weaponType } = data[0]

    if (!characterName) {
      message.reply('You need to pick character first!!1 :angry:')
      return
    }

    if (!weaponName) {
      message.reply('You don\'t have an equipped weapon yet :cry:')
      return
    }

    message.reply(`${characterName} is currently armed with ${weaponName} (${weaponType})`)
  })
}

/**
 * Looks up weapon by name using the `weaponQuery` param and equips it for
 * current user's character. Then calls `printCurrentWeapon` to output the
 * current weapon for the user.
 * @param {Object} message - Discord message
 * @param {string} discordId - Discord ID of th user
 * @param {string} weaponQuery - query to find weapon by name
 */
function equipWeapon (message, discordId, weaponQuery) {
  db.query(`
    INSERT INTO equipped_weapons(char_id, weapon_id) VALUES(
      (SELECT id FROM characters WHERE user_id=${discordId}),
      (SELECT id FROM weapons WHERE name LIKE '%${weaponQuery}%')
    ) ON DUPLICATE KEY UPDATE weapon_id=VALUES(weapon_id)
  `).then(() => {
    printCurrentWeapon(message, discordId)
  })
}

export {
  processEquipCommand
}
