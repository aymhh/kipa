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
        return message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
    };

    const notInChanEmbedErr = new Discord.MessageEmbed()
        .setColor('#FF6961')
        .setTitle("error!")
        .setDescription("you dumb-dumb bubble gum, join a music channel first then you can use me!")
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;


    if(!message.member.voice.channel) return message.reply(notInChanEmbedErr)
    if(message.member.voice.channel.id !== "773801793884520460") return message.reply("that aint a music channel")

    try {
        await message.member.voice.channel.join()
    } catch(error) {
        console.log(`there was an error joining the voice channel: ${error}`)
        return message.channel.send("i had some trouble joining the voice channel..." + error)
    }
    
};

module.exports.help = {
    name: "play"
};