const execute = (bot, msg, args) => {
  let string = '====HELP====\n\n'

  bot.dmdescs.forEach((desc) => {
    if (desc) {
      string += `\`${process.env.prefix}${bot.dmmainName}: ${desc}\`\n`
    }
  })

  return msg.channel.send(`${msg.author},\n${string}`)
}

module.exports = {
  names: ['help', 'h', 'ajuda'],
  execute,
}
