const Discord = require("discord.js");
const { prefix, token, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message) => {
     // Restricts commands to bot commands channels
   let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === `${commands}`)
   const wrongChannelEmbed = new Discord.MessageEmbed()
     .setColor('#FF6961')
     .setTitle("error!")
     .setDescription("wrong channel!")
     .addField("i live in:", `<#${botCommandsChannel.id}>`)
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    
   if(message.channel != botCommandsChannel) {
    message.delete()
    message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
    return ;
    }


    let pcImages = [
        "https://media1.tenor.com/images/4645263a7bebdaa5212d668f6fd64deb/tenor.gif?itemid=14364035",
        "https://media1.tenor.com/images/e7c24837bbe110000aec290a0b7f76eb/tenor.gif?itemid=3415967",
        "https://i.pinimg.com/originals/a2/b4/ae/a2b4ae4ebabcd10ff10a1581366f6df2.gif",
        "https://i.imgur.com/uCE54aB.gif?noredirect",
        "https://i.pinimg.com/originals/0d/10/d2/0d10d2fe48a7956a4fdc9f7251132236.gif",
        "https://i.pinimg.com/originals/0d/10/d2/0d10d2fe48a7956a4fdc9f7251132236.gif",
        "https://data.whicdn.com/images/54406285/original.gif",
        "https://24.media.tumblr.com/tumblr_m2fhai4Vqh1qmpg90o1_500.gif",
        "https://i.pinimg.com/originals/07/89/c2/0789c202335c03dd9175faa2f57981e7.gif"
    ]

    let pcImagesArray = pcImages[Math.floor(Math.random() * pcImages.length)];
    
    const aboutEmbed = new Discord.MessageEmbed()
     .setColor("ABDFF2")
     .setTitle("About author page...")
     .setDescription("For " + bot.user.username)
     .addField("Author: ", "aymhh#1729")
     .addField("<:twitter:768132436508278877> Twitter:", "[Click here!](https://twitter.com/itsaymhh 'This will take you to my Twitter profile!')", true)
     .addField("<:github:768132478526554143> GitHub:", "[Click here!](https://github.com/aymhh 'This will take you to my GitHub profile!')", true)
     .addField("<:heiwa:768132713701834773> Portfolio:", "[Click here!](https://aymhh-artwork.my-free.website/ 'This will take you to my artworks profile!')", true)
     .setTimestamp()
     .setFooter(message.author.tag + " | " + message.guild.name, message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setImage(pcImagesArray)
    ;

    message.channel.send(aboutEmbed);
};

module.exports.help = {
    name: "about"
};