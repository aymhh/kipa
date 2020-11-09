module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("Y M C A")
    }
    module.exports.help = {
        name: "ymca",
        description: "custom command made by ezza#1499-(691190142114988103) on 11/9/2020 @ 5:19:3 PM"
    }