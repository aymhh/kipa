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

    if(message.author.id != message.guild.owner.id) {
        message.delete()
        return message.channel.send("only ameer can do this you dumb-dumb").then(msg => msg.delete({timeout: 7000}));
    }
    const filter = x => {
        return (x.author.id === message.author.id)}
    ;
    
    const msg1 = await message.channel.send("reactor checker")
    await msg1.react("🤩")
    await msg1.awaitReactions(filter, {max: 1, time: 30000}).then(async collected => {
        if(collected.first().emoji.name === "🤩") return message.channel.send("pls work what the fuck is going on?")
        else {
            return message.channel.send("error")
        }
    }).catch(error => {
        console.log(error)
    })

};

module.exports.help = {
    name: "testerAymhh"
};