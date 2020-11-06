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
    .setTitle("adding custom ranks!")
    .setDescription("since i like you, you can add a rank of your choice")
    .addField("simply just follow the format:", "```" + `${prefix}` + "radd <name of role> | <hex color of role>```")
    .addField("before you start adding em!", "- you must provide the hex code of the role, you can get it thru [this](https://htmlcolorcodes.com/)\n- creating a role will automatically inert it's color and be on top")
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
  const nameErrEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("error!")
    .setDescription("you're missing a name!")
    .addField("format: ", "```" + `${prefix}` + "radd <name of role> | <hex color of role>```")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const colorErrEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("error!")
    .setDescription("you're missing a color!")
    .addField("format: ", "```" + `${prefix}` + "radd <name of role> | <hex color of role>```")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  if(message.member.roles.cache.size >= 250) {
    message.channel.send(maxRoleErrEmbed)
  } else if (args.length >= 2) {
    var messageargs = args.slice(0).join(" ").split('|');
    var rankName = messageargs[0].slice(0,-1)
    var rankColor = messageargs[1].slice(1)  
    var successEmbed = new Discord.MessageEmbed()
      .setColor(rankColor)
      .setTitle("success!")
      .setDescription("your custom role hs been made")
      .addField("name:", rankName)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}));
    ;
  
    message.guild.roles.create({
      data: {
        name: rankName,
        color: rankColor,
        hoist: false,
        position: 10,
        permissions: 3525184,
        mentionable: false
      }, reason: `custom role for ${message.author.tag} thru line of code`,
    }).then()
    let createdRole = message.guild.roles.cache.find(role => role.name === rankName).id
    message.channel.send(createdRole)
    message.channel.send(successEmbed)
   } else if(!rankColor && rankName) {
    return message.channel.send(colorErrEmbed)
  } else {
    return message.channel.send(formatEmbed)
  }
}

module.exports.help = {
  name: "radd"
}