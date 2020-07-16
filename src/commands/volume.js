const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id)
  if (!queue) {
    return msg.channel.send('You need to have at least one song playing.')
  }
  const volume = Number(args.join(' '))

  if (isNaN(volume) || volume < 0 || volume > 10) {
    return msg.reply(
      'Invalid value! The volume value must be a number between 0 and 10'
    )
  }

  queue.dispatcher.setVolume(volume / 10)
  queue.volume = volume

  bot.queues.set(msg.guild.id, queue)
}
module.exports = {
  names: ['volume', 'vol', 'v'],
  execute,
}
