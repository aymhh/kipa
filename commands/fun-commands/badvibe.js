module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("youve been found guilty of being: a bad vibe <:nekogun:775219017392586794>")
    }
    module.exports.help = {
        name: "badvibe",
        description: "custom command made by steady#0666-(121487387913093120) on 11/9/2020 @ 3:43:46 PM"
    }