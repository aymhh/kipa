const Discord = require("discord.js");
const fs = require("fs")
const { prefix, color }  = require(`../indiscriminate/config.json`);
module.exports.run = async (bot, message, args) => {
    
    const messageargs = args.slice(0).join(" ").split('|');


    const formatEmbed = new Discord.MessageEmbed()
        .setTitle("creating simple commands!")
        .setDescription("since i really like you, you can create a simple command so I can repeat whenever you want")
        .addField("IMPORTANT!", "before you start creating the command do be careful of the format as this is a bit of a weird code\n- if you see anything out of order spam ameer")
        .addField("format:", "```" + prefix + "cmsg <name of the command> | <what you want this command to say>```")
        .addField("example:", "```" + prefix + "cmsg ameer | T_T```")
        .addField("reminders: ", "- you can have it display emotes, however they must be from this server\n- do NOT forget about the divider between the first input and the second one")
        .addField("need help?","spam ameer o/")
        .setTimestamp()
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const alrExistsEmbed = new Discord.MessageEmbed()
        .setTitle("error!")
        .setDescription("you already set up a command!")
        .addField("wish to make another one?", "at the moment you can only have one per account, but if you wish to add more spam ameer")
        .setTimestamp()
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    const path = `./commands/fun-commands/${message.author.id}-(${message.author.username}).js`

    if (fs.existsSync(path)) {
        return message.channel.send(alrExistsEmbed)
    } 
    if(!messageargs[0]) {
        return message.channel.send(formatEmbed)
    }
    if (args.length >= 2) {
        const commandName = messageargs[0].slice(0, -1)
        const commandString = messageargs[1].slice(1) 
        const successEmbed = new Discord.MessageEmbed()
        .setTitle("success!")
        .setDescription("command created successfully\ngive it a 10-15 seconds to register in!")
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
        name: "${commandName}"
    }`
        
        fs.writeFileSync(path, data, "utf8")
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