module.exports.run = async (bot, message, args) => {
    if(message.channel != "775261992407400499") {
        message.delete()
        return message.member.send("dont post your cringe shit in general, post it in <#775261992407400499>")
    }
    message.delete()
    message.channel.send("zza's on top!")
}
module.exports.help = {
    name: "zza",
    description: `custom command made by ezza#1499`
}