const Discord = require("discord.js");
const { prefix, token, color, commands, logChannelName }  = require(`../indiscriminate/config.json`);

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

    if(message.channel != botCommandsChannel && message.author.id != message.guild.owner.id) {
        message.delete()
        return message.reply(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}))
    };
    
    if(message.author.id != message.guild.owner.id) {
        message.delete()
        return message.reply("only ameer can do this you dumb-dumb").then(msg => msg.delete({timeout: 7000}));
    }


    function emoteRegex(oldEmoteName) {
        if(oldEmoteName.startsWith("<:")) {
            let emoteName = oldEmoteName.slice(2, -20)

            return emoteName
        }

        if(oldEmoteName.startsWith("<a:")) {
            let emoteName = oldEmoteName.slice(3, -20)

            return emoteName
        }

        if(!oldEmoteName.startsWith("<a:") || !oldEmoteName.startsWith("<:")) {
            return oldEmoteName
        }
    
        return emoteName
    }
    const messageFilter = x => {
        return (x.author.id === message.author.id)}
    ;

    const editEmoteEmbed = new Discord.MessageEmbed()
        .setTitle("editing an emote")
        .setDescription("please input the emote you want to edit.")
        .addField("format:", `\`\`\`${prefix}eedit <emote>\`\`\`\n*keep in mind this can only edit the name of the emote.*`)
        .setColor(color)
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    if(!args[0]) return message.channel.send(editEmoteEmbed)

    
    const racialWordsArray = require(`../chat-filters/racicalWords.json`);
    const loggingChannel = message.guild.channels.cache.find(channel => channel.name === logChannelName)
    const emoteObject = message.guild.emojis.cache.find(emoji => emoji.name === emoteRegex(args[0]))
    const oldEmoteName = emoteObject.name
    if(emoteObject === undefined) return message.channel.send("couldn't find the emote\nmake sure the spelling/case-sensitivity are correct and if it's a custom emote from **this** server. you can also send the emote itself.")


    const editEmoteConfirm = new Discord.MessageEmbed()
        .setTitle("editing an emote")
        .setDescription("what do you want to rename this emote to?\n*you have 30 seconds to input this or the proccess will be nulled*")
        .addField(`Current Name:`, `\`\`\`:${emoteObject.name}:\`\`\``)
        .setColor(color)
        .setThumbnail(emoteObject.url)
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;   


    const message1 = await message.channel.send(editEmoteConfirm)
    const emoteNameUpdateAwaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000})
    if(!emoteNameUpdateAwaiter.size) return message.edit("you ran out of time...\nrestart this proccess if you want to start again")
    const newEmoteName = message.member.lastMessage.content

    for (a = 0; a < racialWordsArray.length; a++) {
        if(newEmoteName.includes(racialWordsArray[a])) return message.reply("don't be stupid and do that...\nproccess nulled, start again and use common sense this time")
    };
    
    if(newEmoteName < 2) return message.channel.send("too few characters, make sure it's between 3 to 31 characters\nproccess nulled, start again")
    if(newEmoteName > 32) return message.channel.send("too many characters, make sure it's between 3 to 31 characters\nproccess nulled, start again")
    

    emoteObject.setName(newEmoteName, `${message.author.discriminate} has renamed the ${emoteObject.name} emote to ${newEmoteName}`)

    const editedEmoteConfirm = new Discord.MessageEmbed()
        .setTitle("editing an emote")
        .setDescription("emote has been updated/renamed...")
        .addField(`Before:`, `\`\`\`:${oldEmoteName}:\`\`\``)
        .addField(`After:`, `\`\`\`:${newEmoteName}:\`\`\``)
        .setColor(color)
        .setThumbnail(emoteObject.url)
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;     
    const confirmationMessage = await message.channel.send(editedEmoteConfirm)

    // Emote Edit Logger
    const emoteUpdatedLogEmbed = new Discord.MessageEmbed()
        .setTitle("An emote has been updated...")
        .setDescription(`${message.author} has renamed an emote. ${emoteObject.toString()}`)
        .addField(`Before:`, `\`\`\`:${oldEmoteName}:\`\`\``, true)
        .addField(`After:`, `\`\`\`:${newEmoteName}:\`\`\``, true)
        .addField(`Location of updating:`, `[Beam me up Kipa](${confirmationMessage.url} 'Click here to be beamed up to when the emote has been updated.')`)
        .setColor(color)
        .setThumbnail(emoteObject.url)
        .setTimestamp()
        .setFooter(bot.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    loggingChannel.send(emoteUpdatedLogEmbed)

};

module.exports.help = {
    name: "eedit"
};