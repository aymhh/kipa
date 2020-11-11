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
  }
  
  const filter = x => {
    return (x.author.id === message.author.id)}
  ;

  const msg1Embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("adding custom emotes!")
    .setDescription("```provide the direct link of the emote```")
    .addField("`reminder!`", "emote file size **must** be below 256kb in size\nyou have 30 seconds to answer this or the proccess will be nulled and you'll have to start again!")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
    
  const msg2Embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("adding custom emotes!")
    .setDescription("```what do you want this emote to be named?```")
    .addField("`reminder!`", "emote name **must** be between 2-32 letters\nyou have 30 seconds to answer this or the proccess will be nulled and you'll have to start again!")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const toolilEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("message length can't be less than 2 characters!")
    .addField("proccess nulled", "adding emote setup nulled, you'll have to start again!")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const toomuchEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("message length can't be more than 32 characters!")
    .addField("proccess nulled", "adding emote setup nulled, you'll have to start again!")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const successembed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("**success!**")
    .setDescription("your emote has been created!")
    .addField("name:", "`:" + emoteName + ":`")
    .setThumbnail(emoteLink)
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const nulledEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("error!")
    .setDescription("you ran outa time!")
    .addField("want to go again?", "restart this proccess again and answer these in time!")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const msg1 = await message.channel.send(msg1Embed)
  const emoteLinkAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
  if (!emoteLinkAwaiter.size) return message.channel.send(nulledEmbed);
  const emoteLink = message.member.lastMessage.content

  if(Error) {
    return message.channel.send("error debugger caught, eadder2 line 86")
  }

  const msg2 = await message.channel.send(msg2Embed)
  const emoteNameAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
  if (!emoteNameAwaiter.size) return message.channel.send(nulledEmbed);
  const emoteName = message.member.lastMessage.content

  if(emoteName < 2) return message.channel.send(toolilEmbed)
  if(emoteName > 32) return message.channel.send(toomuchEmbed)

  if (args.length >= 3) {
     message.delete()
     message.guild.emojis.create(emoteLink, emoteName, {reason: `emote created by ${message.author.tag} thru command line`})
     message.channel.send(successembed)
    } else if(Error) {
     return message.channel.send(errorFormatEmbed)
    } else {
      message.channel.send(errorFormatEmbed)
    }
};

module.exports.help = {
    name: "eaddStart"
};

/*
   if(emoteName.length < 2) return message.channel.send(toolilEmbed)
   if(emoteName.length > 32) return message.channel.send(toomuchEmbed)

   if(message.guild.premiumTier === 0 && message.guild.emojis.cache.filter(emoji => emoji.animated).size === 50) return message.channel.send("<@176610715686273024> debugging1 occured, line 85,")
   if(message.guild.premiumTier === 0 && message.guild.emojis.cache.filter(emoji => emoji.animated === false).size === 50) return message.channel.send("<@176610715686273024> debugging2 occured, line 85,")

   if(message.guild.premiumTier === 1 && message.guild.emojis.cache.filter(emoji => emoji.animated).size === 100) return message.channel.send("<@176610715686273024> debugging3 occured, line 85,")
   if(message.guild.premiumTier === 1 && message.guild.emojis.cache.filter(emoji => emoji.animated === false).size === 100) return message.channel.send("<@176610715686273024> debugging4 occured, line 85,")

   if(message.guild.premiumTier === 2 && message.guild.emojis.cache.filter(emoji => emoji.animated).size === 50) return message.channel.send("<@176610715686273024> debugging5 occured, line 85,")
   if(message.guild.premiumTier === 2 && message.guild.emojis.cache.filter(emoji => emoji.animated === false).size === 50) return message.channel.send("<@176610715686273024> debugging6 occured, line 85,")

   if(message.guild.premiumTier === 3 && message.guild.emojis.cache.size === 250) return message.channel.send("<@176610715686273024> debugging3 occured, line 88,")
*/