const Discord = require("discord.js"); 
const { truncateSync } = require("fs");
const { prefix, token, color, commands } = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {
  // Restricts commands to bot commands channels
  let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === `${commands}`)
  const wrongChannelEmbed = new Discord.MessageEmbed()
    .setColor('#FF6961')
    .setTitle("error!")
    .setDescription("wrong channel!")
    .addField("i live in:", `<#${botCommandsChannel.id}>`)
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  if(message.channel != botCommandsChannel && message.author.id != message.guild.owner.id) {
    message.delete()
   message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
  } else {
    let helpMembersEmbed = new Discord.MessageEmbed()
     .setTitle(`${bot.user.username}'s help menu!`)
     .setDescription("All the possible commands you can do you can do!\n*Reminder that these are all case sensitive commands!*")
     .addField(`\`${prefix}sinfo\``, "Tell's you the discord server information.", true)
     .addField(`\`${prefix}uinfo\``, "Tell's you your discord account information or someone else's.", true)
     .addField(`\`${prefix}boba\``, "Gives you a BOBA!", true)
     .addField(`\`${prefix}calc\``, "A simple math's calculator!", true)
     .addField(`\`${prefix}boop\``, "Pick someone to give a nice boop!", true)
     .addField(`\`${prefix}eadd\``, "Adds in an emote of your choice!")
     .addField(`\`${prefix}eedit\``, "Rename a custom emote from this server!", true)
     .addField(`\`${prefix}radd\``, "Adds in an rank of your choice!", true)
     .addField(`\`${prefix}rget\``, "Gives you a rank that already exists!", true)
     .addField(`\`${prefix}rremove\``, "Removes a rank from you that you don't want!", true)
     .addField(`\`${prefix}cmsg\``, "Add in a custom command for the bot to repeat!", true)
     .addField(`\`${prefix}transcript\``, "Collects messages for you and send it to you in a HTML.")
     .addField(`\`${prefix}about\``, "Information about the creator of this bot!")
     .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setColor(color)
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    message.channel.send(helpMembersEmbed)
  }
};

module.exports.help = {
  name: "help"
}