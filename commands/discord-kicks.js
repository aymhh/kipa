const Discord = require("discord.js");
const { prefix, token, color, punishmentChannel }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message) => {

    let logChannel = message.guild.channels.cache.find(ch => ch.name === punishmentChannel)
    let mentionMessage = message.content.slice(7)
    const kickedUser = message.mentions.users.first()

    const noUserErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
      .setTitle("**error!**")
     .setDescription("Provide the user's @!")
     .addField("Usage:", "```" + `${prefix}` + "dkick <@user> <reason>```")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noReasonErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("Provide the kick reason!")
    .addField("Usage:", "```" + `${prefix}` + "dkick <@user> <reason>```")
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
   ;
    const noPermsErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("You do not have enough permissions to do this!")
     .setTimestamp()
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!kickedUser) {
        message.delete()
        return message.channel.send(noUserErrEmbed).then(msg => msg.delete({timeout: 6000}));
    }
 
    const KickSuccesEmbed = new Discord.MessageEmbed()
     .setTitle("success...")
     .setDescription(`${kickedUser.username}` + " has been kicked")
     .setThumbnail(kickedUser.user.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#FF6961')
    ;
    const kickLogEmbed = new Discord.MessageEmbed()
     .setTitle("Someone has kicked someone out the discord...")
     .setDescription(`${message.author}` + " has kicked " + `${kickedUser}` + " out off the discord.")
     .addField("Reason: ", mentionMessage)
     .addField("Beam me up Kīpā: ", "[Context](" + `${message.url}` + ")", true)
     .addField('Handle:', kickedUser.tag, true)
     .setThumbnail(kickedUser.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#fdfd96')
    ;

    message.mentions.members.first().kick(kickedUser, {reason: mentionMessage});
    message.channel.send(KickSuccesEmbed)
    logChannel.send(kickLogEmbed);
    
};

module.exports.help = {
    name: "dkick" 
}
