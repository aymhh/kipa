const Discord = require("discord.js");
const { prefix, token, color, punishmentChannel }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {

    let logChannel = message.guild.channels.cache.find(ch => ch.name === punishmentChannel)
    let mentionMessage = message.content.slice(9)
    const mutedMember = message.mentions.members.first()
    const mutedUser = message.mentions.users.first()
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
     .addField("Usage:", "```" + `${prefix}` + "dunmute <@user> <optional reason>```")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const notMutedEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Cant unmute a user who is already unmuted!")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!mutedMember) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!mutedMember.roles.cache.has(mutedRoleID)) {
        message.channel.send(notMutedEmbed).then(message => message.delete({timeout: 5000}))
        return ;
    };     

    mutedMember.roles.remove(mutedRole)
    const muteLogEmbed = new Discord.MessageEmbed()
    .setTitle("Someone has unmuted someone on the discord...")
     .setDescription(`${message.author}` + " has muted " + `${mutedUser}` + " on the discord.")
     .addField('Member:', `<@${mutedUser.id}>`, true)
     .addField('Handle?', mutedUser.tag, true)
     .addField('User ID?', mutedUser.id, true)
     .setThumbnail(mutedUser.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter(`${bot.user.username}`)
     .setColor('#90ee90')
    ;
    logChannel.send(muteLogEmbed);
    
    const successEmbed2 = new Discord.MessageEmbed()
        .setTitle("success...")
        .setDescription(`${mutedUser.username}` + " has been unmuted")
        .setThumbnail(mutedUser.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
        .setColor('#FF6961')
    ;
    
    message.channel.send(successEmbed2)
};

module.exports.help = {
    name: "dunmute" 
}