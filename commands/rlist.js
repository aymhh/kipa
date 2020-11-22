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

  const successEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("success!")
    .setDescription("just shot you a dm!")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  message.member.send("here are all the roles in the server!\n*keep in mind that there are some roles you can't gain as they are handed out personally by ameer*.\n").catch(error => {
    if(error.code === 50007) return message.channel.send("i can't send you a DM, enable messages from this server to allow me to send you message")
  })
  message.member.send("> " + message.guild.roles.cache.map(roles => `${roles.name}`).join('\n> ').split("@everyone"))
  message.channel.send(successEmbed)

};

module.exports.help = {
  name: "rlist"
};