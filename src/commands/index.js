import { processRoll } from './rollCommand'
import { processDummy } from './dummyCommands'

const processCommand = message => {
  // splitting command into args
  const [command, ...args] = message.content.slice(1).split(' ')

  console.log(`"${command}" has been called with the following args: ${args}`)

  switch (command) {
    case 'roll':
      processRoll(message, args)
      break

    default: processDummy(message)
  }
}

export default processCommand
