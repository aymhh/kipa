const Discord = require("discord.js");
const fs = require("fs")
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
    return `${month}/${day}/${year} @ ${hour}:${minute}:${second} ${modifier}`;
}
const { prefix, color, commands }  = require(`../indiscriminate/config.json`);
const restrictedCommands = require(`../chat-filters/restrictedCommands.json`);
const racialWordsArray = require(`../chat-filters/racicalWords.json`);

module.exports.run = async (bot, message, args) => {
    let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === `${commands}`)
    const wrongChannelEmbed = new Discord.MessageEmbed()
        .setColor(color)
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

    if(message.member.roles.cache.find(role => role.name === "clown")) return message.reply("clowns can't make custom commands").then(message => message.delete({timeout: 5000}))

    const filter = x => {
        return (x.author.id === message.author.id)}
    ;
    
    const alrExistsEmbed = new Discord.MessageEmbed()
        .setTitle("error!")
        .setDescription(`there is already such command`)
        .addField("what now?", "restart the proccess again with a different command name!")
        .addField("format:", "```" + prefix + "cmsgstart```")
        .setTimestamp()
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const commandNameEmbed = new Discord.MessageEmbed()
        .setTitle("adding custom commands!")
        .setDescription("```name of command?```")
        .addField("`reminder`", "you have 30 seconds to answer this or the proccess will be nulled and you'll have to start again!")
        .setTimestamp()
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const responseEmbed = new Discord.MessageEmbed()
        .setTitle("adding custom commands!")
        .setDescription("```what do you want this command to say?```")
        .addField("`reminder`", "you have 30 seconds to answer this or the proccess will be nulled and you'll have to start again!")
        .setTimestamp()
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const idiotEmbed = new Discord.MessageEmbed()
        .setTitle("error!")
        .setDescription("nice try idiot")
        .addField("`proccess nulled`", "custom message setup nulled, you'll have to start again!")
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/emojis/756346001694130206.png?v=1")
        .setColor(color)
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


    if(message.member.roles.cache.has("775264294903742495")) {
        message.delete()
        return message.reply("since you acting like a clown, you can't do this command.").then(message => message.delete({timeout: 6000}))
    }

    const msg1 = await message.channel.send(commandNameEmbed)
    const commandNameAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
    if (!commandNameAwaiter.size) return message.channel.send(nulledEmbed);
    const commandName = message.member.lastMessage.content.replace(/\s/g, '').toLowerCase()
    
    for (a = 0; a < racialWordsArray.length; a++) {
        if(commandName.includes(racialWordsArray[a])) return message.reply("don't be stupid and do that...\nproccess nulled, start again and use common sense this time")
    }
    

    if(commandName.includes("@")) {
        message.channel.send("you can't use the symbol `@` as it can be used to mention members and that's a nono\nread <#773800772219568169> pleas")
    }

    const path = `./commands/fun-commands/${commandName}.js`

    if (fs.existsSync(path)) {
        return message.channel.send(alrExistsEmbed)
    } 
    for (z = 0; z < restrictedCommands.length; z++) {
        if(commandName.includes(restrictedCommands[z])) {
            return message.channel.send(idiotEmbed)
        }
    }

    const msg2 = await message.channel.send(responseEmbed)
    const responseAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
    if (!responseAwaiter.size) return message.channel.send(nulledEmbed);
    const commandString = message.member.lastMessage.content

    for (a = 0; a < racialWordsArray.length; a++) {
        if(commandString.includes(racialWordsArray[a])) return message.reply("don't be stupid and do that...\nproccess nulled, start again and use common sense this time")
    }

    if(commandName.includes("@")) {
        message.channel.send("you can't use the symbol `@` as it can be used to mention members and that's a nono\nread <#773800772219568169> pleas")
    }

    const successEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("success!")
        .setDescription("your custom command have been setup!")
        .addField("name:", `\`${prefix}${commandName}\`\ngive it 5-15 seconds to register in please!`)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    const data =
    `module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("${commandString}")
    }
    module.exports.help = {
        name: "${commandName}",
        description: "custom command made by ${message.author.tag}-(${message.author.id}) on ${correctTime(message.createdTimestamp)}"
    }`
    
    fs.writeFileSync(path, data, "utf8")
    console.log(`custom command made by ${message.author.tag} on ${correctTime(message.createdTimestamp)}`)
    message.channel.send(successEmbed).then(message => {
        process.exit()
    });
}

module.exports.help = {
    name: "cmsgStart"
}