const Discord = require("discord.js");
const { prefix, token, color, logChannelName }  = require(`../indiscriminate/config.json`);
const fs = require('fs');
const { toHTML } = require('discord-markdown');
const { error } = require("console");
const { ifError } = require("assert");
function rightColor(c) {
    if (/^#([a-f0-9]{3}){1,2}$/.test(c)) {
        if (c.length == 4) {
            c = '#' + [c[1], c[1], c[2], c[2], c[3], c[3]].join('');
        }
        c = '0x' + c.substring(1);
        return 'rgb(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(', ') + ', 255)';
    }
    return '';
}
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
    return `${month}/${day}/${year}  ${hour}:${minute}:${second} ${modifier}`;
}

module.exports.run = async (bot, message, args) => {
 
  const logChannel = message.guild.channels.cache.find(channel => channel.name === `${logChannelName}`);
 
   
  const noPermsErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')   
   .setTitle("**error!**")
   .setDescription("you don't have enough permissions to do this!")
   .setTimestamp()
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  
   const usage = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .addField("Usage", `\`\`\`${prefix}clear <number>\`\`\``)
   .addField("Note: Due to discord API limitation: ", "*You can't clear more than 100 messages at a time! \n You can't delete messages that are over 14 days old.*")
   .setTimestamp()
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
   
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 9500}));
  if(!args[0]) return message.reply(usage).then(msg => msg.delete({timeout: 8000}));
  if(isNaN(args[0])) return message.reply(usage).then(msg => msg.delete({timeout: 8000}));
  if(args[0] > 100) return message.reply(usage).then(msg => msg.delete({timeout: 8000}));
  
   // Transcript
  let messages = new Discord.Collection();
  let channelMessages = await message.channel.messages.fetch({ limit: args[0] }).catch(error => console.log(error));
  messages = messages.concat(channelMessages);
  let maxcatch = 0
  while (channelMessages.size === args[0]) {
     if (maxcatch == 4) break;
     let lastMessageId = channelMessages.lastKey();
     channelMessages = await message.channel.messages.fetch({ limit: args[0], before: lastMessageId }).catch(err => console.log(err));
     if (channelMessages)
         messages = messages.concat(channelMessages);
     maxcatch++;
  }
  const today = new Date();
 let html = `<!doctype html>
<html lang="en">
    <head>
    <title>Closed Ticket</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* General */
        
        @font-face {
            font-family: Whitney;
            src: url(https://discordapp.com/assets/6c6374bad0b0b6d204d8d6dc4a18d820.woff);
            font-weight: 300;
        }
        
        @font-face {
            font-family: Whitney;
            src: url(https://discordapp.com/assets/e8acd7d9bf6207f99350ca9f9e23b168.woff);
            font-weight: 400;
        }
        
        @font-face {
            font-family: Whitney;
            src: url(https://discordapp.com/assets/3bdef1251a424500c1b3a78dea9b7e57.woff);
            font-weight: 500;
        }
        
        @font-face {
            font-family: Whitney;
            src: url(https://discordapp.com/assets/be0060dafb7a0e31d2a1ca17c0708636.woff);
            font-weight: 600;
        }
        
        @font-face {
            font-family: Whitney;
            src: url(https://discordapp.com/assets/8e12fb4f14d9c4592eb8ec9f22337b04.woff);
            font-weight: 700;
        }
        
        body {
            font-family: "Whitney", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 17px;
        }
        
        a {
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        img {
            object-fit: contain;
        }
        
        .markdown {
            max-width: 100%;
            white-space: pre-wrap;
            line-height: 1.3;
            overflow-wrap: break-word;
        }
        
        .spoiler {
            width: fit-content;
        }
        
        .spoiler--hidden {
            cursor: pointer;
        }
        
        .spoiler-text {
            border-radius: 3px;
        }
        
        .spoiler--hidden .spoiler-text {
            color: rgba(0, 0, 0, 0);
        }
        
        .spoiler--hidden .spoiler-text::selection {
            color: rgba(0, 0, 0, 0);
        }
        
        .spoiler-image {
            position: relative;
            overflow: hidden;
            border-radius: 3px;
        }
        
        .spoiler--hidden .spoiler-image {
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
        }
        
        .spoiler--hidden .spoiler-image img {
            filter: blur(44px);
        }
        
        .spoiler--hidden .spoiler-image:after {
            content: "SPOILER";
            color: #dcddde;
            background-color: rgba(0, 0, 0, 0.6);
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-weight: 600;
            padding: 0.5em 0.7em;
            border-radius: 20px;
            letter-spacing: 0.05em;
            font-size: 0.9em;
        }
        
        .spoiler--hidden:hover .spoiler-image:after {
            color: #fff;
            background-color: rgba(0, 0, 0, 0.9);
        }
        
        .quote {
            margin: 0.1em 0;
            padding-left: 0.6em;
            border-left: 4px solid;
            border-radius: 3px;
        }
        
        .pre {
            font-family: "Consolas", "Courier New", Courier, monospace;
        }
        
        .pre--multiline {
            margin-top: 0.25em;
            padding: 0.5em;
            border: 2px solid;
            border-radius: 5px;
        }
        
        .pre--inline {
            padding: 2px;
            border-radius: 3px;
            font-size: 0.85em;
        }
        
        .mention {
            border-radius: 3px;
            padding: 0 2px;
            color: #7289da;
            background: rgba(114, 137, 218, .1);
            font-weight: 500;
        }
        
        .emoji {
            width: 1.25em;
            height: 1.25em;
            margin: 0 0.06em;
            vertical-align: -0.4em;
        }
        
        .emoji--small {
            width: 1em;
            height: 1em;
        }
        
        .emoji--large {
            width: 2.8em;
            height: 2.8em;
        }
        /* Preamble */
        
        .preamble {
            display: grid;
            margin: 0 0.3em 0.6em 0.3em;
            max-width: 100%;
            grid-template-columns: auto 1fr;
        }
        
        .preamble__guild-icon-container {
            grid-column: 1;
        }
        
        .preamble__guild-icon {
            max-width: 88px;
            max-height: 88px;
        }
        
        .preamble__entries-container {
            grid-column: 2;
            margin-left: 0.6em;
        }
        
        .preamble__entry {
            font-size: 1.4em;
        }
        
        .preamble__entry--small {
            font-size: 1em;
        }
        /* Chatlog */
        
        .chatlog {
            max-width: 100%;
        }
        
        .chatlog__message-group {
            display: grid;
            margin: 0 0.6em;
            padding: 0.9em 0;
            border-top: 1px solid;
            grid-template-columns: auto 1fr;
        }
        
        .chatlog__author-avatar-container {
            grid-column: 1;
            width: 40px;
            height: 40px;
        }
        
        .chatlog__author-avatar {
            border-radius: 50%;
            height: 40px;
            width: 40px;
        }
        
        .chatlog__messages {
            grid-column: 2;
            margin-left: 1.2em;
            min-width: 50%;
        }
        
        .chatlog__author-name {
            font-weight: 500;
        }
        
        .chatlog__timestamp {
            margin-left: 0.3em;
            font-size: 0.75em;
        }
        
        .chatlog__message {
            padding: 0.1em 0.3em;
            margin: 0 -0.3em;
            background-color: transparent;
            transition: background-color 1s ease;
        }
        
        .chatlog__content {
            font-size: 0.95em;
            word-wrap: break-word;
        }
        
        .chatlog__edited-timestamp {
            margin-left: 0.15em;
            font-size: 0.8em;
        }
        
        .chatlog__attachment {
            margin-top: 0.3em;
        }
        
        .chatlog__attachment-thumbnail {
            vertical-align: top;
            max-width: 45vw;
            max-height: 500px;
            border-radius: 3px;
        }
        
        .chatlog__embed {
            display: flex;
            margin-top: 0.3em;
            max-width: 520px;
        }
        
        .chatlog__embed-color-pill {
            flex-shrink: 0;
            width: 0.25em;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
        }
        
        .chatlog__embed-content-container {
            display: flex;
            flex-direction: column;
            padding: 0.5em 0.6em;
            border: 1px solid;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }
        
        .chatlog__embed-content {
            display: flex;
            width: 100%;
        }
        
        .chatlog__embed-text {
            flex: 1;
        }
        
        .chatlog__embed-author {
            display: flex;
            margin-bottom: 0.3em;
            align-items: center;
        }
        
        .chatlog__embed-author-icon {
            margin-right: 0.5em;
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }
        
        .chatlog__embed-author-name {
            font-size: 0.875em;
            font-weight: 600;
        }
        
        .chatlog__embed-title {
            margin-bottom: 0.2em;
            font-size: 0.875em;
            font-weight: 600;
        }
        
        .chatlog__embed-description {
            font-weight: 500;
            font-size: 0.85em;
        }
        
        .chatlog__embed-fields {
            display: flex;
            flex-wrap: wrap;
        }
        
        .chatlog__embed-field {
            flex: 0;
            min-width: 100%;
            max-width: 506px;
            padding-top: 0.6em;
            font-size: 0.875em;
        }
        
        .chatlog__embed-field--inline {
            flex: 1;
            flex-basis: auto;
            min-width: 150px;
        }
        
        .chatlog__embed-field-name {
            margin-bottom: 0.2em;
            font-weight: 600;
        }
        
        .chatlog__embed-field-value {
            font-weight: 500;
        }
        
        .chatlog__embed-thumbnail {
            flex: 0;
            margin-left: 1.2em;
            max-width: 80px;
            max-height: 80px;
            border-radius: 3px;
        }
        
        .chatlog__embed-image-container {
            margin-top: 0.6em;
        }
        
        .chatlog__embed-image {
            max-width: 500px;
            max-height: 400px;
            border-radius: 3px;
        }
        
        .chatlog__embed-footer {
            margin-top: 0.6em;
        }
        
        .chatlog__embed-footer-icon {
            margin-right: 0.2em;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            vertical-align: middle;
        }
        
        .chatlog__embed-footer-text {
            font-size: 0.75em;
            font-weight: 500;
        }
        
        .chatlog__reactions {
            display: flex;
        }
        
        .chatlog__reaction {
            display: flex;
            align-items: center;
            margin: 0.35em 0.1em 0.1em 0.1em;
            padding: 0.2em 0.35em;
            border-radius: 3px;
        }
        
        .chatlog__reaction-count {
            min-width: 9px;
            margin-left: 0.35em;
            font-size: 0.875em;
        }
        
        .chatlog__bot-tag {
            position: relative;
            top: -.2em;
            margin-left: 0.3em;
            padding: 0.05em 0.3em;
            border-radius: 3px;
            vertical-align: middle;
            line-height: 1.3;
            background: #7289da;
            color: #ffffff;
            font-size: 0.625em;
            font-weight: 500;
        }
        /* Postamble */
        
        .postamble {
            margin: 1.4em 0.3em 0.6em 0.3em;
            padding: 1em;
            border-top: 1px solid;
        }
    </style>
    <style>
        /* General */
        
        body {
            background-color: #36393e;
            color: #dcddde;
        }
        
        a {
            color: #0096cf;
        }
        
        .spoiler-text {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .spoiler--hidden .spoiler-text {
            background-color: #202225;
        }
        
        .spoiler--hidden:hover .spoiler-text {
            background-color: rgba(32, 34, 37, 0.8);
        }
        
        .quote {
            border-color: #4f545c;
        }
        
        .pre {
            background-color: #2f3136 !important;
        }
        
        .pre--multiline {
            border-color: #282b30 !important;
            color: #b9bbbe !important;
        }
        /* === Preamble === */
        
        .preamble__entry {
            color: #ffffff;
        }
        /* Chatlog */
        
        .chatlog__message-group {
            border-color: rgba(255, 255, 255, 0.1);
        }
        
        .chatlog__author-name {
            color: #ffffff;
        }
        
        .chatlog__timestamp {
            color: rgba(255, 255, 255, 0.2);
        }
        
        .chatlog__message--highlighted {
            background-color: rgba(114, 137, 218, 0.2) !important;
        }
        
        .chatlog__message--pinned {
            background-color: rgba(249, 168, 37, 0.05);
        }
        
        .chatlog__edited-timestamp {
            color: rgba(255, 255, 255, 0.2);
        }
        
        .chatlog__embed-color-pill--default {
            background-color: rgba(79, 84, 92, 1);
        }
        
        .chatlog__embed-content-container {
            background-color: rgba(46, 48, 54, 0.3);
            border-color: rgba(46, 48, 54, 0.6);
        }
        
        .chatlog__embed-author-name {
            color: #ffffff;
        }
        
        .chatlog__embed-author-name-link {
            color: #ffffff;
        }
        
        .chatlog__embed-title {
            color: #ffffff;
        }
        
        .chatlog__embed-description {
            color: rgba(255, 255, 255, 0.6);
        }
        
        .chatlog__embed-field-name {
            color: #ffffff;
        }
        
        .chatlog__embed-field-value {
            color: rgba(255, 255, 255, 0.6);
        }
        
        .chatlog__embed-footer {
            color: rgba(255, 255, 255, 0.6);
        }
        
        .chatlog__reaction {
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        .chatlog__reaction-count {
            color: rgba(255, 255, 255, 0.3);
        }
        /* Postamble */
        
        .postamble {
            border-color: rgba(255, 255, 255, 0.1);
        }
        
        .postamble__entry {
            color: #ffffff;
        }
    </style>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/solarized-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.pre--multiline').forEach(block => hljs.highlightBlock(block));
        });
    </script>

    <script>
        function scrollToMessage(event, id) {
            var element = document.getElementById('message-' + id);

            if (element) {
                event.preventDefault();

                element.classList.add('chatlog__message--highlighted');

                window.scrollTo({
                    top: element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - (window.innerHeight / 2),
                    behavior: 'smooth'
                });

                window.setTimeout(function() {
                    element.classList.remove('chatlog__message--highlighted');
                }, 2000);
            }
        }

        function showSpoiler(event, element) {
            if (element && element.classList.contains('spoiler--hidden')) {
                event.preventDefault();
                element.classList.remove('spoiler--hidden');
            }
        }
    </script>
</head>
<body>
    <div class="preamble">
        <div class="preamble__guild-icon-container">
            <img class="preamble__guild-icon" src="${(message.guild.iconURL()) ? message.guild.iconURL() : ""}" alt="Guild Icon">
        </div>
        <div class="preamble__entries-container">
            <div class="preamble__entry">${message.guild.name}</div>
            <div class="preamble__entry">Channel: ${message.channel.name}</div>
            <div class="preamble__entry">Closer: ${message.author.tag}</div>
        </div>
    </div>
    <div class="chatlog">`
 for (let msg of Array.from(messages.values()).reverse()) {

    let roleColor;

    if (msg.member) { roleColor = msg.member.displayHexColor; } else { roleColor = '#FFFFFF'; }

    html += `<div class="chatlog__message-group">
    <div class="chatlog__author-avatar-container">
        <img class="chatlog__author-avatar" src="${msg.author.displayAvatarURL()}" alt="Avatar">
    </div>
    <div class="chatlog__messages">
    <span class="chatlog__author-name" title="${msg.author.tag}" data-user-id="${msg.author.id}" style="color: ${rightColor('#FFFFFF')}">${msg.author.username}</span>`
    if (msg.author.bot) html += `<span class="chatlog__bot-tag">BOT</span>`

    html += `<span class="chatlog__timestamp">${correctTime(msg.createdTimestamp)}</span>
    <div class="chatlog__message " data-message-id="${msg.id}" id="message-${msg.id}">
        <div class="chatlog__content">
            <div class="markdown">`
    let usedcontent = msg.content;
    if (msg.mentions) {
        if (msg.mentions.members) {
            msg.mentions.members.forEach(member => {
                usedcontent = usedcontent.replace("<@" + member.id + ">", `<span class="mention" title="${member.user.tag}">@` + member.user.username + `</span>`);
                usedcontent = usedcontent.replace("<@!" + member.id + ">", `<span class="mention" title="${member.user.tag}">@` + member.user.username + `</span>`);
            });
        }

        if (msg.mentions.users) {
            msg.mentions.users.forEach(user => {
                usedcontent = usedcontent.replace("<@" + user.id + ">", `<span class="mention" title="${user.tag}">@` + user.username + `</span>`);
                usedcontent = usedcontent.replace("<@!" + user.id + ">", `<span class="mention" title="${user.tag}">@` + user.username + `</span>`);
            });
        }

        if (msg.mentions.roles) {
            msg.mentions.roles.forEach(role => {
                usedcontent = usedcontent.replace("<@&" + role.id + ">", `<span class="mention">@` + role.name + `</span>`);
            })
        }

        if (msg.mentions.channels) {
            msg.mentions.channels.forEach(channel => {
                usedcontent = usedcontent.replace("<#" + channel.id + ">", `<span class="mention">#` + channel.name + `</span>`);
            });
        }

        if (msg.mentions.crosspostedChannels) {
            msg.mentions.crosspostedChannels.forEach(channel => {
                usedcontent = usedcontent.replace("<#" + channel.channelID + ">", `<span class="mention">#` + channel.name + `</span>`);
            });
        }
    }

    html += usedcontent;

    let msgDate = new Date();
    if (msg.editedTimestamp) {
        html += `<span class="chatlog__edited-timestamp" title="${correctTime(msg.editedTimestamp)}">(edited)</span>`
    }
    html += `</div>
    </div>`
    if (msg.embeds.length > 0) {

        html += `<div class="chatlog__embed">
        <div class="chatlog__embed-color-pill" style="background-color: ${rightColor(msg.embeds[0].hexColor)}"></div>
        <div class="chatlog__embed-content-container">
            <div class="chatlog__embed-content">
                <div class="chatlog__embed-text">
        `

        if (msg.embeds[0].title) {
            html += `<div class="chatlog__embed-title">
                <div class="markdown">${toHTML(msg.embeds[0].title)}</div>
            </div>`
        }
        if (msg.embeds[0].description) {

            let embedDesc = msg.embeds[0].description;
            if (msg.embeds[0].description.mentions) {
                if (msg.embeds[0].description.mentions.members) {
                    msg.embeds[0].description.mentions.members.forEach(member => {
                        embedDesc = embedDesc.replace("@" + member.id, "@" + member.user.username);
                        embedDesc = embedDesc.replace("@!" + member.id, "@" + member.user.username);
                    });
                }

                if (msg.embeds[0].description.mentions.users) {
                    msg.embeds[0].description.mentions.users.forEach(user => {
                        embedDesc = embedDesc.replace("@" + user.id, "@" + user.username);
                        embedDesc = embedDesc.replace("@!" + user.id, "@" + user.username);
                    });
                }

                if (msg.embeds[0].description.mentions.roles) {
                    msg.embeds[0].description.mentions.roles.forEach(role => {
                        embedDesc = embedDesc.replace("@&" + role.id, "@" + role.name);
                    })
                }

                if (msg.embeds[0].description.mentions.channels) {
                    msg.embeds[0].description.mentions.channels.forEach(channel => {
                        embedDesc = embedDesc.replace("#" + channel.id, "#" + channel.name);
                    });
                }

                if (msg.embeds[0].description.mentions.crosspostedChannels) {
                    msg.embeds[0].description.mentions.crosspostedChannels.forEach(channel => {
                        embedDesc = embedDesc.replace("#" + channel.channelID, "#" + channel.name);
                    });
                }
            }

            html += `<div class="chatlog__embed-description">
                <div class="markdown">${toHTML(embedDesc)}</div>
            </div>`
        }
        if (msg.embeds[0].fields.length > 0) {

            html += `<div class="chatlog__embed-fields">`

            for (let i = 0; i < msg.embeds[0].fields.length; i++) {

                html += `<div class="chatlog__embed-field ">
                    <div class="chatlog__embed-field-name">
                        <div class="markdown">${toHTML(msg.embeds[0].fields[i].name)}</div>
                    </div>
                    <div class="chatlog__embed-field-value">
                        <div class="markdown">${toHTML(msg.embeds[0].fields[i].value)}</div>
                    </div>
                </div>`

            }

            html += `</div>`

        }

        html += `</div>
        </div>`

        if (msg.embeds[0].footer) {

            html += `<div class="chatlog__embed-footer">`

            if (msg.embeds[0].footer.iconURL) {

                html += `<img class="chatlog__embed-footer-icon" src="${msg.embeds[0].footer.iconURL}" alt="Footer icon">`

            }



            if (msg.embeds[0].footer.text) {

                if (msg.embeds[0].timestamp === null) {

                    html += `<span class="chatlog__embed-footer-text">${toHTML(msg.embeds[0].footer.text)}</span>`

                } else {

                    html += `<span class="chatlog__embed-footer-text">${toHTML(msg.embeds[0].footer.text)} • ${correctTime(msg.embeds[0].timestamp)}</span>`

                }



            }

            html += `</div>`

        }

        html += `</div>
        </div>`

    }
    html += `</div>
    </div>
    </div>`
    }
  fs.writeFile(`./indiscriminate/transcripts/` + message.channel.name + ".html", html, "utf8", err => {
 if (err) throw err;
    });

 
 let transFile = `./indiscriminate/transcripts/${message.channel.name}.html`;
 
 let deleteEmbed = new Discord.MessageEmbed()
  .setTitle("**Someone bulk deleted a set of messages...**")
  .setDescription("By: " + `<@${message.author.id}>`)
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
  .addField(`${args[0]}` + " messages were deleted in channel:", `${message.channel}`, false)
  .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
  .setColor('#E3E3E3')
 ;
  message.channel.bulkDelete(args[0])
  logChannel.send(deleteEmbed);
  let loggedMessages = await logChannel.send('', { files: [transFile] });
  let deletemessage = new Discord.MessageEmbed()
   .setColor(color)
   .setTitle("Bulk Clearer")
   .setDescription(`removed ${args[0]} messages, i also have collected the deleted messages and logged them for you in [here](${loggedMessages.url} 'i will send you to the message collection log')`)
   .setTimestamp()
   .setThumbnail("https://cdn.discordapp.com/emojis/773937176492638259.png?v=1")
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  
   message.channel.send(deletemessage)


 };

module.exports.help = {
  name: "clear"
}