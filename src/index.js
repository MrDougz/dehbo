const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv')

dotenv.config()

const bot = new Discord.Client()
bot.commands = new Discord.Collection()

bot.dmcommands = new Discord.Collection()

bot.queues = new Map()

//main commands
const commandFiles = fs
  .readdirSync(path.join(__dirname, '/commands'))
  .filter((filename) => filename.endsWith('.js'))

for (let filename of commandFiles) {
  const command = require(`./commands/${filename}`)

  for (name of command.names) {
    bot.commands.set(name, command)
  }
}

//'direct message' commands
const dmCommandFiles = fs
  .readFileSync(path.join(__dirname, '/dmcommands'))
  .filter((filename) => filename.endsWith('.js'))

for (let filename of dmCommandFiles) {
  const command = require(`./dmcommands/${filename}`)

  for (name of command.names) {
    bot.dmcommands.set(name, command)
  }
}

bot.login(process.env.token)

bot.on('ready', () => {
  let botActivity = [
    {
      activity: {
        type: 'LISTENING',
        name: 'Rainy Day - MrDougz (avaible on SoundCloud)',
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

bot.on('message', (msg) => {
  if (!msg.content.startsWith(process.env.prefix) || msg.author.bot) return

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
