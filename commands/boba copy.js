const Discord = require("discord.js");
const { prefix, token, color, logChannelName }  = require(`../indiscriminate/config.json`);

   module.exports.run = async (bot, message, args) => {

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
        "https://cdn.discordapp.com/attachments/773802663627194390/781534947709681674/giyuu.gif",
        "https://media1.giphy.com/media/NfBQ73MtvPJS/200.gif",
        "https://i.pinimg.com/originals/2e/1d/99/2e1d99bb86d86665343aacfaaf2f57c7.gif",
        "https://cdn105.picsart.com/201681963000201.gif?to=min&r=640",
        "https://media1.giphy.com/media/3BVuVJv8fUGRi/giphy-downsized.gif",
        "https://pa1.narvii.com/6546/7e689ca1ac4ca3dfc21c7b69a55b4d75afe4cd9f_hq.gif",
        "https://cdn.discordapp.com/attachments/773802663627194390/781536412671016990/HIHI.gif",
        "https://cdn.discordapp.com/attachments/773802663627194390/781536796314959884/noya.gif",
        "https://media1.tenor.com/images/0987fc53c43c84ed269b939d112523c6/tenor.gif?itemid=16024097",
        "https://66.media.tumblr.com/8910034f4c16cdb891ef0b51cd292810/tumblr_pl9fvqyOx01y2dez5o1_540.gif",
        "https://pa1.narvii.com/7614/2abac3ac46a8fa038a4b5da81511002a759ee2d7r1-500-258_hq.gif",
        "https://64.media.tumblr.com/1159af3f53ea5315fcc836caadbe3f8b/tumblr_inline_p2z68hIbGo1sg52su_500.gifv",
        "https://pa1.narvii.com/6962/7e52bf55b3c7117520b4633bf8bcb29e57abecaer1-540-304_hq.gif",
        "https://pa1.narvii.com/6962/7e52bf55b3c7117520b4633bf8bcb29e57abecaer1-540-304_hq.gif",
        "https://pa1.narvii.com/6962/7e52bf55b3c7117520b4633bf8bcb29e57abecaer1-540-304_hq.gif",
        "https://cdn.discordapp.com/attachments/773802663627194390/781535860083523584/tumblr_pdd2qqxmRq1u86t2qo1_500.gif",
        "https://i.pinimg.com/originals/ed/a5/fe/eda5fee729e2d1a5930d4ef9bf4ed107.gif",
        "https://i.pinimg.com/originals/6c/c8/45/6cc845ebddfcf63e81a57326e00cb0dd.gif",
        "https://i.imgur.com/ecwGVGS.gif",
        "https://i.pinimg.com/originals/bc/b1/8a/bcb18a1ac03ade0bf86ecc6cf897f868.gif",
        "https://i.imgur.com/s9uHK1m.gif",
        "https://i.imgur.com/yBEmB70.gif?noredirect",
        "https://i.imgur.com/uwDtW1f.gif",
        "https://media1.tenor.com/images/75b7ee56e043ad3a4c7f569959b4ae92/tenor.gif?itemid=15399460",
      ]
    
     const welcomeLinksPicker = welcomelinks[Math.floor(Math.random() * welcomelinks.length)];
  

    const boba = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle('Order up!')
    .setImage(welcomeLinksPicker)
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
   ;

     console.log(message.author.tag + " used the " + prefix + "boba command:"  + welcomeLinksPicker)
     return message.channel.send(boba);
};

module.exports.help = {
    name: "test"
};