const execute = (bot, msg, args) => {
  let string = '====HELP====\n\n'

  bot.descs.forEach((desc) => {
    if (desc) {
      string += `\`${process.env.prefix}${bot.mainName[desc]}: ${desc}\`\n`
    }
  })

  return msg.channel.send(`${msg.author},\n${string}`)
}

module.exports = {
  names: ['help', 'h'],
  execute,
}
