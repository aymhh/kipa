const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

function correctTime(timestamp) {

    const mainTime = new Date(timestamp);
    let day, month, year, hour, minute, second;
        day = mainTime.getDate();
        month = mainTime.getMonth() + 1;
        year = mainTime.getFullYear();
        hour = mainTime.getHours();
        minute = mainTime.getMinutes();
        second = mainTime.getSeconds();
        modifier = 'AM';
    if (hour === 12) { modifier = "PM" }
    if (hour > 12) {
        hour -= 12;
        modifier = 'PM'
    }
    const date = new Date(Date.UTC(year, month, day, hour, minute, second));
    return date 
}


module.exports.run = async (bot, message) => {
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

    const timeEmbed1 = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("time conversion!")
        .setDescription("i can convert time from australia's current time to your country's choice!")
        .addField('how is this done?', "simply click on the reaction, and what that'll do is convert from AEST time to the selected region time!")
        .addField('can\'t find your country?', "simply pick the country closest to your requested one *(geographically speaking)* to get a rough estimate.")
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    const japanEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("time conversion!")
    .addField("🇯🇵", correctTime(message.createdTimestamp - 7200))
    .addField("🇦🇺", correctTime(message.createdTimestamp))
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
;



    const filter = (reaction, user) => reaction && user.id === message.author.id

    let embedMessage = await message.channel.send(timeEmbed1)
        await embedMessage.react('🇯🇵')
        await embedMessage.react('🇲🇾')
        await embedMessage.react('🇮🇩')
        await embedMessage.react('🇫🇷')
        await embedMessage.react('🇺🇸')
        await embedMessage.react('🇨🇳')
        await embedMessage.react('🇪🇸')
        await embedMessage.react('🇬🇧')
        await embedMessage.react('🇩🇪')
        await embedMessage.react('🇲🇽')
    ;
    

    const reactions = await embedMessage.awaitReactions(filter, {max: 1, time: 30000}).then(collected => {


		if (collected.first().emoji.name === '🇯🇵') {
            return embedMessage.edit(japanEmbed);
            
        }
        if (collected.first().emoji.name === '🇲🇾') {
            return embedMessage.edit('you didn\'t react with the japanses flag.');
            
        }
        if (collected.first().emoji.name === '🇮🇩') {
            return embedMessage.edit('you reacted with the indonesian flag.');

        }
        if (collected.first().emoji.name === '🇫🇷') {
            return embedMessage.edit('you reacted with the french flag.');

        }
        if (collected.first().emoji.name === '🇺🇸') {
            return embedMessage.edit('you reacted with the american flag.');

        }
        if (collected.first().emoji.name === '🇨🇳') {
            return embedMessage.edit('you reacted with the chinese flag.');

        }
        if (collected.first().emoji.name === '🇪🇸') {
            return embedMessage.edit('you reacted with the spanish flag.');

        }
        if (collected.first().emoji.name === '🇬🇧') {
            return embedMessage.edit('you reacted with the uk flag.');

        }
        if (collected.first().emoji.name === '🇩🇪') {
            return embedMessage.edit('you reacted with the german flag.');

        }
        if (collected.first().emoji.name === '🇲🇽') {
            return embedMessage.edit('you reacted with the mexian flag.');

        }
	})

    message.channel.send(message.createdTimestamp)
    message.channel.send(message.createdTimestamp - 7200)

    
    
    
};

module.exports.help = {
    name: "testerAymhh"
};