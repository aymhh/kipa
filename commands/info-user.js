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
    message.delete()
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.tag}'s Info`, user.displayAvatarURL({dynamic: true, size: 1024}))
    .setThumbnail(user.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor(color)
    .addField('Member:', message.author.tag, true)
    .addField('Precense:', user.presence.status, true)
    .addField('Bot?', user.bot, true)
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)
  } else {
    let embed2 = new Discord.MessageEmbed()
    .setAuthor(`${mentionedUser.tag}'s Info`, mentionedUser.displayAvatarURL({dynamic: true, size: 1024}))
    .setThumbnail(mentionedUser.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor(color)
    .addField('Member:', mentionedUser.tag, true)
    .addField('Precense:', mentionedUser.presence.status, true)
    .addField('Bot?', mentionedUser.bot, true)
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed2)
  }
}
module.exports.help = {
  name: "uinfo"
}

