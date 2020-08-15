module.exports = (bot) => {
  bot.on('ready', () => {
    let botActivity = [
      {
        activity: {
          type: 'LISTENING',
          name: 'Rainy Day - MrDougz',
        },
      },
      {
        activity: {
          type: 'PLAYING',
          name: `Add me to your server!`,
        },
      },
      {
        activity: {
          type: 'PLAYING',
          name: `Hollow Knight is amazing...`,
        },
      },
      {
        activity: {
          type: 'WATCHING',
          name: 'MrDougz Channel',
        },
      },
    ]

    let maxIndex = botActivity.length - 1

    let currentIndex = 0

    setInterval(() => {
      bot.user.setPresence(botActivity[currentIndex])

      currentIndex++
      if (currentIndex > maxIndex) {
        currentIndex = 0
      }
    }, 7000)
  })
}
