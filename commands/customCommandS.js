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
module.exports.run = async (bot, message, args) => {
    let mentionedUser = message.mentions.users.first()
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
    }
    ;
    const messageargs = args.slice(0).join(" ").split('|');
    const formatEmbed = new Discord.MessageEmbed()
        .setTitle("creating simple commands!")
        .setDescription("since i really like you, you can create a simple command so I can repeat whenever you want")
        .addField("`IMPORTANT!`", "before you start creating commands do be careful of the format as this is a bit of a weird code")
        .addField("format:", "```" + prefix + "cmsg <name of the command> | <what you want this command to say>```")
        .addField("reminders: ", "- you can have it display emotes, however they must be from this server\n- do NOT forget about the divider between the first input and the second one\n- if you see anything out of order spam ameer\n- don't add spaces for the command name as it wont work, **only** add a space before you put the divider and after it")
        .addField("need help?","spam ameer o/")
        .setImage("https://i.imgur.com/J8XAMYI.gif")
        .setTimestamp()
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noReponseEmbed = new Discord.MessageEmbed()
        .setTitle("error!")
        .setDescription(`${messageargs[0].slice(0, -1)} already exists!`)
        .addField("what now?", "simply just name it to something different")
        .setTimestamp()
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const alrExistsEmbed = new Discord.MessageEmbed()
        .setTitle("error!")
        .setDescription(`missing command response`)
        .addField("what now?", "restart the proccess again with the reponse in place")
        .addField("format:", "```" + prefix + "cmsg <name of the command> | <what you want this command to say>```")
        .setTimestamp()
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    const path = `./commands/fun-commands/${messageargs[0].slice(0, -1)}.js`

    if (fs.existsSync(path)) {
        return message.channel.send(alrExistsEmbed)
    } 
    if(!messageargs[0]) {
        return message.channel.send(formatEmbed)
    } 
    if(!messageargs[1]) {
        return message.channel.send(noReponseEmbed)
    }
    if (args.length >= 2) {
        const commandName = messageargs[0].slice(0, -1)
        const commandString = messageargs[1].slice(1) 
        const successEmbed = new Discord.MessageEmbed()
        .setTitle("success!")
        .setDescription("command created successfully\ngive it a 5 seconds to register in!")
        .addField("command:", "`"+ prefix + `${commandName}` +"`")
        .setTimestamp()
        .setColor(color)
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
        })

    } else {
        message.channel.send(formatEmbed)
    } 
}
module.exports.help = {
    name: "cmsg"
}