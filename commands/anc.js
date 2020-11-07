const Discord = require("discord.js");
const { prefix, token, color, botCommandsChannel }  = require(`../indiscriminate/config.json`);


module.exports.run = async (bot, message, args) => {
  let ancArgs = args.slice(0).join(" ").split('|');
  const noPermsErrEmbed = new Discord.MessageEmbed()
  .setColor('FF6961')
  .setTitle("**error!**")
  .setDescription("You dont have enough permissions to do this command!")
  .setTimestamp()
  .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(noPermsErrEmbed).then(msg => msg.delete(5000));  
  if (args.length >= 3) {
    message.delete().then(() => {
      const ancEmbed = new Discord.MessageEmbed()
       .setColor(color)
       .setTitle("** " + ancArgs[0] + " **")
       .setDescription(ancArgs[1])
       .setTimestamp()
       .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.channel.send(ancEmbed);
    })
  } else {
    message.delete().catch();
    const ancErrEmbed = new Discord.MessageEmbed()
      .setColor('FF6961')
      .setTitle("**error!**")
      .setDescription("use the correct format: ```" + `${prefix}` + "anc <title> | <message>```")
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.reply(ancErrEmbed).then(msg => msg.delete({timeout: 10000}));
  }
}

module.exports.help = {
  name: "anc"
}