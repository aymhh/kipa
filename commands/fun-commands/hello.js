module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("hello")
    }
    module.exports.help = {
        name: "hello",
        description: "custom command made by Orange#6266-(565295162389954607) on 11/9/2020 @ 6:26:54 PM"
    }