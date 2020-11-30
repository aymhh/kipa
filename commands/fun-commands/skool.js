module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("bad")
    }
    module.exports.help = {
        name: "skool",
        description: "custom command made by oya?#5696-(286063415502438401) on 11/30/2020 @ 5:54:41 PM"
    }