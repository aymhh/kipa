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
  };

  const formatEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("adding custom ranks!")
    .setDescription("since i like you, you can add a rank of your choice")
    .setThumbnail(bot.user.displayAvatarURL())
    .addField("to start this proccess type in:", "```" + `${prefix}` + "raddStart```")
    .addField("before you start adding em!", "when you start the proccess you have 30 seconds to input each argument\n\n> You'll first be asked the name of the rank\n> Next, the color of the rank *(you **MUST** provide the color code, you can get it from [here](https://htmlcolorcodes.com/ 'click me o/'))*\n\n*if you're wondering where is the old method, i removed it because I was amazed at the stupidity of ya'll <:smh:775530864830054451>*")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  return message.channel.send(formatEmbed)

};

module.exports.help = {
  name: "radd"
}
