const search = require('yt-search')
const ytdl = require('ytdl-core-discord')

const execute = async (bot, msg, args) => {
  const s = args.join(' ')

  try {
    search(s, (err, result) => {
      if (err) {
        throw err
      } else if (result && result.videos.length > 0) {
        const song = result.videos[0]
        const queue = bot.queues.get(msg.guild.id)
        if (queue) {
          queue.songs.push(song)
          bot.queues.set(msg.guild.id, queue)
        } else {
          playSong(bot, msg, song)
        }
      } else {
        return msg.channel.send(
          `Sorry ${msg.author}, but I don't know what song you want! :(`
        )
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const playSong = async (bot, msg, song) => {
  let queue = bot.queues.get(msg.member.guild.id)

  if (!song) {
    if (queue) {
      queue.connection.disconnect()
      return bot.queues.delete(msg.member.guild.id)
    }
  }
  if (!msg.member.voice.channel) {
    return msg.reply('You need to enter in a voice channel!')
  }

  if (!queue) {
    const connection = await msg.member.voice.channel.join()
    queue = {
      volume: 10,
      connection,
      dispatcher: null,
      songs: [song],
    }
  }
  queue.dispatcher = await queue.connection.play(
    await ytdl(song.url, { highWaterMark: 1 << 25, filter: 'audioonly' }),
    {
      type: 'opus',
    }
  )
  queue.dispatcher.on('finish', () => {
    queue.songs.shift()
    playSong(bot, msg, queue.songs[0])
  })
  bot.queues.set(msg.member.guild.id, queue)
}

module.exports = {
  names: ['play', 'p'],
  execute,
  playSong,
}
