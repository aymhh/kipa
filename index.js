  const Discord = require("discord.js");
  const fs = require("fs");
  const bot = new Discord.Client();
  const pm2 = require("pm2")

  bot.commands = new Discord.Collection();

    const { prefix, token, color, logChannelName }  = require("./indiscriminate/config.json");
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
      console.log("There are no .js files in the commands directory...");
      return;
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


    let noCommandEmbed = new Discord.MessageEmbed()
      .setColor("FF6961")
      .setTitle("error!")
      .setDescription("Command doesn't exist")
      .addField("`" + `${prefix}` + "help` to see what commands you can do!", "*Keep in mind these are all cap sensitive!*")
      .setTimestamp()
      .setFooter() 
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;

    if(message.author.bot) return ;

    if(message.channel.type === "dm") return ;

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
        .setDescription(`<@${member.user.id}>` + " joined the discord.")
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
        .addField("User Details:", member.user.tag, true)
        .addField("Status:", member.presence.status, true)
        .addField("Bot?", member.user.bot, true)
        .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()
        .setColor('#B5EAD7')
    logChannel.send(joinEmbed);

    let generalEmbedJoin = new Discord.MessageEmbed()
      .setTitle(`hey ${member.user.username}`)
      .setDescription(`enjoy your stay\nread the rules\nchill`)
      .addField("want to use me?", "`-help` in <#773800167404208129>\nvery cool stuff")
      .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setColor(color)
      .setImage('https://cdn.discordapp.com/attachments/680796015015493677/773872909008764938/ezgif-7-6f5553d5040d.gif')
    let joinChan = member.guild.channels.cache.find(channel => channel.name === 'konnichiwa')
    let ruleChan = member.guild.channels.cache.find(channel => channel.name === 'rules-n-info')

    joinChan.send(generalEmbedJoin)
    ruleChan.send(`<@${member.user.id}>`).then(message => message.delete({timeout: 270}))

  });

    // Logging memebers who have left
    bot.on('guildMemberRemove', (member) => {
    let logChannel = member.guild.channels.cache.find(channel => channel.name === `${logChannelName}`)
    if (!logChannel) return undefined;
    let leaveEmbed = new Discord.MessageEmbed()
    .setTitle("**A user has left the discord...**")
    .setDescription(`<@${member.user.id}>` + " has left the discord.")
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
    if(oldMessage.content === newMessage.content) {
      return;
    };
    
    let editEmbed = new Discord.MessageEmbed()
      .setTitle("**A message was edited...**")
      .setDescription("Author: ` " + `<@${oldMessage.author.id}>` + "," + " in channel: " + `${oldMessage.channel}`)
      .setTimestamp()
      .addField("Before:", '"*'+`${oldMessage.content}`+'*"' , false)
      .addField("After:", '"*'+`${newMessage.content}`+'*"' , false)
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
    .setDescription("Author: " + `<@${message.author.id}>`)
    .setTimestamp()
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .addField("Message:", '"**'+`${message.content}`+'**"' + " *in channel:*" + " " + `${message.channel}`, false)
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
        message.channel.send(racicalEmbed).then(msg => msg.delete({timeout: 8500}))
        return;
      }   
    };
    // Checks for toxicity
    for (z = 0; z < toxicityWords.length; z++) {
      if(message.content.includes(toxicityWords[z])) {
        message.delete();
        message.channel.send(toxicityEmbed).then(msg => msg.delete({timeout: 8500}))
        return;
      }
    };
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