module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("club penguin")
    }
    module.exports.help = {
        name: "club",
        description: "custom command made by ezza#1499-(691190142114988103) on 11/9/2020 @ 6:25:13 PM"
    }