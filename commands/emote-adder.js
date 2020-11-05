const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);
const linkWords = require(`../chat-filters/linkWords.json`)

module.exports.run = async (bot, message, args, error) => {
    // Restricts commands to bot commands channels
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
     .setTitle("adding custom emotes!")
     .setDescription("since i like you, you can add a emote of your choice")
     .addField("simply just follow the format:", "```" + `${prefix}` + "eadd <direct link to image/gif> | <emote name>```")
     .addField("before you start adding em!", "- emote name can't be less than 2 letters OR more than 32 letters\n- you must provide a direct link to the image (ask aymhh if unsure)\n- the file size of the image can not be more than 256kb in size")
     .setTimestamp()
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    
    const errorFormatEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("use the correct format: ```" + `${prefix}` + "eadd <direct link to image/gif> | <emote name>```")
     .addField("need help?", "just mention ameer")
     .setTimestamp()
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    

   const toolilEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("message length can't be less than 2 characters!")
   .addField("need help?", "just mention ameer")
   .setTimestamp()
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const toomuchEmbed = new Discord.MessageEmbed()
  .setColor('FF6961')
  .setTitle("**error!**")
  .setDescription("message length can't be more than 32 characters!")
  .addField("need help?", "just mention ameer")
  .setTimestamp()
  .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
 ;
 const unknownErrEmbed = new Discord.MessageEmbed()
  .setColor('FF6961')
  .setTitle("**error!**")
  .setDescription("an unknown error has been reported!")
  .addField("why?", "this probably has occured due to the file size of the image/gif you provided being OVER 256kb's limit")
  .addField("how can I fix this?", "use a website like [this](https://ezgif.com/optimize) to compress your gif to under 256kb\nupload the file to [here](https://imgur.com/upload) and copy it's image address after you posted it")
  .addField("keeps happening after you compressed?", "spam ameer lol")
  .setTimestamp()
  .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
;   

   let messageargs = args.slice(0).join(" ").split('|');
   if(!messageargs[0]) return message.channel.send(formatEmbed)
   if(!messageargs[1]) return message.channel.send(formatEmbed)

   let emoteLink = messageargs[0].slice(0,-1)
   let emoteName = messageargs[1].slice(1)

   const successembed = new Discord.MessageEmbed()
   .setColor(color)
   .setTitle("**success!**")
   .setDescription("your emote has been created!")
   .addField("name:", "`" + emoteName + "`")
   .setThumbnail(emoteLink)
   .setTimestamp()
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
   ;


   if(emoteName.length < 2) return message.channel.send(toolilEmbed)
   if(emoteName.length > 32) return message.channel.send(toomuchEmbed)

   if(message.guild.premiumTier === 0 && message.guild.emojis.cache.size === 50) return message.channel.send("<@176610715686273024> debugging0 occured, line 85,")
   if(message.guild.premiumTier === 1 && message.guild.emojis.cache.size === 100) return message.channel.send("<@176610715686273024> debugging1 occured, line 86,")
   if(message.guild.premiumTier === 2 && message.guild.emojis.cache.size === 150) return message.channel.send("<@176610715686273024> debugging2 occured, line 87,")
   if(message.guild.premiumTier === 3 && message.guild.emojis.cache.size === 250) return message.channel.send("<@176610715686273024> debugging3 occured, line 88,")

   if(error) return message.delete().catch(error => {
    message.channel.send(unknownErrEmbed)
    message.channel.send(error)});

   if (args.length >= 3) {
     message.delete()
     message.guild.emojis.create(emoteLink, emoteName, {reason: `emote created by ${message.author.tag} thru command line`})
     message.channel.send(successembed)
    } else {
     message.channel.send(errorFormatEmbed)
     return;
    };
};

module.exports.help = {
    name: "eadd"
};