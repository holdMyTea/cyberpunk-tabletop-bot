import { processRoll } from './rollCommand'
import { printUnassignedCharacters, assignCharacter, printCurrentCharacter } from './characterCommands'
import { printSkillList, findSkill } from './helpCommands'
import { processDummy } from './dummyCommands'
import { processEquipCommand } from './weaponCommands'
import { processShootCommand } from './shootCommand'
import { processDiceCommand } from './diceCommand'
import { processInitiativeCommand } from './initiativeCommand'

const processCommand = message => {
  // splitting command into args
  const [command, ...args] = splitCommand(message.content)

  console.log(`"${command}" has been called with ${
    args.length === 0 ? 'no args' : 'the following args: ' + args
  }`)

  switch (command) {
    case 'roll':
      processRoll(message, args)
      break

    case 'freechars':
      printUnassignedCharacters(message)
      break

    case 'pick':
      assignCharacter(message, args)
      break

    case 'mychar':
      printCurrentCharacter(message)
      break

    case 'skills':
      printSkillList(message, args)
      break

    case 'skill':
      findSkill(message, args)
      break

    case 'equip':
      processEquipCommand(message, args)
      break

    case 'strike':
    case 'shoot':
      processShootCommand(message, args)
      break

    case 'dice':
      processDiceCommand(message, args)
      break

    case 'init':
      processInitiativeCommand(message, args)
      break

    default: processDummy(message)
  }
}

/**
 * Splits message into words, prevents empty strings.
 * @param {string} message - Discord command message content
 */
function splitCommand (message) {
  return message
    .slice(1) // removing the leading '!'
    .split(' ') // splitting it by spaces
    .reduce( // ensuring there won't be empty strings if messages has two spaces in a row
      (acc, cur) => {
        if (cur.length > 0) {
          acc.push(cur.toLowerCase())
        }
        return acc
      }, []
    )
}

export default processCommand
