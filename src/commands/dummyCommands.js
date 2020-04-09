// flag to prevetn more than one greeting
let hasGreeted = false

/**
 * Processes simple commands here, that will only reply with hardcoded value
 * @param {Object} message - Discord message
 */
const processDummy = message => {
  switch (message.content) {
    // justs prints a link for a hosted pic of the Night City map
    case '!map':
      message.reply('https://imgur.com/a/Od1lUFi')
      break

    // prints the list of all commands with short instructions
    case '!help':
      message.reply(
        '\n' +
        '!roll @tag attr skill [mod] -- make a roll\n' +
        '!freeChars -- print list of unassigned characres\n' +
        '!pick charId -- pick a character\n' +
        '!myChar -- print name of your current character\n' +
        '!skills [attr] -- print list of the skills\n' +
        '!skill query -- find short name of skill\n' +
        '!map -- show map of the Night City'
      )
      break

    // responds with a Keanu gif and (not) badass text-to-speach greeting
    // will work only once per server launch, so the bad bois won't spam it
    case '!up':
      if (!hasGreeted) {
        message.channel.send('https://tenor.com/view/wake-up-samurai-keanu-reeves-shades-off-cyberpunk2077-gif-15573061')
        message.channel.send('Wake the fuck up, Samurai', { tts: true })
        hasGreeted = true
      }
      break
  }
}

export {
  processDummy
}
