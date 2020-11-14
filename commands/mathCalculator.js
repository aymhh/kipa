const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    const filter = x => {
        return (x.author.id === message.author.id)}
    ;    

    const msg1 = await message.channel.send("what do you want to add `(first number pls)`")
    const firstAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
    if (!firstAwaiter.size) return message.channel.send(nulledEmbed);
    const number1string = message.member.lastMessage.content
    if(isNaN(number1string)) return message.reply("only numbers idiot....")

    const msg2 = await message.channel.send("what do you want to add `(second number pls)`")
    const secondAwaiter = await message.channel.awaitMessages(filter, {max: 1, time: 30000});
    if (!secondAwaiter.size) return message.channel.send(nulledEmbed);
    const number2string = message.member.lastMessage.content
    if(isNaN(number2string)) return message.reply("only numbers idiot....")

    message.channel.send("result: " + (1 + 2))
} 

module.exports.help = {
    name: "calc",
    description: "some addition calculator :pikalul:"
}