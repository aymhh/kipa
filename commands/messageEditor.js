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

    const ruleChannel = bot.channels.cache.find(channel => channel.name === "rules-n-info")

    const rulesEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("**rules!**")
        .setDescription('very simple rules, not hard to follow <a:shmoonBoon:743305198042349629>\n' +
        '\n' +
        '> - no racial slurs towards anyone\n' +
        '> - be courteous to others\n' +
        "> - try your best to use the correct channels for the correct purpose\n" + 
        "> - just use common sense (don't spam dumb shit, don't be annoying...)\n" +
        '*punishments are random and to what i please*\n' +
        '\n' +
        '<a:wHearts:699285627912454195> cya around')
        .setTimestamp()
        .setThumbnail("https://i.pinimg.com/736x/b4/f7/2b/b4f72b355e4bea57060fb71a4c3fc82a.jpg")
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    message.delete()

    await ruleChannel.messages.fetch("775265770136403968").then(message => {
        return message.edit(rulesEmbed)
    })

    console.log("the rules message has been edited!")

};

module.exports.help = {
    name: "editRules"
};