const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv')

dotenv.config()

const bot = new Discord.Client()
bot.commands = new Discord.Collection()
bot.queues = new Map()

const commandFiles = fs
  .readdirSync(path.join(__dirname, '/commands'))
  .filter((filename) => filename.endsWith('.js'))

for (let filename of commandFiles) {
  const command = require(`./commands/${filename}`)

  for (name of command.names) {
    bot.commands.set(name, command)
  }
}

bot.login(procces.env.token)

bot.on('ready', () => {
  bot.user.setPresence({
    activity: {
      type: 'LISTENING',
      name: 'Rainy Day - MrDougz (avaible on SoundCloud)',
    },
    status: 'idle',
  })
})

bot.on('message', (msg) => {
  if (!msg.content.startsWith(procces.env.prefix) || msg.author.bot) return

  const args = msg.content.slice(procces.env.prefix.length).split(' ')
  const command = args.shift().toLowerCase()
  try {
    bot.commands.get(command).execute(bot, msg, args)
  } catch (err) {
    return
  }
})
