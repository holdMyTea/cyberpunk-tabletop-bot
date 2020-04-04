import db from '../db'

/**
 * Looks up unassigned characters in DB, and prints them out with IDs.
 * If there is no such chars, will just print a message.
 * @param {Object} message - Discord message
 */
const printUnassignedCharacters = message => {
  db.query('SELECT id,name FROM characters WHERE user_id IS NULL;')
    .then(data => {
      if (data.length === 0) {
        message.channel.send('No unassigned characters left')
        return
      }

      let response = '```\n' +
        'These are the unassigned characters:\n' +
        '------------------------------------\n' +
        'ID   | Name\n' +
        '------------------------------------\n'

      data.forEach(row => {
        response += `${row.id}`.padEnd(5) + `| ${row.name}\n`
      })
      response += '------------------------------------\n' + '```'
      message.channel.send(response)
    })
}

/**
 * Creates user record in DB (if necessary),
 * and assigns the character to it.
 * Outputs confirmation message.
 * @param {Object} message - Discord message
 * @param {string[]} args - arguments of the command
 */
const assignCharacter = (message, args) => {
  const [characterID] = args
  const { id, username } = message.author

  if (Number.isNaN(Number.parseInt(characterID))) {
    message.channel.send('Invalid character ID :angry:')
    return
  }

  // create DB record for the user, if not exists already
  db.query(`
    INSERT INTO users (name, discord_id)
    SELECT * FROM (SELECT '${username}', '${id}') AS tmp
    WHERE NOT EXISTS (
      SELECT discord_id FROM users WHERE discord_id='${id}'
    ) LIMIT 1;
  `) // assing character to the user
    .then(() => db.query(`
      UPDATE characters SET user_id=(
        SELECT id FROM users WHERE discord_id='${id}'
      ) WHERE id=${characterID} AND user_id IS NULL;
    `))
    .then(record => {
      if (record.changedRows === 0) { // this character is already picked by user
        message.reply('This character is already assigned to a user :thinking:')
      } else if (record.changedRows === 1) { // all good, the char is assigned
        message.reply(':white_check_mark: Done, you\'ve got your character')
      } else { // is not really possible, but better have it here
        message.reply('Smth went wrong, couldn\'t really happen :clown:')
      }
    })
}

/**
 * Prints the atuhor's currently assigned char's name.
 * @param {Object} message - Discord message
 */
const printCurrentCharacter = message => {
  const { id } = message.author

  db.query(`
    SELECT name FROM characters WHERE user_id=(SELECT id FROM users WHERE discord_id='${id}');
  `)
    .then(data => {
      if (data.length === 0) {
        message.reply('You don\'t have a character :worried:')
      } else if (data.length === 1) {
        message.reply(`You're playing as ${data[0].name}`)
      }
    })
}

export {
  printUnassignedCharacters,
  assignCharacter,
  printCurrentCharacter
}