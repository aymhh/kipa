const Discord = require("discord.js");
const { prefix, token, color }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {

    const logChannel = message.guild.channels.cache.find(ch => ch.name === "discord-punishment")
    const mutedMember = message.mentions.members.first()
    const mutedUser = message.mentions.users.first()
    let mentionMessage = message.content.slice(7)
    const mutedRole = message.guild.roles.cache.find(r => r.name === "Muted");
    const mutedRoleID = mutedRole.id

    const noPermsErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("You do not have enough permissions to do this!")
     .setTimestamp()
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noUserErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Provide the user's @!")
     .addField("Usage:", "```" + `${prefix}` + "dmute <@user> <reason>```")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const alrMutedEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Cant mute a user who is already muted!")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!mutedMember) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(mutedMember.roles.cache.has(mutedRoleID)) return message.channel.send(alrMutedEmbed).then(message => message.delete({timeout: 5000}))
    
    const MuteSuccesEmbed = new Discord.MessageEmbed()
    .setTitle("success...")
    .setDescription(`${mutedUser.username}` + " has been muted")
    .setThumbnail(mutedUser.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor('#FF6961')
   ;

    const muteLogEmbed = new Discord.MessageEmbed()
        .setTitle("Someone has muted someone on the discord...")
        .setDescription(`${message.author}` + " has muted " + `${mutedMember}` + " on the discord.")
        .addField("Beam me up Kīpā: ", "[Context](" + `${message.url}` + ")", true)
        .addField("Handle:", mutedUser.tag, true)
        .setThumbnail(mutedUser.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setFooter(`${bot.user.username}`)
        .setColor('#fdfd96')
    ;


    mutedMember.roles.add(mutedRole)
    message.channel.send(MuteSuccesEmbed)
    logChannel.send(muteLogEmbed);
}

module.exports.help = {
    name: "dmute" 
}
