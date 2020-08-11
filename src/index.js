const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv')

dotenv.config()

const bot = new Discord.Client()

bot.commands = new Discord.Collection()

bot.dmcommands = new Discord.Collection()

bot.uniqueCommand = new Discord.Collection()
bot.dmuniqueCommand = new Discord.Collection()

bot.queues = new Map()

//main commands
const commandFiles = fs
  .readdirSync(path.join(__dirname, '/commands'))
  .filter((filename) => filename.endsWith('.js'))

for (let filename of commandFiles) {
  const command = require(`./commands/${filename}`)

  bot.uniqueCommand.set(command.names[0], command)

  for (name of command.names) {
    bot.commands.set(name, command)
  }
}

//'direct message' commands
const dmCommandFiles = fs
  .readdirSync(path.join(__dirname, '/dmcommands'))
  .filter((filename) => filename.endsWith('.js'))

for (let filename of dmCommandFiles) {
  const command = require(`./dmcommands/${filename}`)

  bot.dmuniqueCommand.set(command.names[0], command)

  for (name of command.names) {
    bot.dmcommands.set(name, command)
  }
}

bot.login(process.env.token)

require('./events/on-ready')(bot)
require('./events/on-message')(bot)
