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

  const racialWordsArray = require(`../chat-filters/racicalWords.json`);


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

  const bigLink = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward...**")
    .setDescription("the image/gif file you provided is bigger than 256kbs")
    .addField("what now?", `well you can simply get this image compressed with [this!](https://ezgif.com/optimize "click me <o/")\nafter you done that copy the link of the compressed file and start the proccess again`)
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const badLink = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward...**")
    .setDescription("the link you provided isn't valid")
    .addField("what now?", `restart this proccess and make sure the link you're going to provide is working *(also check it's file size)*`)
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const toomany1Embed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward...**")
    .setDescription("turn's that there are not enought *animated* emoji slots left...")
    .addField("what now?", "well you can nitro boost this server to get more emoji slots, or ask ameer to remove unused emotes to free up some slots <a:PANIC:699285628805840916>")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const toomany2Embed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward...**")
    .setDescription("turn's that there are not enought *non-animated* emoji slots left...")
    .addField("what now?", "well you can nitro boost this server to get more emoji slots, or ask ameer to remove unused emotes to free up some slots <a:PANIC:699285628805840916>")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const unknownErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward...**")
    .setDescription("an unknown error has occured")
    .addField("`details`", "debugger1 (line 141), eaddStart")
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

  const successEmoteDeleteEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("done!")
    .setDescription("your emote addition has been deleted")
    .addField("wish to make it again?", "simply just start the `" + `${prefix}` + "eaddStart` process again")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}));
  ;

  const badLinkErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward...**")
    .setDescription("turns out the link you provided isn't valid\nrestart this proccess and provide the link to the direct image/gif")
    .addField("`details`", "debugger1 (line 141), eaddStart")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  

  const msg1 = await message.channel.send(msg1Embed)
  const emoteLinkAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000})
  if (!emoteLinkAwaiter.size) return message.channel.send(nulledEmbed);
  const emoteLink = message.member.lastMessage.content

  

  const msg2 = await message.channel.send(msg2Embed)
  const emoteNameAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
  if (!emoteNameAwaiter.size) return message.channel.send(nulledEmbed);
  const emoteName = message.member.lastMessage.content

  for (a = 0; a < racialWordsArray.length; a++) {
    if(emoteName.includes(racialWordsArray[a])) return message.reply("don't be stupid and do that...\nproccess nulled, start again and use common sense this time")
  }


  if(emoteName < 2) return message.channel.send(toolilEmbed)
  if(emoteName > 32) return message.channel.send(toomuchEmbed)

  const successembed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("**success!**")
    .setDescription("your emote has been created!")
    .addField("name:", `\`:${emoteName}:\``)
    .addField("made a mistake?", "you have 15 seconds to type in `undo` to revert the emote creation")
    .setThumbnail(emoteLink)
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  message.guild.emojis.create(emoteLink, emoteName, {reason: `emote created by ${message.author.tag} thru command line`}).catch(error => {
    if (error.code === 50035) {
      return message.reply(bigLink);
    } else if(error.code === 50035) {
      return message.reply(badLink)
    } else if(error.code === 30018) {
      return message.reply(toomany1Embed);
<<<<<<< HEAD
    } else if(error.code === 30008){
      return message.reply(toomany2Embed);
    } else
      return message.reply("something wen't wrong...\n it could be that the link you provided before wasn't valid. check this before continuing.")
  }) 
=======
    } else if(error.code == 30008){
    return message.reply(toomany2Embed);
    } else if(error.code == 50035){
    return message.reply(badLinkErrEmbed)
    } else {
      message.reply(unknownErrEmbed);
      return message.channel.send("<@176610715686273024>")
    }
  })
>>>>>>> c653d8c6d6c57b0f8ab205525ce6a17fdde53d7a

  const customEmoji = message.guild.emojis.cache.find(emoji => emoji.name === emoteName)
  const msg3 = await message.channel.send(successembed)
  const undoAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 15000, errors: ['time'] });
  const choice = undoAwaiter.first().content.toLowerCase();

  if (choice.includes("undo")) {
    customEmoji.delete(`${message.author.tag} reverted their emoji addition`)
    return message.reply(successEmoteDeleteEmbed)
  } else if (!choice.includes("undo")) {
    return message.channel.send("i'll take that as a no O_O\nhave fun <a:rapidcat:699285629543907378>")
  } else if (Error) {
    return message.reply("something went wrong! it could be something with the link you provided, please check this!\nthis keep's happening? spam ameer lUl")
  }
};

module.exports.help = {
    name: "eaddStart"
};