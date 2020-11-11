const Discord = require("discord.js");
const { prefix, token, color, punishmentChannel }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {

    let guild = message.guild;
    const bannedUser = await bot.users.fetch(args[0]);
    mentionMessage = message.content.slice(8);
    let logChannel = message.guild.channels.cache.find(ch => ch.name === punishmentChannel)
    
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
     .setDescription("Provide the user's ID!")
     .addField("Usage:", "```" + `${prefix}` + "dunban `<id>```")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    
    const unBanLogEmbed = new Discord.MessageEmbed()
     .setColor('90ee90')
     .setTitle("Someone has unbanned someone off the discord...")
     .setDescription(`${message.author}` + " has unbanned " + `${bannedUser}` + " off the discord.")
     .addField('Member:', `<@${bannedUser.id}>`, true)
     .addField('Precense:', bannedUser.status, true)
     .addField('Bot?', bannedUser.bot, true)
     .setThumbnail(bannedUser.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const successEmbed2 = new Discord.MessageEmbed()
        .setTitle("success...")
        .setDescription(`${bannedUser.username}` + " has been unbanned")
        .setThumbnail(bannedUser.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
        .setColor('#FF6961')
    ;

    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!bannedUser) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));

    guild.members.unban(bannedUser);
    message.channel.send(successEmbed2)
    logChannel.send(unBanLogEmbed);
    ;
}

module.exports.help = {
    name: "dunban"
}