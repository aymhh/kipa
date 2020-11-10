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
    return message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}))
  };
  
  const filter = x => {
    return (x.author.id === message.author.id)}
  ;
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
    .setDescription("```color of rank?```")
    .addField("`reminder`", "this MUST be a color code\nyou have 30 seconds to answer this or the proccess will be nulled and you'll have to start again!")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
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
  const successRoleDeleteEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("done!")
    .setDescription("your custom role has been deleted")
    .addField("wish to make it again?", "simply just start the `" + `${prefix}` + "rstart` process again")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}));
  ;


  let guildRoleSize = message.guild.roles.cache.size
  let roleTakeOff = 5
  const rolePostion = guildRoleSize - roleTakeOff
  
  const msg1 = await message.channel.send(rankNameEmbed)
  const rankNameAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
  if (!rankNameAwaiter.size) return message.channel.send(nulledEmbed);
  const rankName = message.member.lastMessage.content

  const msg2 = await message.channel.send(rankColorEmbed)
  const rankColorAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
  if (!rankColorAwaiter.size) return message.channel.send(nulledEmbed);
  const rankColor = message.member.lastMessage.content

  message.guild.roles.create({
    data: {
      name: rankName,
      color: rankColor,
      hoist: true,
      position: rolePostion,
      permissions: 104189505,
      mentionable: false
    }, reason: `custom role for ${message.author.tag} thru rank adder proccess`,
  }).then(async () => {
    const createdRole = message.guild.roles.cache.find(role => role.name === rankName)
    message.guild.roles.fetch({force: true}).then(message.member.roles.add(createdRole))
    const successEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("success!")
      .setDescription("your custom role hs been made\ni went ahead and gave it to you")
      .addField("name:", `${createdRole}`)
      .addField("made a mistake? ", "type in `undo` to revert this action\n\n*you have 15 seconds to do this*")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}));
    ;
    const msg3 = await message.channel.send(successEmbed)
    const undoAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 15000});
    const undo = "undo"
    const choice = undoAwaiter.first().content.toLowerCase();
  
    if (!undoAwaiter.size) return message.channel.send("have fun! <a:rapidcat:699285629543907378>");
    if (undo.includes(choice)) {
      createdRole.delete(`${message.author.id} reverted his role creation role`)
      return message.channel.send(successRoleDeleteEmbed)
    } else if (!undo.includes(choice)) {
      return message.channel.send("i'll take that as a no O_O\nhave fun <a:rapidcat:699285629543907378>")
    } else if (Error) {
      message.channel.send("something went wrong! it could be that you didn't enter a valid color code, please check this!\nthis keep's happening? spam ameer lUl")
    };
  });
};

module.exports.help = {
  name: "rstart"
}
