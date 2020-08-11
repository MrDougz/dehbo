const execute = async (bot, msg, args) => {
  if (!msg.member.hasPermission('KICK_MEMBERS')) {
    return msg.reply('Sorry, but you cannot kick a member!')
  }
  let member = msg.mentions.members.first()
  if (!member)
    return msg.reply('Please, mention a valid member.')
  if (!member.kickable)
    return msg.reply(
      'I cannot kick this member! They may have a higher role or I am not allowed to kick a member'
    )

  let reason = args.slice(1).join(' ')
  if (!reason) reason = '`no reason provided`'

  await member
    .kick(reason)
    .catch((error) =>
      msg.reply(
        `Sorry ${msg.author}, an error occurred and I can't ban the member! Error: ${error}`
      )
    )
  msg.channel.send(
    `${member.user} was kicked by ${msg.author}. Reason: ${reason}`
  )
}

module.exports = {
  names: ['kick', 'expulsar'],
  desc: 'Kick a member from the server',
  execute,
}
