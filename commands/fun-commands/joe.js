module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("joe mama")
    }
    module.exports.help = {
        name: "joe",
        description: "custom command made by ezza#1499-(691190142114988103) on 11/9/2020 @ 3:45:9 PM"
    }