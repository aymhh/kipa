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

    if(message.channel != botCommandsChannel && message.author.id != message.guild.owner.id) {
        message.delete()
        return message.reply(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}))
    };
    
    if(message.author.id != message.guild.owner.id) {
        message.delete()
        return message.reply("only ameer can do this you dumb-dumb").then(msg => msg.delete({timeout: 7000}));
    }



    const deleteEmbed = new Discord.MessageEmbed()
        .setTitle("deleteing an emote from the server")
        .setDescription("please input the exact name of the emote you want to delete.")
        .addField("format:", `\`\`\`${prefix}edelete <emote>\`\`\``)
        .setColor(color)
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;   

    if(!args[0]) return message.channel.send(deleteEmbed)

    const emoteObject = message.guild.emojis.cache.find(emoji => emoji.name === emoteRegex(args[0]))
    if(emoteObject === undefined) return message.channel.send("couldn't find the emote\nmake sure the spelling/case-sensetivity are correct and if it's a custom emote from **this** server. you can also send the emote itself.")


    const deleteEmbedConfirm = new Discord.MessageEmbed()
        .setTitle("deleteing an emote from the server")
        .setDescription("are you sure you want to delete this emote?")
        .addField(`\`\`\`:${emoteObject.name}:\`\`\``, emoteObject)
        .addField("to confirm:", `\`\`\`click the ✅\`\`\``)
        .addField("to cancel:", `\`\`\`click the ❌\`\`\``)
        .setColor(color)
        .setThumbnail(emoteObject.url)
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;   
    const reactionFilter = (reaction, user) => reaction && user.id === message.author.id

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
    

    const confirmMessage = await message.channel.send(deleteEmbedConfirm)
        await confirmMessage.react('✅')
        await confirmMessage.react('❌')
    ;

    const reactionCollector = await confirmMessage.awaitReactions(reactionFilter, {max: 1, time: 30000}).then(async collected => {
        if(collected.first().emoji.name === "✅") {
            const deletingmsg = await message.channel.send("deleting...")
            emoteObject.delete(`${message.author} has deleted this emote ${emoteObject.url} thru kipa`)
            deletingmsg.edit("emoji has been deleted!")
        }
        
        if(collected.first().emoji.name === "❌") {
            const voidingmsg = await message.channel.send("voiding...")
            voidingmsg.edit("proccess voided")
        }
    })
    
};

module.exports.help = {
    name: "edelete"
};