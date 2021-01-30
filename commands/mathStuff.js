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
    if(message.channel != botCommandsChannel && message.author.id != message.guild.owner.id) {
        message.delete()
        return message.reply(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}))
    };
    
    const calcEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("simple calculator!")
        .setDescription("just a simple calculator command that can:\n > add, subtract, multiply, divide and powers\nin that order")
        .addField("before you starting calculating", `you have 30 seconds to input each number *(dw if you ran outa time you can just \`${prefix}calc\` again)*\n\n> - you'll be first to asked to enter the first number, then the second\n> - no letters *(duh)*`)
        .setImage("https://data.whicdn.com/images/254993580/original.gif")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    const reactionFilter = (reaction, user) => reaction && user.id === message.author.id
    const messageFilter = x => {
        return (x.author.id === message.author.id)}
      ;
    
    const embedMessage = await message.channel.send(calcEmbed)
        await embedMessage.react("➕")
        await embedMessage.react("➖")
        await embedMessage.react("✖️")
        await embedMessage.react("➗")
        await embedMessage.react("🔥")
    ;

    const reactionsCollector = await embedMessage.awaitReactions(reactionFilter, {max: 1, time: 30000}).then(async collected => {

        if(collected.first().emoji.name === '➕') {

            const mathPlus1Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("addition calculator!")
                .setDescription(`what's the first number you want to add?`)
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg1 = await embedMessage.edit(mathPlus1Embed)
            const msg1awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number1 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathPlus2Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("addition calculator!")
                .setDescription(`${number1} + ? = ?`)
                .addField("what is the second number?", "*remember: only integers*")
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg2 = await embedMessage.edit(mathPlus2Embed)
            const msg2awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number2 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathPlus3Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("addition calculator!")
                .setDescription(`${number1} + ${number2} = ${number1 + number2}`)
                .addField(`answer is: `, `\`\`\`${number1 + number2}\`\`\``)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setImage("https://i.imgflip.com/3qdju4.png")
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            return embedMessage.edit(mathPlus3Embed)
        }

        if(collected.first().emoji.name === '➖') {

            const mathMinus1Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("minus calculator!")
                .setDescription(`what's the first number you want to subtract?`)
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg1 = await embedMessage.edit(mathMinus1Embed)
            const msg1awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number1 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathMinus2Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("minus calculator!")
                .setDescription(`${number1} - ? = ?`)
                .addField("what is the second number?", "*remember: only integers*")
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg2 = await embedMessage.edit(mathMinus2Embed)
            const msg2awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number2 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathMinus3Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("minus calculator!")
                .setDescription(`${number1} - ${number2} = ${number1 - number2}`)
                .addField(`answer is: `, `\`\`\`${number1 - number2}\`\`\``)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setImage("https://i.imgflip.com/3qdju4.png")
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            return embedMessage.edit(mathMinus3Embed)
        }

        if(collected.first().emoji.name === '✖️') {

            const mathMultiply1Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("multiplication calculator!")
                .setDescription(`what's the first number you want to mutliply?`)
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg1 = await embedMessage.edit(mathMultiply1Embed)
            const msg1awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number1 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathMultiply2Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("multiplication calculator!")
                .setDescription(`${number1} * ? = ?`)
                .addField("what is the second number?", "*remember: only integers*")
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg2 = await embedMessage.edit(mathMultiply2Embed)
            const msg2awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number2 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathMultiply3Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("multiplication calculator!")
                .setDescription(`${number1} * ${number2} = ${number1 * number2}`)
                .addField(`answer is: `, `\`\`\`${number1 * number2}\`\`\``)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setImage("https://i.imgflip.com/3qdju4.png")
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            return embedMessage.edit(mathMultiply3Embed)
        }

        if(collected.first().emoji.name === '➗') {

            const mathDivide1Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("division calculator!")
                .setDescription(`what's the first number you want to divide?`)
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg1 = await embedMessage.edit(mathDivide1Embed)
            const msg1awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number1 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathDivide2Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("division calculator!")
                .setDescription(`${number1} / ? = ?`)
                .addField("what is the second number?", "*remember: only integers*")
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg2 = await embedMessage.edit(mathDivide2Embed)
            const msg2awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number2 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathDivide3Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("division calculator!")
                .setDescription(`${number1} / ${number2} = ${number1 / number2}`)
                .addField(`answer is: `, `\`\`\`${number1 / number2}\`\`\``)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setImage("https://i.imgflip.com/3qdju4.png")
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            return embedMessage.edit(mathDivide3Embed)
        }

        if(collected.first().emoji.name === '🔥') {

            const mathExponent1Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("power calculator!")
                .setDescription(`what's is the base?`)
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg1 = await embedMessage.edit(mathExponent1Embed)
            const msg1awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number1 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathExponent2Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("power calculator!")
                .setDescription(`${number1} ^ ? = ?`)
                .addField("what is the exponent?", "*remember: only integers*")
                .setTimestamp()
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;
            const msg2 = await embedMessage.edit(mathExponent2Embed)
            const msg2awaiter = await message.channel.awaitMessages(messageFilter, {max: 1, time: 30000});
            if(isNaN(message.member.lastMessage.content)) return message.reply("that aint a number dummy! <:smh:775530864830054451>")
            const number2 = Number(message.member.lastMessage.content)
            message.member.lastMessage.delete()


            const mathExponent3Embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("power calculator!")
                .setDescription(`${number1} ^ ${number2} = ${Math.pow(number1, number2)}`)
                .addField("answer is:", `\`\`\`${Math.pow(number1, number2)}\`\`\``)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setImage("https://i.imgflip.com/3qdju4.png")
                .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
            ;

            return embedMessage.edit(mathExponent3Embed)

        }

    }).catch(collected => {
        return;
    })
    
};

module.exports.help = {
    name: "calc"
};