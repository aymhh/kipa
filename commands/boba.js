const Discord = require("discord.js");
const { prefix, token, color, logChannelName }  = require(`../indiscriminate/config.json`);

   module.exports.run = async (bot, message, args) => {

    let bobaLinks = [
        "https://www.vnyzy.com/wp-content/uploads/2018/04/126818B0-222D-45EC-9FCC-421CD2F3A6C4.jpeg",
        "https://images.squarespace-cdn.com/content/v1/52ec82ffe4b08a43098beeb1/1406630607159-4YP2NSVJAGXQLYERV1LC/ke17ZwdGBToddI8pDm48kDHPSfPanjkWqhH6pl6g5ph7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mwONMR1ELp49Lyc52iWr5dNb1QJw9casjKdtTg1_-y4jz4ptJBmI9gQmbjSQnNGng/image-asset.jpeg?format=1500w", 
        "https://pbs.twimg.com/media/ENhdK6oXYAEsWZb.jpg",
        "https://1.bp.blogspot.com/-aesgo2j_PTM/XAcJpiJCHVI/AAAAAAAAkNM/xD9kKkqVoVsccemeRZeV2yOIB69KQraHACLcBGAs/s1600/Screen%2BShot%2B2018-12-04%2Bat%2B1.44.19%2BPM.png",
        "https://cdn.openpr.com/T/3/T323405215_g.jpg",
        "https://eatbook.sg/wp-content/uploads/2019/04/gong-cha-free-bbt-1024x1024.jpg",
        "https://ilovemanchester.com/wp-content/uploads/2019/07/Gong-Cha-dirtea.jpg",
        "https://raster-static.postmates.com/?url=com.postmates.img.prod.s3.amazonaws.com/7f046948-7ad5-4ae7-8458-0812a0d3336b/orig.jpg&quality=90&w=1500&h=900&mode=crop&format=jpg&v=4",
        "https://lh3.googleusercontent.com/proxy/2HJ-YnhZuDZCREQfMZztyF7ONBG2Lb5Cca33W9St5QOZkIhDlt_iswQStFZBXouhR6QvEwQOxZHBanUF1PF8pDlsVHi80kV7oQCTE0dZaK_rTS7EkkAlqw",
        "https://cdn.vox-cdn.com/thumbor/gCtQbIK_3zXoGbWLnioQj_PD8B4=/0x0:1200x800/1200x800/filters:focal(504x304:696x496)/cdn.vox-cdn.com/uploads/chorus_image/image/67133850/Tiger_Sugar_Milk_Tea2.0.jpg",
        "https://www.highlandernews.org/wp-content/uploads/features.boba_.jy_-1.jpg",
        "https://preview.redd.it/iz4qdnsth8c51.jpg?auto=webp&s=88a34141d90327d9e9a2196f0d252d6921dfe4c5",
        "https://lunadamarket.com/wp-content/uploads/2020/04/bobas.jpg",
        "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/03/26/ae2d5346-4951-11e9-8e02-95b31fc3f54a_image_hires_121843.JPG?itok=3mqvV_2t&v=1553573937",
        "https://i.pinimg.com/originals/75/e3/56/75e356372b67513418bd278756bf1601.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2DokWbb5JGX0J9R9E8csSos1FuOFnXGjuKQ&usqp=CAU",
        "https://tul.imgix.net/content/article/best-boba-melbourne.jpg?auto=format,compress&w=1200&h=630&fit=crop",
        "https://miro.medium.com/max/3546/1*iNUjcH5NqchTV-dmsU69kg.jpeg",
        "https://miro.medium.com/max/1200/0*jNYR7viGTH-stOEH.",
        "https://i.redd.it/j8fbk8kk5dt21.jpg",
        "https://ca-times.brightspotcdn.com/dims4/default/b15ad45/2147483647/strip/true/crop/3444x2296+78+0/resize/2400x1600!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fd6%2F3f%2Fe5a5dd2547da90f7c7c79bf6c717%2Fla-photos-1staff-465378-la-fo-sgv-boba-bopomofo-cafe-3-brv.jpg"
    ]

    const bobaList = bobaLinks[Math.floor(Math.random() * bobaLinks.length)];


    const boba = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle('Order up!')
    .setImage(bobaList)
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
   ;

     console.log(message.author.tag + " used the " + prefix + "boba command:"  + bobaList)
     message.channel.send(boba);
     return;
};

module.exports.help = {
    name: "boba"
};