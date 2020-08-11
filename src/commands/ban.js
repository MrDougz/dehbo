const execute = async (bot, msg, args) => {
  if (!msg.member.hasPermission('BAN_MEMBERS')) {
    return msg.reply('Sorry, but you cannot ban a member!')
  }
  let member = msg.mentions.members.first()
  if (!member) return msg.reply('Please, mention a valid member.')
  if (!member.bannable) {
    return msg.reply(
      'I cannot ban this member! They may have a higher role or I am not allowed to ban a member'
    )
  }

  let reason = String(args.slice(1).join(' '))

  console.log(reason)

  if (!reason) reason = '`no reason provided`'

  await member
    .ban({ reason })
    .catch((error) =>
      msg.channel.send(
        `Sorry ${msg.author}, an error occurred and I can't ban the member! Error: ${error}`
      )
    )
  return msg.channel.send(
    `${member.user} was banned by ${msg.author}.\n\nReason: ${reason}`
  )
}

module.exports = {
  names: ['ban', 'banir'],
  desc: 'Ban a member from the server',
  execute,
}
