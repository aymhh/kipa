module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("@everyone")
    }
    module.exports.help = {
        name: "1",
        description: "custom command made by Orange#6266-(565295162389954607) on 11/12/2020 @ 8:26:26 AM"
    }