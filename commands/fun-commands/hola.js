module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("@everyone")
    }
    module.exports.help = {
        name: "hola",
        description: "custom command made by Tazza#0001-(265468010658136064) on 11/12/2020 @ 1:32:32 AM"
    }