const Discord = require("discord.js");
const { prefix, token, color, punishmentChannel }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {

    let guild = message.guild;
    const bannedUser = message.mentions.members.first();
    let mentionMessage = message.content.slice(6)
    let logChannel = message.guild.channels.cache.find(ch => ch.name === punishmentChannel)

    const noPermsErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("You don't have enough permissions to do this!")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noUserErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Provide the user's @!")
     .addField("Usage:", "```" + `${prefix}` + "dban <@user> <reason>```")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noReasonErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("Provide the ban reason!")
    .addField("Usage:", "```" + `${prefix}` + "dban <@user> <reason>```")
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;


    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!bannedUser) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 6000}));
    if(!args[1]) return message.reply(noReasonErrEmbed).then(msg => msg.delete({timeout: 6000}));
    
    const BanSuccesEmbed = new Discord.MessageEmbed()
     .setTitle("success...")
     .setDescription(`${bannedUser.user.username}` + " has been banned")
     .setThumbnail(bannedUser.user.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#FF6961')
    ;


    guild.members.ban(bannedUser, {reason: mentionMessage});
    message.channel.send(BanSuccesEmbed)

    const BanLogEmbed = new Discord.MessageEmbed()
        .setTitle("Someone has banned someone off the discord...")
        .setDescription(`${message.author}` + " has banned " + `${bannedUser}` + " off the discord.")
        .addField("Reason: ", mentionMessage)
        .addField("Beam me up Kīpā: ", "[Context](" + `${message.url}` + ")", true)
        .addField('Handle:', bannedUser.tag, true)
        .setThumbnail(bannedUser.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
        .setColor('#FF6961')
   ;

    logChannel.send(BanLogEmbed);
}
module.exports.help = {
    name: "dban" 
}
