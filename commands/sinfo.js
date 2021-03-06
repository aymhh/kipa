const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

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
      return message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
   } else {

    let region = message.guild.region

    const serverembed = new Discord.MessageEmbed()
      .setTitle(message.guild.name)
      .addField("Owner", `<@${message.guild.owner.user.id}>`, true)
      .addField("Region", region.charAt(0).toUpperCase() + region.slice(1), true)
      .addField("Channels", message.guild.channels.cache.size, true)
      .addField("Roles", message.guild.roles.cache.size, true)
      .addField("Members", message.guild.memberCount, true)
      .addField("Bots", message.guild.members.cache.filter(m => m.user.bot).size, true)
      .addField("Total Emotes", message.guild.emojis.cache.size, true)
      .addField("Still Emotes", message.guild.emojis.cache.filter(emoji => emoji.animated === false).size, true)
      .addField("Animated Emotes", message.guild.emojis.cache.filter(emoji => emoji.animated).size, true)
      .addField("Server Boost Level", message.guild.premiumTier, true)
      .addField("Server Boosts", message.guild.premiumSubscriptionCount, true)
      .addField("Server Boosters", message.guild.roles.cache.find(r => r.name === "Server Booster").members.size, true)
      .addField("Creation Date", message.guild.createdAt)
      .addField("Server Splash Image:", "<a:giyuuWhistle:781512339031195678>")
      .setImage(message.guild.splashURL({size: 4096}))
      .setTimestamp()
      .setColor(color)
      .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    return message.channel.send(serverembed)
  }
};
 
module.exports.help = {
  name: "sinfo"
}