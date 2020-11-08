module.exports.run = async (bot, message, args) => {
    message.delete()
    message.channel.send("zza's on top!")
}
module.exports.help = {
    name: "zza",
    description: `custom command made by ezza#1499`
}