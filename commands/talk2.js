const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let ancArgs = args.slice(0).join(" ").split('|');
  const noPermsErrEmbed = new Discord.MessageEmbed()
  .setColor('FF6961')
  .setTitle("**error!**")
  .setDescription("You dont have enough permissions to do this command!")
  .setTimestamp()
  .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(noPermsErrEmbed).then(msg => msg.delete(5000));  

 var general =  bot.channels.cache.find(ch => ch.name === "talk")
 const messagetosend = message.content.slice(5)

  if(messagetosend.length === 0) {
    message.channel.send("I can't send an empty message.\nFormat: ```-talk2 <message>```")
    return;
  }
  message.delete();
  general.send(messagetosend)
  return message.channel.send(`I have sent: ${messagetosend}`)
};

module.exports.help = {
  name: "say"
}; 