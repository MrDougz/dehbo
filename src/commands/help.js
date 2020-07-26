const execute = (bot, msg, args) => {
  return msg.channel.send(
    `Hello, ${msg.author}! If you want to know all the commands that I have, visit my site! https://dehbo.app.netlify`
  )
}

module.exports = {
  names: ['help', 'h'],
  execute,
}
