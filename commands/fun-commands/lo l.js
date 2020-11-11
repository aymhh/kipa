module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("lol")
    }
    module.exports.help = {
        name: "lo l",
        description: "custom command made by aymhh#1729-(176610715686273024) on 11/11/2020 @ 11:33:42 AM"
    }