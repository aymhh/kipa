const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const fs = require("fs");
const { prefix, token, color, logChannelName, commands }  = require("./indiscriminate/config.json");
const racicalWords = require('./chat-filters/racicalWords.json');
const { connect } = require("pm2");
const talkedRecently = new Set();

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

// Command file loader
  fs.readdir("./commands/", (err, files) => {
  
  const jsfile = files.filter(f => f.split(".").pop() === "js")

  if(err) console.log(err);   
  if(jsfile.length <= 0) return console.log("There are no .js files in the commands directory...");

  jsfile.forEach((f) =>{
    const props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
  fs.readdir("./commands/fun-commands", (err, files) => {
  
  const jsfile = files.filter(f => f.split(".").pop() === "js")

  if(err) console.log(err);   
  if(jsfile.length <= 0) return console.log("There are no .js files in the `commands/fun-commands` directory...");

  jsfile.forEach((f) =>{
    const props = require(`./commands/fun-commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

// Message Event Listener
  bot.on('message', async (message) => {
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    const commandfile = bot.commands.get(cmd.slice(prefix.length));
    const botCommandsChannel = bot.channels.cache.find(channel => channel.name === `${commands}`)
    const messageContent = message.content
    const icon = 'https://pbs.twimg.com/profile_images/444062741548892161/iSW-ycW5.png'

    const noCommandEmbed = new Discord.MessageEmbed()
      .setColor("FF6961")
      .setTitle("error!")
      .setDescription("command doesn't exist")
      .addField(`${prefix}help to see what commands you can do!`, "**keep in mind these are all cap sensitive!**")
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const anotherBotEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("tried to use another bot?")
      .setDescription(`they all live in <#${botCommandsChannel.id}>`)
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    
    if(message.author.bot) return ;
    if(message.channel.type === "dm") return ;
    if(message.content.startsWith("!") && message.channel.id != botCommandsChannel.id) return message.reply(anotherBotEmbed).then(message => message.delete({timeout: 5000}))
    if(message.content.startsWith(prefix) && !commandfile) return message.channel.send(noCommandEmbed).then(message => message.delete({timeout: 6000}));
    
    // anti-message duping in #cooldmusic
    if(message.channel.id === "773794674288230411") { 

      const channelMessages = await message.channel.messages.fetch({ limit: 100 })
      const checker = await channelMessages.filter(message => message.content === messageContent)

      if(checker.size === 1) return ; 
      else if(checker.size >= 2) {
        message.delete()
        const kipaMessage = await message.author.send("uh this was posted in here already, i can post this for you if you want it there again.\n> hit the reaction for me to do so")
          await kipaMessage.react("776431962428538891")
            const reactionFilter = (reaction, user) => reaction && user.id === message.author.id

        kipaMessage.awaitReactions(reactionFilter, {max: 1}).then(collected => {
          if(collected.first().emoji.id === "776431962428538891") {
            const coolMusicChannel = bot.channels.cache.get("773794674288230411")
            coolMusicChannel.send(messageContent)
            kipaMessage.edit(`sent ${messageContent}`)
          }
        })
    };
    
    // Conststants setup
    
    const racicalEmbed = new Discord.MessageEmbed()
      .setTitle('Do not say any racial slurs.')
      .setDescription('Don\'t say stupid stuff! <#773800772219568169>')
      .setColor('FF6961')
      .setThumbnail(icon)
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    
    const toxicityEmbed = new Discord.MessageEmbed()
      .setTitle('Do not say such offensive words.')
      .setDescription('Don\'t say stupid stuff! <#773800772219568169>')
      .setColor('FFD700')
      .setThumbnail(icon)
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
      ;
    // Checks for racial slurs
    for (x = 0; x < racicalWords.length; x++) {
      if(message.content.includes(racicalWords[x])) {
        message.delete();
        return message.channel.send(racicalEmbed).then(msg => msg.delete({timeout: 8500}))
      }   
    };
    };
    if(message.content.startsWith(prefix) && commandfile && talkedRecently.has(message.author.id)) {
      console.log(`${message.author.username} has tried to use the ${message.content} command, but got stopped.`) 
      message.delete()
      return message.author.send("slow down there O_O, a command every 2 seconds please")
    };
    if(message.content.startsWith(prefix) && commandfile) {
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id)
        }, 2000);
      return commandfile.run(bot, message, args)
    };
});

// Logging messages that have been editied
  bot.on('messageUpdate', async (oldMessage, newMessage) => {
    const logChannel = oldMessage.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)

    if(oldMessage.content === newMessage.content) return ;
    if(newMessage.author.bot) return ;

    const editEmbed = new Discord.MessageEmbed()
      .setTitle("A message was edited...")
      .setDescription(`Message author: ${oldMessage.author}\nIn channel: ${oldMessage.channel}`)
      .setTimestamp()
      .addField("Before:", `\`\`\`${oldMessage.content}\`\`\`` , false)
      .addField("After:", `\`\`\`${newMessage.content}\`\`\`` , false)
      .addField("Beam me up Kīpā: ", `[Context](${newMessage.url} "Send's you to the message, *given that it still exists*")`, true)
      .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setColor('#FCEEC5')
    ;
    logChannel.send(editEmbed);
});

// Logging messages that have been deleted
  bot.on('messageDelete', async (message) => {
    const logChannel = message.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)

    function last3Characters(input) {
  const numberToSlice = input.length - 3
  return input.slice(numberToSlice, input.length)
    };

    if(!logChannel) return message.channel.send(`couldn't log this deleted message, create a private channel named \`${logChannelName}\` to start collected these messages`).then(message => message.delete({timeout: 5000}))
    if(message.author.bot) return;
    
    if(message.attachments.size === 0 && message.content.startsWith("```")) {
      const messageDeletedEmbed = new Discord.MessageEmbed()
        .setTitle("A code-blocked messages was deleted...")
        .setDescription(`Message author: ${message.author}\nIn channel: ${message.channel}`)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
        .addField("Message:", `${message.content}`, false)
        .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setColor('#FF0064')
      ;
      return logChannel.send(messageDeletedEmbed)

      } else if(message.attachments.size === 0) {
        const messageDeletedEmbed = new Discord.MessageEmbed()
          .setTitle("A message was deleted...")
          .setDescription(`Message author: ${message.author}\nIn channel: ${message.channel}`)
          .setTimestamp()
          .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
          .addField("Message:", `\`\`\`${message.content}\`\`\``, false)
          .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setColor('#9D0F01')
        ;
        return logChannel.send(messageDeletedEmbed)

      } else if(message.attachments.size && message.content) {
        const mediaDeletedWordsEmbed = new Discord.MessageEmbed()
          .setTitle("A media message was deleted...")
          .setDescription(`Message author: ${message.author}\nIn channel: ${message.channel}`)
          .setTimestamp()
          .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
          .addField("Media Link:", `[Click here for the file link](${message.attachments.first().proxyURL} '${message.attachments.first().proxyURL}')`, true)
          .addField("Type of file:", last3Characters(message.attachments.first().proxyURL).toUpperCase(), true)
          .addField("Message Content:", `\`\`\`${message.content}\`\`\``)
          .setImage(message.attachments.first().proxyURL)
          .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setColor('#9D0F01')
        ;
        return logChannel.send(mediaDeletedWordsEmbed)

      } else {
        const mediaDeletedNoWordsEmbed = new Discord.MessageEmbed()
          .setTitle("A media message was deleted...")
          .setDescription(`Message author: ${message.author}\nIn channel: ${message.channel}`)
          .setTimestamp()
          .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
          .addField("Media Link:", `[Click here for the file link](${message.attachments.first().proxyURL} '${message.attachments.first().proxyURL}')`, true)
          .addField("Type of file:", last3Characters(message.attachments.first().proxyURL).toUpperCase(), true)
          .setImage(message.attachments.first().proxyURL)
          .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setColor('#9D0F01')
        ;
      return logChannel.send(mediaDeletedNoWordsEmbed)
    };
});

// Logging channels updates
  bot.on('voiceStateUpdate', async (oldState, newState) => {
    const logChannel = oldState.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)

    if(oldState.member.bot) return ;
    if(newState.member.bot) return ;
     
    if(oldState.channelID === null && newState.channelID !== null) {
        const joinVCEmbed = new Discord.MessageEmbed()
          .setTitle("Someone has joined a voice channel...")
          .setDescription(`${newState.member} has joined a voice channel on the server.`)
          .addField("Joined:", `\`\`\`${newState.channel.name}\`\`\``, true)
          .setThumbnail(newState.member.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setTimestamp()
          .setColor('#9400FF')
        ;
        logChannel.send(joinVCEmbed)
    } else if(oldState.channelID !== null && newState.channelID === null) {
        const leftVCEmbed = new Discord.MessageEmbed()
          .setTitle("Someone has left a voice channel...")
          .setDescription(`${oldState.member} has left a voice channel on the server.`)
          .addField("Left:", `\`\`\`${oldState.channel.name}\`\`\``, true)
          .setThumbnail(oldState.member.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setTimestamp()
          .setColor('#4B0082')
        ;
        logChannel.send(leftVCEmbed)
    } else if(oldState.channelID && newState.channelID){
      const movedVCEmbed = new Discord.MessageEmbed()
      .setTitle("Someone has switched voice channels...")
      .setDescription(`${newState.member} has switched voice channels on the server.`)
      .addField("Left:", `\`\`\`${oldState.channel.name}\`\`\``, true)
      .addField("Joined:", `\`\`\`${newState.channel.name}\`\`\``, true)
      .setThumbnail(newState.member.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setColor('#C77AFF')
    ;
    logChannel.send(movedVCEmbed)
    }
});

// Logging members who have joined
  bot.on('guildMemberAdd', async (member) => {
    const logChannel = member.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)

    const welcomelinks = [
      "https://vrscout.com/wp-content/uploads/2019/03/BearsVRpromo.png",
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/55660762-c858-4a1b-9239-4e143f216fa4/ddb7pv0-b16feb5c-f16c-4a53-a883-3240632e712f.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNTU2NjA3NjItYzg1OC00YTFiLTkyMzktNGUxNDNmMjE2ZmE0XC9kZGI3cHYwLWIxNmZlYjVjLWYxNmMtNGE1My1hODgzLTMyNDA2MzJlNzEyZi5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.DTVsyeKyk790j4l47OqXwUbjXSo6iXMBk4w6Aakx5YM",
      "https://i.kym-cdn.com/photos/images/newsfeed/001/105/063/a95.gif",
      "https://i.pinimg.com/originals/f7/7b/32/f77b32dddd0bf3ee83cae787e3455601.gif",
      "https://i.imgur.com/oI34oST.gif",
      "https://media1.tenor.com/images/79d8ebb1dd7dd9ef2367195d53177675/tenor.gif?itemid=14737417",
      "https://thumbs.gfycat.com/BasicWarpedIraniangroundjay-size_restricted.gif",
      "https://i.pinimg.com/originals/c8/fb/93/c8fb93ec1f0625fb6c4bd290d55584b4.gif",
      "https://media4.giphy.com/media/fYqzzDxirohL3ztWco/giphy.gif",
      "https://media1.tenor.com/images/98db66484855485d31368d0ee841bc4c/tenor.gif?itemid=17446545",
      "https://i.pinimg.com/originals/8b/75/b3/8b75b306e596831ef68786aeed4157e0.gif",
      "https://i.pinimg.com/originals/cc/3d/04/cc3d04f42a1f02c05f342c32fd7ee328.gif",
      "https://64.media.tumblr.com/dbad800bb7006b35f1b3c3a33bfdb029/tumblr_pzaeiymEI11yp117xo1_400.gifv",
      "https://steamuserimages-a.akamaihd.net/ugc/778483653571516741/43053EFDD8C89B4FEB01DEE74F0915C7C21F974B/",
      "https://steamuserimages-a.akamaihd.net/ugc/778483653571516741/43053EFDD8C89B4FEB01DEE74F0915C7C21F974B/",
      "https://media1.giphy.com/media/NfBQ73MtvPJS/200.gif",
      "https://i.pinimg.com/originals/2e/1d/99/2e1d99bb86d86665343aacfaaf2f57c7.gif",
      "https://cdn105.picsart.com/201681963000201.gif?to=min&r=640",
      "https://media1.giphy.com/media/3BVuVJv8fUGRi/giphy-downsized.gif",
      "https://pa1.narvii.com/6546/7e689ca1ac4ca3dfc21c7b69a55b4d75afe4cd9f_hq.gif",
      "https://image.myanimelist.net/ui/W1a-Jc991lCLrDuURME2NRtvpjDD4y5bSYsBL9VBH8MT-wkAL9ZeZIsWodLUY-xnk9w3tcB8xmjpNa_skQfloem5FGHJHA1iB2RA12u5LCrr_4NqpIrDsAbVvM_m9fe1",
      "https://64.media.tumblr.com/57057a3bec493a526c9c6a863f8bf451/9ff42b96f0a342a3-35/s540x810/b6d76f1d1d1568ad6b67b53e36b6ddbe3c286c61.gifv",
      "https://media1.tenor.com/images/0987fc53c43c84ed269b939d112523c6/tenor.gif?itemid=16024097",
      "https://66.media.tumblr.com/8910034f4c16cdb891ef0b51cd292810/tumblr_pl9fvqyOx01y2dez5o1_540.gif",
      "https://pa1.narvii.com/7614/2abac3ac46a8fa038a4b5da81511002a759ee2d7r1-500-258_hq.gif",
      "https://64.media.tumblr.com/1159af3f53ea5315fcc836caadbe3f8b/tumblr_inline_p2z68hIbGo1sg52su_500.gifv",
      "https://pa1.narvii.com/6962/7e52bf55b3c7117520b4633bf8bcb29e57abecaer1-540-304_hq.gif",
      "https://pa1.narvii.com/6962/7e52bf55b3c7117520b4633bf8bcb29e57abecaer1-540-304_hq.gif",
      "https://pa1.narvii.com/6962/7e52bf55b3c7117520b4633bf8bcb29e57abecaer1-540-304_hq.gif",
      "https://image.myanimelist.net/ui/W1a-Jc991lCLrDuURME2NeN5F2n-8e1NmZ-mwf2NpKL-FmO-DxRRW1tB5xa7eeGX0Prx0MwugZ2F4KwCqUlqWwsyZ28wxxOlt6k4Tih3psKnolnIv5p7ySmc7UW6aFmWx9MiF3-wlSYi2-aazCPJ1Q",
      "https://i.pinimg.com/originals/ed/a5/fe/eda5fee729e2d1a5930d4ef9bf4ed107.gif",
      "https://i.pinimg.com/originals/74/29/e8/7429e8f84354c22adf7f3566ad0d2c2d.gif",
      "https://i.pinimg.com/originals/6c/c8/45/6cc845ebddfcf63e81a57326e00cb0dd.gif",
      "https://i.imgur.com/ecwGVGS.gif",
      "https://i.pinimg.com/originals/bc/b1/8a/bcb18a1ac03ade0bf86ecc6cf897f868.gif",
      "https://64.media.tumblr.com/0cff0f1925bd3aa78bbafa1a71358ff9/cb522352feb5b644-48/s500x750/34603392179726eb66bab00f702275745122125f.gifv",
      "https://i.imgur.com/s9uHK1m.gif",
      "https://i.imgur.com/yBEmB70.gif?noredirect",
      "https://i.imgur.com/uwDtW1f.gif",
      "https://media1.tenor.com/images/75b7ee56e043ad3a4c7f569959b4ae92/tenor.gif?itemid=15399460",
      "https://66.media.tumblr.com/d5ac29dc7d02dca333052ccff9974716/tumblr_py92wqiWRx1uua4qmo1_540.gif",
      "https://pa1.narvii.com/7152/5fefd2e840db11221b954332e9688b7f05f49c48r1-400-224_00.gif",
      "https://cdn.discordapp.com/attachments/778592844905971713/782158593688338432/best_gif.gif"
    ]
    const welcomeLinksPicker = welcomelinks[Math.floor(Math.random() * welcomelinks.length)];
    const botCommandsChannel = bot.channels.cache.find(channel => channel.name === `${commands}`)
    const joinChan = member.guild.channels.cache.find(channel => channel.name === 'konnichiwa')
    const ruleChan = member.guild.channels.cache.find(channel => channel.name === 'rules-n-info')

    const joinEmbed = new Discord.MessageEmbed()
      .setTitle("A user has joined the discord...")
      .setDescription(`<@${member.user.id}> joined the discord.`)
      .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
      .addField("User Details:", member.user.tag, true)
      .addField("Status:", member.presence.status, true)
      .addField("Bot?", member.user.bot, true)
      .addField("ID:", member.user.id, true)
      .addField("Account Created:", member.user.createdAt)
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setColor('#B5EAD7')
    ;
    const generalEmbedJoin = new Discord.MessageEmbed()
      .setTitle(`hey ${member.user.username}`)
      .setDescription(`enjoy your stay\nread the rules\nchill`)
      .addField("want to use me?", `\`${prefix}help\` in ${botCommandsChannel}\nvery cool stuff`)
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setColor(color)
      .setImage(welcomeLinksPicker)
    ;

    logChannel.send(joinEmbed);
    joinChan.send(generalEmbedJoin);
    return ruleChan.send(`hello! <@${member.user.id}>\n please read everything in this channel and then you can start chatting <:pikaLove:775957418365943838>`).then(message => message.delete({timeout: 20000}))
});

// Logging members who have left
  bot.on('guildMemberRemove', async (member) => {
    const logChannel = member.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)
    const leaveEmbed = new Discord.MessageEmbed()
      .setTitle("A user has left the discord...")
      .setDescription(`<@${member.user.id}> has left the discord.`)
      .setTimestamp()
      .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
      .addField("User Details:", member.user.tag, true)
      .addField("Status:", member.presence.status, true)
      .addField("Bot?", member.user.bot, true)
      .addField("ID:", member.user.id, true)
      .addField("Joined at:", member.joinedAt)
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setColor('#2a3b90')
    ;
    logChannel.send(leaveEmbed);
});

// Various member state updates
  bot.on('guildMemberUpdate', async (oldMember, newMember) => {
    const logChannel = newMember.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)

    if(newMember === oldMember) return ;

    // server nickname tracker
    if(oldMember.nickname !== newMember.nickname) {
      const nicknameUpdateEmbed = new Discord.MessageEmbed()
        .setTitle("Someone has updated their nickname...")
        .setDescription(`${newMember.discriminator} has updated thier nickname on the server.`)
        .addField("Before:", `\`\`\`${oldMember.displayName}\`\`\``, true)
        .addField("After:", `\`\`\`${newMember.displayName}\`\`\``, true)
        .setThumbnail(newMember.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setColor('#00DCFF')
      ;
    logChannel.send(nicknameUpdateEmbed)
    };

    // rank tracker (checking who has been given what rank)
    if(newMember.roles !== oldMember.roles) {
      const difference = await oldMember.roles.cache.difference(newMember.roles.cache)

      const rolesUpdateAddEmbed = new Discord.MessageEmbed()
        .setTitle("Someone has updated their roles...")
        .setDescription(`${newMember.user} has been given a role on the server.`)
        .addField("Role given:", `${difference.map(roles => roles)}`, true)
        .addField("Role name:", `${difference.map(roles => roles.name)}`, true)
        .addField(`Roles (${newMember.roles.cache.size}):`, `${newMember.roles.cache.map(roles => roles)}`)
        .setThumbnail(newMember.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setColor('#00DCFF')
      ;
      const rolesUpdateRemoveEmbed = new Discord.MessageEmbed()
        .setTitle("Someone has updated their roles...")
        .setDescription(`${newMember.user} had a role removed on the server.`)
        .addField("Role removed:", `${difference.map(roles => roles)}`, true)
        .addField("Role name:", `${difference.map(roles => roles.name)}`, true)
        .addField(`Roles (${newMember.roles.cache.size}):`, `${newMember.roles.cache.map(roles => roles)}`)
        .setThumbnail(newMember.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setColor('#00DCFF')
      ;

      if(newMember.roles.cache.size > oldMember.roles.cache.size) {
        return logChannel.send(rolesUpdateAddEmbed)
      } else if (newMember.roles.cache.size < oldMember.roles.cache.size) {
        return logChannel.send(rolesUpdateRemoveEmbed)
      }
    };
});

// User Event Listeners
  bot.on('userUpdate', async (oldUser, newUser) => {
    const logChannel = bot.channels.cache.find(channel => channel.name === `${logChannelName}`)

    // profile picture loggers
    if(newUser.avatar !== oldUser.avatar) {
    const avatarUpdateEmbed = new Discord.MessageEmbed()
      .setTitle("Someone has updated their avatar/profile picture...")
      .setDescription(`${newUser} has updated thier avatar.`)
      .addField("Before:", `\`\`\`${oldUser.displayAvatarURL({dynamic: true, size: 1024})}\`\`\``, true)
      .addField("After:", `\`\`\`${newUser.displayAvatarURL({dynamic: true, size: 1024})}\`\`\``, true)
      .setThumbnail(newUser.displayAvatarURL({dynamic: true, size: 1024}))
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setColor('#9BFF00')
    ;
    logChannel.send(avatarUpdateEmbed).catch(console.error())
    };

    // username logger
    if(newUser.tag !== oldUser.tag) {
      const usernameUpdateEmbed = new Discord.MessageEmbed()
        .setTitle("Someone has updated their tag...")
        .setDescription(`${newUser} has updated their tag.`)
        .addField("Before:", `\`\`\`${oldUser.tag}\`\`\``, true)
        .addField("After:", `\`\`\`${newUser.tag}\`\`\``, true)
        .setThumbnail(newUser.displayAvatarURL({dynamic: true, size: 1024}))
        .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setColor('#00FFC1')
      ;
    logChannel.send(usernameUpdateEmbed).catch(console.error())
    };
});

// Confirming the bot is running along side changing the status on discord
  bot.on('ready', async () => {
    console.log('This bot is now online and running (ﾉ´ヮ´)ﾉ*:･ﾟ✧');
    bot.user.setActivity('-help');  
});
  
// Error catching and handling
  process.on('unhandledRejection', async (error) => { 
    const loggingChannel = bot.channels.cache.get("768004556889784321")
    const errorEmbed = new Discord.MessageEmbed()
      .setColor('FF6961')
      .setTitle("An error has occured...")
      .setDescription(`${bot.user} has ran into an error`)
      .addField("Issue: ", `\`\`\`${error}\`\`\``)
      .setTimestamp()
      .setFooter(bot.user.id + " | " + bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    loggingChannel.send(errorEmbed);
    return console.error('Unhandled promise rejection:', error);
});

// Log's in the bot
  bot.login(token);