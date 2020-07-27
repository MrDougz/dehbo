module.exports = (bot) => {
  bot.on('message', (msg) => {
    if (!msg.content.startsWith(process.env.prefix) || msg.author.bot) {
      return
    }

    const args = msg.content.slice(process.env.prefix.length).split(' ')
    const command = args.shift().toLowerCase()
    try {
      if (msg.channel.type !== 'dm') {
        bot.commands.get(command).execute(bot, msg, args)
      } else if (msg.channel.type === 'dm') {
        bot.dmcommands.get(command).execute(bot, msg, args)
      }
    } catch (err) {
      console.log(err)
      return
    }
  })
}
