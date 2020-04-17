import { processRoll } from './rollCommand'
import { printUnassignedCharacters, assignCharacter, printCurrentCharacter } from './characterCommands'
import { printSkillList, findSkill } from './helpCommands'
import { processDummy } from './dummyCommands'
import { processEquipCommand } from './weaponCommands'
import { processShootCommand } from './shootCommand'

const processCommand = message => {
  // splitting command into args
  const [command, ...args] = message.content.slice(1).split(' ')

  console.log(`"${command}" has been called with the following args: ${args}`)

  switch (command) {
    case 'roll':
      processRoll(message, args)
      break

    case 'freeChars':
      printUnassignedCharacters(message)
      break

    case 'pick':
      assignCharacter(message, args)
      break

    case 'myChar':
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

    case 'shoot':
      processShootCommand(message, args)
      break

    default: processDummy(message)
  }
}

export default processCommand
