const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args, error) => {
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
   return message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
  };

  const formatEmbed = new Discord.MessageEmbed()
   .setColor(color)
   .setTitle("adding custom emotes!")
   .setDescription("since i like you, you can add a emote of your choice")
   .addField("simply just follow the format:", "```" + `${prefix}` + "eaddStart ```")
   .addField("before you start adding em!", "when you start the proccess you have 30 seconds to input each argument\n\n> You'll first be asked the direct link to the image/gif *(the file size must be less than 256kbs, you can compress it thru [this](https://ezgif.com/optimize 'click me <o/'))*\n> Next, the name of the emotes *(the name needs to have 2-32 characters)*\n\n*if you're wondering where is the old method, i removed it because I was amazed at the stupidity of ya'll <:smh:775530864830054451>*")
   .setTimestamp()
   .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  return message.reply(formatEmbed)
};

module.exports.help = {
    name: "eadd"
};