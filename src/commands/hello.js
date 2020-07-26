const execute = (bot, msg, args) => {
  return msg.reply('Hello!!')
}

module.exports = {
  names: ['hello'],
  desc: 'Say a hello message',
  execute,
}
