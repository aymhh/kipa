const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {
  let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === `${commands}`)
  const wrongChannelEmbed = new Discord.MessageEmbed()
    .setColor('#FF6961')
    .setTitle("error!")
    .setDescription("wrong channel!")
    .addField("i live in:", `<#${botCommandsChannel.id}>`)
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
   ;
   if(message.channel != botCommandsChannel) {
    message.delete()
    message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
    return ;
  }

  const formatEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("removing roles!")
    .setDescription("want a rank taken off you?")
    .addField("simply just follow the format:", "```" + `${prefix}` + "rremove <name of role>```\n*do be very careful with the case sensitivity and spelling!*")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const messageargs = args.slice(0).join(" ").split('|');  
  if (!messageargs[0]) {
      return message.channel.send(formatEmbed);
  } else if (messageargs[0]) {
    const rankName = messageargs[0]
    const rankNameSliced = messageargs[0].slice(0, -1)
    const successEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("success!")
      .setDescription("i have removed that role for you")
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    if(message.guild.roles.cache.find(role => role.name === rankName)) {
      const createdRole = message.guild.roles.cache.find(role => role.name === rankName)
      message.guild.roles.fetch({force: true}).then(message.member.roles.remove(createdRole))
      return message.channel.send(successEmbed)    
    } else if (message.guild.roles.cache.find(role => role.name === rankNameSliced)) {
      const createdRole2 = message.guild.roles.cache.find(role => role.name === rankNameSliced)
      message.guild.roles.fetch({force: true}).then(message.member.roles.remove(createdRole2))
      return message.channel.send(successEmbed)
    } else if(Error){ 
      message.channel.send(Error)
      message.channel.send("an error has occured! debugger 49 rremove <@176610715686273024>")
    }
  }
}

module.exports.help = {
  name: "rremove"
}

