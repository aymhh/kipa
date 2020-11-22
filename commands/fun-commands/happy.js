module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("Yo, whats up? hope you're all well")
    }
    module.exports.help = {
        name: "happy",
        description: "custom command made by Mqthic#4052-(542817377784561664) on 11/15/2020 @ 8:13:17 PM"
    }