// This one doesn't proccess exist, it throws the error and catchs one to stop the proccess

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

  const toobigEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward, your emote creation didn't end up working...**")
    .setDescription("you provided a bad file link, this is caused by either:\n- the link you provided didn't direct directly towards a gif/image\n- the image/gif is larger than 256kbs")
    .addField("what now?", "you can use an online file compressor such as [this one!](https://ezgif.com/optimize 'click me <o/') and make sure the file is below 256kb\nwhen you are done restart this proccess!")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const toomany1Embed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward, your emote creation didn't end up working...**")
    .setDescription("turn's that there are not enought *animated* emoji slots left...")
    .addField("what now?", "well you can nitro boost this server to get more emoji slots, or ask ameer to remove unused emotes to free up some slots <a:PANIC:699285628805840916>")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const toomany2Embed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**this is kinda awkward, your emote creation didn't end up working...**")
    .setDescription("turn's that there are not enought *non-animated* emoji slots left...")
    .addField("what now?", "well you can nitro boost this server to get more emoji slots, or ask ameer to remove unused emotes to free up some slots <a:PANIC:699285628805840916>")
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
  
  const notALinkErrEmbed = new Discord.MessageEmbed()
    .setColor("FF6961")
    .setTitle("error!")
    .setDescription("please only provide links at this stage")
    .addField("what now?", "simply just start the `" + `${prefix}` + "eaddStart` process again and provide the emote link")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}));
  ;


  const msg1 = await message.channel.send(msg1Embed)
  const emoteLinkAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
  if (!emoteLinkAwaiter.size) return message.channel.send(nulledEmbed);
  const emoteLink = message.member.lastMessage.content

  if(!emoteLink.includes("https://")) return message.channel.send(notALinkErrEmbed)

  const msg2 = await message.channel.send(msg2Embed)
  const emoteNameAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
  if (!emoteNameAwaiter.size) return message.channel.send(nulledEmbed);
  const emoteName = message.member.lastMessage.content

  for (a = 0; a < racialWordsArray.length; a++) {
    if(emoteName.includes(racialWordsArray[a])) return message.reply("don't be stupid and do that...\nproccess nulled, start again and use common sense this time")
  }

  if(emoteName < 2) return message.channel.send(toolilEmbed)
  if(emoteName > 32) return message.channel.send(toomuchEmbed)


  message.guild.emojis.create(emoteLink, emoteName, {reason: `emote created by ${message.author.tag} thru command line`}).catch(error => {
    if (error.code == 50035) {
      message.channel.send(`<@${message.author.id}>`)
      return message.reply(toobigEmbed).then(() => {
        throw "proccess exited due to error in making an emote, error code 50035 (ignore this)"
      });
    } else if(error.code == 30018) {
      message.channel.send(`<@${message.author.id}>`)
      return message.reply(toomany1Embed).then(() => {
        throw "proccess exited due to error in making an emote, error code 30018 (ignore this)"
      });
    } else if(error.code == 30008) {
      message.channel.send(`<@${message.author.id}>`)
      return message.reply(toomany2Embed).then(() => {
        throw "proccess exited due to error in making an emote, error code 30008 (ignore this)"
      });
    } else {
      return message.reply("something went wrong with making this emote (unknown error), just make sure that everything is correct, do `-eadd` and read through it pls\nthis keeps happening even thought u checked everything? spam ameer lol").then(() => {
        throw "proccess exited due to error in making an emote, https://tenor.com/view/michael-michael-shirt-michael-shirt-rip-shirt-rip-shirt-rip-sex-gif-18657442error code unknown"
      });
    }
  });

  if(Error) return ;

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


  const msg3 = await message.channel.send(successembed)
  const undoAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 15000});
  const choice = message.member.lastMessage.content.toLowerCase();

  if (choice.includes("undo")) {
    const customEmoji = message.guild.emojis.cache.find(emoji => emoji.name === emoteName)
    customEmoji.delete(`${message.author.tag} reverted their emoji addition`)
    return message.reply(successEmoteDeleteEmbed).catch(error)
  } else {
    return message.channel.send("i'll take that as a no O_O\nhave fun <a:rapidcat:699285629543907378>").catch(error)
  }
};

module.exports.help = {
  name: "eaddStart"
};
