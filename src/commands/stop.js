const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.member.guild.id)
  if (!queue) {
    return msg.channel.send('You need to have at least one song playing.')
  }
  queue.songs = []
  bot.queues.set(msg.guild.id, queue)
  queue.dispatcher.end()
}

module.exports = {
  names: ['stop', 's'],
  desc: 'Stop the queue of songs that are playing',
  execute,
}
