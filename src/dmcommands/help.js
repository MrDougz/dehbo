const execute = (bot, msg, args) => {
  let string = '====HELP====\n\n'

  bot.mainName.forEach((command) => {
    if (command.desc) {
      string += `**\`${process.env.prefix}${command.names[0]}\`** => ${command.desc}\n`
    }
  })

  return msg.reply(`\n${string}`)
}

module.exports = {
  names: ['help', 'h', 'ajuda'],
  execute,
}
