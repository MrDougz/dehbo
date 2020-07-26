const execute = (bot, msg, args) => {
  let string = '====HELP====\n\n'
  bot.mainName.forEach((name) => {
    bot.descs.forEach((desc) => {
      if (desc) {
        string += `\`${process.env.prefix}${bot.mainName.get(
          name
        )}: ${bot.descs.get(desc)}\`\n`
      }
    })
  })

  return msg.channel.send(`${msg.author},\n${string}`)
}

module.exports = {
  names: ['help', 'h'],
  execute,
}
