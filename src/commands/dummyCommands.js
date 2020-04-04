/* processing simple commands here,
that will only reply with hardcoded value */
const processDummy = (message) => {
  if (message.content === '!map') {
    message.channel.send('https://imgur.com/a/Od1lUFi')
  }

  if (message.content === '!help') {
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
  }
}

export {
  processDummy
}
