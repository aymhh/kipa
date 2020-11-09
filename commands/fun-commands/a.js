module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("a")
    }
    module.exports.help = {
        name: "a",
        description: "custom command made by Orange#6266-(565295162389954607) on 11/9/2020 @ 6:26:31 PM"
    }