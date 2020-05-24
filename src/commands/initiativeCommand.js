import db from '../db'
import { rollD10 } from '../utils/diceRolls'

/**
 * Looks up characters REF and INT commands, rolls d10
 * and prints the resulting initiative value.
 * @param {Object} message - Discord message
 */
const processInitiativeCommand = message => {
  const { id } = message.author
  db.query(`
    SELECT
      c.name AS 'characterName', 
      ca.attr_value AS 'attributeValue',
      a.name AS 'attributeName'
    FROM char_attrs ca
    LEFT JOIN attributes a ON ca.attribute_id=a.id
    LEFT JOIN characters c ON ca.char_id=c.id
    WHERE char_id=(
      SELECT id FROM characters WHERE user_id=${id}
    ) AND (
      attribute_id=(SELECT id FROM attributes WHERE name='INT')
      OR
      attribute_id=(SELECT id FROM attributes WHERE name='REF')
    )
  `).then(record => {
    if (record.length === 0) { // means this user doesn't have a char
      message.reply('Character is not picked :sob:')
    } else if (record.length === 2) { // good result: one row for INT, second -- for REF
      const charName = record[0].characterName
      const refValue = record.find(row => row.attributeName === 'REF').attributeValue
      const intValue = record.find(row => row.attributeName === 'INT').attributeValue
      const d10 = rollD10()

      message.reply(
        '```\n' +
        `${charName} rolls initiative:\n` +
        `REF: ${refValue}\n` +
        `INT: ${intValue}\n` +
        `d10: ${d10}\n` +
        ''.padEnd(20, '-') + '\n' +
        `Total: ${refValue + intValue + d10}\n` +
        '```\n'
      )
    } else { // char doesn't have one of the attributes or have more than 1
      message.reply('Smth went wront :sob:')
      console.error(record)
    }
  })
}

export {
  processInitiativeCommand
}
