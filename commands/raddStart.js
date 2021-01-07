const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);
const racialWords = require('../chat-filters/racicalWords.json')
const restrictedRoles = require('../chat-filters/restrictedRoles.json')

module.exports.run = async (bot, message, args) => {
  const botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === `${commands}`)
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
    return message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}))
  };
  
  const messageFilter = x => {
    return (x.author.id === message.author.id)}
  ;
  const reactionFilter = (reaction, user) => reaction && user.id === message.author.id
  const guildRoleSize = message.guild.roles.cache.size
  const roleTakeOff = 7
  const rolePostion = guildRoleSize - roleTakeOff

  const rankNameEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("adding custom ranks!")
    .setDescription("```name of rank?```")
    .addField("`reminder`", "you have 30 seconds to answer this or the proccess will be nulled and you'll have to start again!")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const rankColorEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("adding custom ranks!")
    .setDescription("```color code of rank?```")
    .addField("`reminder`", "this **MUST** be a color code (you can get it from [here](https://htmlcolorcodes.com/ 'click me o/'))\nyou have 30 seconds to answer this or the proccess will be nulled and you'll have to start again!")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const timeNullEmbed = new Discord.MessageEmbed()
    .setColor("FF6961")
    .setTitle("error!")
    .setDescription("you ran outa time!")
    .addField("want to go again?", "restart this proccess again and answer these in time!")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const reactionNullEmbed = new Discord.MessageEmbed()
    .setColor("FF6961")
    .setTitle("success!")
    .setDescription("your rank setup has been nulled!")
    .addField("want to go again?", "restart this proccess again")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  const successRoleDeleteEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("done!")
    .setDescription("your custom role has been deleted")
    .addField("wish to make it again?", `simply just start the \`${prefix}raddStart\` proccess again!`)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}));
  ;

  
  const msg1 = await message.channel.send(rankNameEmbed)
  msg1.react("775530864830054451")

  msg1.awaitReactions(reactionFilter, {max: 1, time: 30000}).then(collected => {
    if(collected.first().emoji.id === "775530864830054451") {
      throw "proccess cancel"
  }});

  if(error) return message.reply(reactionNullEmbed)

  const rankNameAwaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
  const rankName = message.member.lastMessage.content   
    if (!rankNameAwaiter.size) return message.channel.send(timeNullEmbed);
    for (a = 0; a < racialWords.length; a++) {
      if(rankName.includes(racialWords[a])) return message.reply("don't be stupid and do that...\nproccess nulled, start again and use common sense this time")
    }  
    for (b = 0; b < restrictedRoles.length; b++) {
      if(rankName.includes(restrictedRoles[b])) return message.reply("nice try fool")
    }  
    if(message.guild.roles.cache.find(role => role.name === rankName)) return message.reply("role already exists, you can make it again, grab this role by doing `-rget` *if you can <a:hmm:699285632089849956>*")

  const msg2 = await message.channel.send(rankColorEmbed)
  const rankColorAwaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
  const rankColor = message.member.lastMessage.content    
    if (!rankColorAwaiter.size) return message.channel.send(timeNullEmbed);
  message.guild.roles.create({
    data: {
      name: rankName,
      color: rankColor,
      hoist: true,
      position: rolePostion,
      permissions: 104189504,
      mentionable: false
    }, reason: `custom role for ${message.author.tag} thru rank adder proccess`}).then(async () => {
    const createdRole = message.guild.roles.cache.find(role => role.name === rankName)
    message.guild.roles.fetch({force: true}).then(message.member.roles.add(createdRole))

    const successEmbed = new Discord.MessageEmbed()
      .setColor(rankColor)
      .setTitle("success!")
      .setDescription("your custom role hs been made\ni went ahead and gave it to you")
      .addField("name:", `${createdRole}`)
      .addField("made a mistake? ", "type in `undo` to revert this action\n\n*you have 15 seconds to do this*")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}));
    ;

    const msg3 = await message.channel.send(successEmbed)
    const undoChoice = message.member.lastMessage.content.toLowerCase();
    const undoAwaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 15000});
  
    if (!undoAwaiter.size) return message.channel.send("have fun! <a:rapidcat:699285629543907378>");
    if (undoChoice.includes("undo")) {
      createdRole.delete(`${message.author.tag} reverted their role creation role`)
      return message.channel.send(successRoleDeleteEmbed)
    } else if (!undoChoice.includes("undo")) {
      return message.channel.send("i'll take that as a no O_O\nhave fun <a:rapidcat:699285629543907378>")
    } else if (Error) {
      message.channel.send("something went wrong! it could be that you didn't enter a valid color code, please check this!\nthis keep's happening? spam ameer lUl")
    };
  });
};

module.exports.help = {
  name: "raddStart"
}