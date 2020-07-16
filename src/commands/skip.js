const playSong = require('./play').playSong

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.member.guild.id)
  if (!queue) {
    return msg.channel.send('You need to have at least one song playing.')
  }
  if (queue.songs.length === 1) {
    return msg.reply(
      'you don\'t have another song in the queue, do you want to stop? If yes, use the "stop" command.'
    )
  }
  queue.songs.shift()
  bot.queues.set(msg.guild.id, queue)
  playSong(bot, msg, queue.songs[0])
}

module.exports = {
  names: ['skip'],
  execute,
}
