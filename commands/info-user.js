const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {
   // Restricts commands to bot commands channels
   let user = message.author
   let mentionedUser = message.mentions.users.first()
   let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === `${commands}`)
   const wrongChannelEmbed = new Discord.MessageEmbed()
   .setColor(color)
   .setTitle("error!")
   .setDescription("Wrong channel!")
   .addField("Please keep discord bot usage in the correct channel:", `<#${botCommandsChannel.id}>`)
   .setTimestamp()
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
   if(message.channel != botCommandsChannel) {
    message.delete()
    message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
    return;
   }
   if(!mentionedUser) {
    let embed = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s info`)
    .setThumbnail(user.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor(message.member.displayHexColor)
    .addField('Member:', message.author.tag, true)
    .addField('Precense:', user.presence.status, true)
    .addField('Bot?', user.bot, true)
    .addField('Date joined:', message.member.joinedAt)
    .addField('Account Creation:', message.author.createdAt)
    .addField('User ID:', message.author.id)
    .addField('Role count:', message.member.roles.cache.size, true)
    .addField('Roles: ', message.member.roles.cache.map(roles => `${roles}`).join(', '), true)
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)
  } else {
    let embed2 = new Discord.MessageEmbed()
    .setTitle(`${mentionedUser.username}'s info`)
    .setThumbnail(mentionedUser.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor(message.mentions.members.first().displayHexColor)
    .addField('Member:', mentionedUser.tag, true)
    .addField('Precense:', mentionedUser.presence.status, true)
    .addField('Bot?', mentionedUser.bot, true)
    .addField('Date joined:', message.mentions.members.first().joinedAt)
    .addField('Account creation:', mentionedUser.createdAt)
    .addField('User ID:', mentionedUser.id)
    .addField('Role Count:', message.mentions.members.first().roles.cache.size, true)
    .addField('Roles:', message.mentions.members.first().roles.cache.map(r => `${r}`).join(', '), true)
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed2)
  }
}
module.exports.help = {
  name: "uinfo"
}

