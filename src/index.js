import Discord from 'discord.js'

import env from './config'
import db from './db'
import processCommand from './commands'

const client = new Discord.Client()

db.connectToDatabase(
  (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('DB connected')
    client.login(env.BOT_SECRET_TOKEN)
  }
)

client.on('ready', () => {
  console.log('Bot connected as ' + client.user.tag)

  client.channels.fetch('694120472048041994')
    .then(channel => channel.send('Wake the fuck up, Samurai'))
})

client.on('message', message => {
  // skipping bot's own messages
  if (message.author === client.user) {
    return
  }

  // processing commands only
  if (message.content.startsWith('!')) {
    processCommand(message)
  }
})
