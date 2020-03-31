/* processing simple commands here,
that will only reply with hardcoded value */
const processDummy = (message) => {
  if (message.content === '!map') {
    message.channel.send('https://imgur.com/a/Od1lUFi')
  }
}

export {
  processDummy
}
