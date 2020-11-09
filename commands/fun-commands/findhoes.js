module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("i found em! it's the ZZA's")
    }
    module.exports.help = {
        name: "findhoes",
        description: "custom command made by aymhh#1729-(176610715686273024) on 11/9/2020 @ 8:16:14 PM"
    }