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
      message.reply(`
      > __**Character assignment**__
      **!freeChars** - prints the list of unassigned characters from db, with their IDs
      **!pick** *charId* - assignes character with *charId* to Discord user who entered this command
      **!myChar** - prints the name of the assigned character
      > __**Stat-based commands (character must be picked first)**__
      **!roll** *attribute skillQuery [modifier]* - looks up the character's stats of *attribute* and *skill* (indentified by *skillQuery*) for the character picked by message author, sums them up, adds a *d10* roll and applies modifier if necessary. For exmaple: ${'`!roll REF танцы -3`'}
      **!equip** *[query]* - Equips the weapon matching the *query*. If called without param, prints the name weapon currently equipped by character. For example: ${'`!equip MPK-11`'}
      **!shoot** *hitRequirement* - looks up character and equipped weapon stats and performs the hit roll, if it's more or equal to *hitRequirement* rolls damage and hit area. ${'`!shoot 20`'}
      **!strike** *hitRequirement* - same as **!shoot** (so you don't need to _shoot_ a sword).
      **!init** *[total]* - rolls character's initiative for combat (REF + INT + d10). If called with 'total' param prints the most recent '!init' rolls of all characters.
      > __**Other commands**__
      **!dice** *diceString* - parses the *diceString* and rolls dices, for example: ${'`!dice 4d6+3`'}, ${'`!dice D10`'}, ${'`!dice d3-1`'}.
      **!map** - prints a link for a hosted pic of the Night City map
      **!help** - prints this command reference
      **!skills** *[attribute]* - prints the list of attributes and their short names. If *attribute* is supplied, prints only the skills tied to this attribute
      **!skill** *query* - looks up skill list in db, and prints the list of them that are similar to *query*
      **!up** - bot's greeting :blush: 
      `)
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
