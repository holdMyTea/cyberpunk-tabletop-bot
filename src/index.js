import Discord from 'discord.js'
const client = new Discord.Client()

const botSecretToken = 'Njk0MTIxNDE3MDU0MDkzMzEy.XoHBIQ.8OpoRbJwVrG0r92jxZNWaqhZS4s'

client.login(botSecretToken)

client.on('ready', () => {
  console.log('Connected as ' + client.user.tag)

  client.channels.fetch('694120472048041994')
    .then(channel => channel.send('Wake the fuck up, Samurai'))
})

client.on('message', message => {
  if (message.author === client.user) {
    return
  }

  if (message.content === '!map') {
    message.channel.send('https://imgur.com/a/Od1lUFi')
  }
})

client.login(botSecretToken)
