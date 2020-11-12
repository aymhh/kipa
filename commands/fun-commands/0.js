module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("@here @everyone")
    }
    module.exports.help = {
        name: "0",
        description: "custom command made by Orange#6266-(565295162389954607) on 11/12/2020 @ 8:9:56 AM"
    }