  const Discord = require("discord.js");
  const fs = require("fs");
  const bot = new Discord.Client();
  const pm2 = require("pm2")
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
  bot.commands = new Discord.Collection();



  const { prefix, token, color, logChannelName, commands }  = require("./indiscriminate/config.json");
  const racicalWords = require('./chat-filters/racicalWords.json');
  const toxicityWords = require('./chat-filters/toxicityWords.json');
  const NONO = require('./chat-filters/NONO.json');
  const { join } = require("path");


  // File Loaders
  // Commands
  fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      return console.log("There are no .js files in the commands directory...");
    }

    jsfile.forEach((f) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  });
  fs.readdir("./commands/fun-commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("There are no .js files in the commands directory...");
      return;
    }

    jsfile.forEach((f) =>{
      let props = require(`./commands/fun-commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  });


  // Command Hanlders & anti-DMing
  bot.on('message', message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    const talkedRecently = new Set();
    let botCommandsChannel = bot.channels.cache.find(channel => channel.name === `${commands}`)


    let noCommandEmbed = new Discord.MessageEmbed()
      .setColor("FF6961")
      .setTitle("error!")
      .setDescription("command doesn't exist")
      .addField("`" + `${prefix}` + "help` to see what commands you can do!", "**keep in mind these are all cap sensitive!**")
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    let anotherBotEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("tried to use another bot?")
      .setDescription(`they all live in <#${botCommandsChannel.id}>`)
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;


    if(message.author.bot) return ;

    if(message.channel.type === "dm") return ;

    if(message.content.startsWith("!") && message.channel.id != botCommandsChannel.id) return message.reply(anotherBotEmbed).then(message => message.delete({timeout: 5000}))

    if(message.content.startsWith(prefix) && !commandfile) {
      return message.channel.send(noCommandEmbed).then(message => message.delete({timeout: 6000}));
    } else if(message.content.startsWith(prefix) && commandfile) {
      return commandfile.run(bot, message, args)
    }
  });


  // Server Logs
    // Logging members who have joined
    bot.on('guildMemberAdd', (member) => {
      let logChannel = member.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)
      if(!logChannel) return member.guild.owner.send(`You are missing a logging channel for me, please make one named ${logChannelName}`).catch(console.error)

      let joinEmbed = new Discord.MessageEmbed()
        .setTitle("**A user has joined the discord...**")
        .setDescription(`<@${member.user.id}> joined the discord.`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
        .addField("User Details:", member.user.tag, true)
        .addField("Status:", member.presence.status, true)
        .addField("Bot?", member.user.bot, true)
        .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setColor('#B5EAD7')
    logChannel.send(joinEmbed);

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


    let generalEmbedJoin = new Discord.MessageEmbed()
      .setTitle(`hey ${member.user.username}`)
      .setDescription(`enjoy your stay\nread the rules\nchill`)
      .addField("want to use me?", "`-help` in <#773800167404208129>\nvery cool stuff")
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setColor(color)
      .setImage(welcomeLinksPicker)
    let joinChan = member.guild.channels.cache.find(channel => channel.name === 'konnichiwa')
    let ruleChan = member.guild.channels.cache.find(channel => channel.name === 'rules-n-info')

    joinChan.send(generalEmbedJoin)
    ruleChan.send(`hello! <@${member.user.id}>\n please read everything in this channel and then you can start chatting <:pikaLove:775957418365943838>`).then(message => message.delete({timeout: 20000}))
    return console.log(`${member.user.username} has joined the discord on ${correctTime(member.joinedTimestamp)}\n- ${welcomeLinksPicker}`)
  });

    // Logging memebers who have left
    bot.on('guildMemberRemove', (member) => {
    let logChannel = member.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)
    if (!logChannel) return undefined;
    let leaveEmbed = new Discord.MessageEmbed()
    .setTitle("**A user has left the discord...**")
    .setDescription(`<@${member.user.id}> has left the discord.`)
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
    .addField("User Details:", member.user.tag, true)
    .addField("Status:", member.presence.status, true)
    .addField("Bot?", member.user.bot, true)
    .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor('#2a3b90')
    logChannel.send(leaveEmbed);
    if(!logChannel) return member.guild.owner.send(`You are missing a logging channel for me, please make one named ${logChannelName}`).catch(console.error)
  });

    // Logging messages that have been editied
    bot.on('messageUpdate', async (oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content) return;
  

    let editEmbed = new Discord.MessageEmbed()
      .setTitle("**A message was edited...**")
      .setDescription(`Message author: ${oldMessage.author}\nIn channel: ${oldMessage.channel}`)
      .setTimestamp()
      .addField("Before:", `\`\`\`${oldMessage.content}\`\`\`` , false)
      .addField("After:", `\`\`\`${newMessage.content}\`\`\`` , false)
      .addField("Beam me up Kīpā: ", `[Context](${newMessage.url} "Send's you to the message, *given that it still exists*")`, true)
      .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setColor('#FCEEC5')
    ;
    let logChannel = oldMessage.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)
    if(!logChannel) return member.guild.owner.send(`You are missing a logging channel for me, please make one named ${logChannelName}`).catch(console.error)
    logChannel.send(editEmbed);
  });

    // Logging messages that have been deleted
    bot.on('messageDelete', async message => {
    if(message.author.bot) return;
    
    let deleteEmbed = new Discord.MessageEmbed()
    .setTitle("**A message was deleted...**")
    .setDescription(`Message author: ${message.author}\nIn channel: ${message.channel}`)
    .setTimestamp()
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .addField("Message:", `\`\`\`${message.content}\`\`\``, false)
    .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor('#9D0F01')
    ;

    let logChannel = message.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)
    if(!logChannel) return ;
    
    if(message.author.bot) return;
    logChannel.send(deleteEmbed);
  });


  // Words filters
  bot.on('message', message => {

    // Conststants setup
    const icon = 'https://pbs.twimg.com/profile_images/444062741548892161/iSW-ycW5.png'
    
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
    /* Checks for toxicity
    for (z = 0; z < toxicityWords.length; z++) {
      if(message.content.includes(toxicityWords[z])) {
        message.delete();
        return message.channel.send(toxicityEmbed).then(msg => msg.delete({timeout: 8500}))
      }
    };
    */
   // Checks for dumb video
    for (a = 0; a < NONO.length; a++) {
      if(message.content.includes(NONO[a])) {
        message.delete();
        return message.member.send("DON'T POST THAT SHIT PLEASE")
      }
    };
  });


  // Confirming the bot is running along side the MongoDB and is changing the status on discord
  bot.on('ready', async () => {
    console.log('This bot is now online and running (ﾉ´ヮ´)ﾉ*:･ﾟ✧');
    let vc = bot.channels.cache.get('774203696376184872')
    vc.join()
    bot.user.setActivity('-help');
  })
  
  // Error catching and handling
  process.on('unhandledRejection', (error, message) => { 
    var mentionAymhh = "<@176610715686273024>"
    var loggingChannel = bot.channels.cache.get("768004556889784321")
    var errorEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("error!")
     .setDescription("An error has occured!")
     .addField("Issue: ", "```" + error + "```")
     .setTimestamp()
     .setFooter(bot.user.id + " | " + bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    loggingChannel.send(errorEmbed)
    console.error('Unhandled promise rejection:', error)
  });

  bot.login(token);