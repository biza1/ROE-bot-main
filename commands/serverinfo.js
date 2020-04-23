const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

module.exports.run = async (_bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd= messageArray[0];

    //thông tin server

    let today = new Date();
    let avatarserver = message.guild.iconURL;
	avatarSv= avatarserver.slice(0,avatarserver.lastIndexOf("."));
        if(avatarSv.indexOf('a_')) avatarSv = avatarSv+".gif"
  
        daycreat = new Date(`${message.guild.createdAt}`);
//console.log(message.guild)
//console.log(avatarSv)
    let serverembed = new Discord.RichEmbed()
	    .setAuthor('Thông tin Server',avatarserver)
            .setTitle(message.guild.name)
            .setColor("#15edf1")
            .setThumbnail(avatarserver)
            .addField("Tên Server: ",message.guild.name)
            .addField("Owner: ",message.guild.owner.user.tag)
            .addField("Số thành viên: ",+message.guild.memberCount+"\nNgày tạo: " + message.guild.createdAt)
            .setDescription("[Fanpage](https://www.facebook.com/RingofelysiumRoevn/)\n[Group Facebook](https://www.facebook.com/groups/roevietnam.vn/)")
          
            
        return message.channel.send(serverembed);
    //thông tin server

}

module.exports.help = {
    name: "serverinfo"
}
