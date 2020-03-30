const processDummy = (message) => {
  if (message.content === '!map') {
    message.channel.send('https://imgur.com/a/Od1lUFi')
  }
}

export {
  processDummy
}
