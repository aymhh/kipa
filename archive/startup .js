const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, error) => {
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
        return message.reply(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}))
    };
    
    if(message.author.id != message.guild.owner.id) {
        message.delete()
        return message.reply("only ameer can do this you dumb-dumb").then(msg => msg.delete({timeout: 7000}));
    }

    
    
};

module.exports.help = {
    name: "testerAymhh"
};