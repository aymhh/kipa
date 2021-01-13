const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {

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
    
    const arrayOfImages = [
        "https://media1.tenor.com/images/80f689a9a510e872807ad11b0560c736/tenor.gif", // Mai Sakuramaji
        "https://media1.tenor.com/images/0da232de2ee45e1464bf1d5916869a39/tenor.gif", // Anime Boop
        "https://i.imgur.com/787H2cR.gif", // Cat and Anime
        "https://external-preview.redd.it/OUH-i3psjBTK1FiMWcHKEhSuVJOLe8CMlngXCxm9YNE.jpg?width=960&crop=smart&auto=webp&s=31ab6e2dbfc106c75110b51f88f09b099e28b8b2", // Angry cat boop
        "https://64.media.tumblr.com/e2d1b80a49561036a20d586e19ae0138/tumblr_p5lqjqw4NX1uuyy36o1_400.gifv", // Cat Boop
        "https://media1.tenor.com/images/cbf38a2e97a348a621207c967a77628a/tenor.gif", // Anime big boop
        "https://media.tenor.com/images/3f364e971453b18a1ae2b5cc8d2d0613/tenor.gif", // Corgi Boop
        "https://media1.tenor.com/images/ea37d5c281b7ca7c35175bdc854b0a5b/tenor.gif", // Big Fluffy Boop
        "https://cdn.discordapp.com/attachments/773800167404208129/798785640640413716/AfDr.gif", // Funny Anime Boop purple hair
    ]

    let arrayPicker = arrayOfImages[Math.floor(Math.random() * arrayOfImages.length)]
    const boopedUser = message.mentions.members.first();

    const boop = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("booper!")
        .setDescription("pick someone to boop! <:mochaBear:782534955967971368>")
        .addField("usage:", `\`\`\`-boop <@user>\`\`\``)
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    const booperWorks = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("booper!")
        .setDescription(`${message.author} has booped ${boopedUser}`)
        .setTimestamp()
        .setImage(arrayPicker)
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    
    if(!args[0] || !boopedUser) return message.channel.send(boop)
    else {
        message.delete()
        message.channel.send(booperWorks)
    }
};

module.exports.help = {
    name: "boop"
};