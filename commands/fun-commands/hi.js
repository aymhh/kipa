module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("Hi")
    }
    module.exports.help = {
        name: "hi",
        description: "custom command made by Tazza#0001-(265468010658136064) on 11/15/2020 @ 8:16:51 PM"
    }