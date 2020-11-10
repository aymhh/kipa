const Discord = require("discord.js");
const fs = require("fs")
function correctTime(timestamp) {

    const mainTime = new Date(timestamp);
    let day, month, year, hour, minute, second;
    day = mainTime.getDate();
    month = mainTime.getMonth() + 1;
    year = mainTime.getFullYear();
    hour = mainTime.getHours();
    minute = mainTime.getMinutes();
    second = mainTime.getSeconds();
    modifier = 'AM';
    if (hour === 12) { modifier = "PM" }
    if (hour > 12) {
        hour -= 12;
        modifier = 'PM'
    }
    return `${month}/${day}/${year} @ ${hour}:${minute}:${second} ${modifier}`;
}
const { prefix, color, commands }  = require(`../indiscriminate/config.json`);

module.exports.run = async (bot, message, args) => {

    return message.reply("under maintenance <a:yawn:775532756422754304>")
}
module.exports.help = {
    name: "cmsg"
}