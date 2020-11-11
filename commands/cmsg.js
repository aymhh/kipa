const Discord = require("discord.js");
const { prefix, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {
    const formatEmbed = new Discord.MessageEmbed()
        .setTitle("creating simple commands!")
        .setDescription("since i really like you, you can create a simple command so I can repeat whenever you want")
        .addField("before you start adding em: ", "- when you start the proccess you have 30 seconds to input each argument\n- you can have it display emotes, however they must be from this server\n- if you see anything out of order spam ameer")
        .addField("format:", "```" + prefix + "cmsgStart```\n*if you're wondering where is the old method, i removed it because i was amazed at the stupidity of ya'll <:smh:775530864830054451>*")
        .setTimestamp()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(color)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    message.channel.send(formatEmbed)
}
module.exports.help = {
    name: "cmsg"
}