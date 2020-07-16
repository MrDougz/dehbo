const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.member.guild.id)
  if (!queue) {
    return msg.channel.send('You need to have at least one song playing.')
  }
  queue.dispatcher.resume()
}

module.exports = {
  names: ['resume', 'r'],
  execute,
}
