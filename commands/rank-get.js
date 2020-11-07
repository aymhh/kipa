const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {
  let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === `${commands}`)
  const wrongChannelEmbed = new Discord.MessageEmbed()
    .setColor('#FF6961')
    .setTitle("error!")
    .setDescription("Wrong channel!")
    .addField("Please keep discord bot usage in the correct channel:", `<#${botCommandsChannel.id}>`)
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
    .setTitle("grabbing roles!")
    .setDescription("tried to add a role that already exists?")
    .addField("simply just follow the format:", "```" + `${prefix}` + "rget <name of role>```\n*do be very careful with the case sensitivity and spelling!*")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const maxRoleErrEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("error!")
    .setDescription("you have too many roles!")
    .addField("idk how, but you hit the maximum role amount of 250", `spam ameer to have some roles removed`)
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const messageargs = args.slice(0).join(" ").split('|');  
  if(message.member.roles.cache.find(r => r.name === messageargs[0]) || message.member.roles.cache.find(r => r.name === messageargs[0].slice(0, -1))){
    return message.channel.send("you already have this role you dum dum")
  }
  if(message.member.roles.cache.size >= 250) {
    return message.channel.send(maxRoleErrEmbed);
  } else if (!messageargs[0]) {
      return message.channel.send(formatEmbed);
  } else if (messageargs[0]) {
    const rankName = messageargs[0]
    const rankNameSliced = messageargs[0].slice(0, -1)
    const successEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("success!")
      .setDescription("i have given you the role")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    try {
        const createdRole = message.guild.roles.cache.find(role => role.name === rankName)
        message.guild.roles.fetch({force: true}).then(message.member.roles.add(createdRole))
    } catch(error) {
        const createdRole2 = message.guild.roles.cache.find(role => role.name === rankNameSliced)
        message.guild.roles.fetch({force: true}).then(message.member.roles.add(createdRole2))
    } finally {
        return message.channel.send(successEmbed)
    }

  }
}

module.exports.help = {
  name: "rget"
}