module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("minecraft")
    }
    module.exports.help = {
        name: "mine",
        description: "custom command made by ezza#1499-(691190142114988103) on 11/9/2020 @ 6:26:1 PM"
    }