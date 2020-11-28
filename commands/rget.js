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
   if(message.channel != botCommandsChannel && message.author.id != message.guild.owner.id) {
    message.delete()
    return message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
  }

  const formatEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("grabbing roles!")
    .setDescription("tried to add a role that already exists?")
    .addField("simply just follow the format:", "```" + `${prefix}` + "rget <name of role>```\n*do be very careful with the case sensitivity and spelling!*")
    .addField(`\`${prefix}rlist\``, "to get the list of all the roles in the server")
    .setImage("https://i.imgur.com/wUTN4oZ.gif")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const noRoleError = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("error!")
    .setDescription("can't find that role!")
    .addField("how to fix", "- make sure the role name is correct, spelling and case sensitivity needs to be exact\n- are you putting an `@` for the role? don't do that lol, just the role name pls")
    .addField("still seeing this?", "spam ameer lUl")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const messageargs = args.slice(0).join(" ").split('|'); 
  
  const restrictedRoles = require('../chat-filters/restrictedRoles.json')

  if(message.member.roles.cache.find(r => r.name === messageargs[0]) || message.member.roles.cache.find(r => r.name === messageargs[0].slice(0, -1))){
    return message.channel.send("you already have this role you dum dum")
  }
  for (x = 0; x < restrictedRoles.length; x++) {
    if(messageargs[0] === restrictedRoles[x]) {
      return message.channel.send("i can't give you that role\nthat is restricted and can only be given by ameer personally.")
    }
    if(messageargs[0].slice(0, -1) === restrictedRoles[x]) {
      return message.channel.send("i can't give you that role\nthat is restricted and can only be given by ameer personally.")
    }
  }
  if (!messageargs[0]) {
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
    if(rankName === "ZZA" && !message.member.user.username.endsWith("zza")) return message.reply("you're not a zza...")
    if(message.guild.roles.cache.find(role => role.name === rankName)) {
      const createdRole = message.guild.roles.cache.find(role => role.name === rankName)
      message.guild.roles.fetch({force: true}).then(message.member.roles.add(createdRole))
      return message.channel.send(successEmbed)    
    } else if (message.guild.roles.cache.find(role => role.name === rankNameSliced)) {
      const createdRole2 = message.guild.roles.cache.find(role => role.name === rankNameSliced)
      message.guild.roles.fetch({force: true}).then(message.member.roles.add(createdRole2))
      return message.channel.send(successEmbed)    
    } else {
      return message.channel.send(noRoleError)
    };
  };
};

module.exports.help = {
  name: "rget"
};