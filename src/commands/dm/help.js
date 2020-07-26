const execute = (bot, msg, args) => {
  return msg.channel.send(
    `hello ${msg.author}! the you can see the list of commands here: `
  )
}

module.exports = {
  names: ['help', 'h', 'ajuda'],
  execute,
}
