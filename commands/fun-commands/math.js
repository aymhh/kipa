module.exports.run = async (bot, message) => {
        message.delete()
        message.channel.send("hick needs help")
    }
    module.exports.help = {
        name: "math",
        description: "custom command made by caliber#0684-(333889241585025027) on 11/9/2020 @ 3:37:51 PM"
    }