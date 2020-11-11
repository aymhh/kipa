module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("i don't know")
    }
    module.exports.help = {
        name: "idk",
        description: "custom command made by aymhh#1729-(176610715686273024) on 11/11/2020 @ 12:16:16 PM"
    }