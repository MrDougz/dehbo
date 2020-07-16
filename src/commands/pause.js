const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id)
  if (!queue) {
    return msg.channel.send('You need to have at least one song playing.')
  }
  queue.dispatcher.pause()
}

module.exports = {
  names: ['pause'],
  execute,
}
