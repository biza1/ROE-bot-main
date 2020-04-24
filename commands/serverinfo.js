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
<<<<<<< HEAD
    avatarSv= avatarserver.slice(0,avatarserver.lastIndexOf("."));
    
    if(avatarSv.indexOf('a_')>-1) avatarSv = avatarSv+".gif";
    else avatarSv = avatarserver;
    
    daycreat = new Date(`${message.guild.createdAt}`);

    let arr1 = [];
=======
	avatarSv= avatarserver.slice(0,avatarserver.lastIndexOf("."));
        if(avatarSv.indexOf('a_')>-1) avatarSv = avatarSv+".gif";
    	else avatarSv = avatarserver;
  
	let arr1 = [];
>>>>>>> 7e5c15fae62773109dd2e481fcda15c41ffb738f
    let frole =message.guild.roles.find(function(role){
        let count = `${role.id}`;
        arr1.push(`<@&${count}> `);
    });
<<<<<<< HEAD
=======
        daycreat = new Date(`${message.guild.createdAt}`);
>>>>>>> 7e5c15fae62773109dd2e481fcda15c41ffb738f
//console.log(message.guild)
//console.log(avatarSv)
    let serverembed = new Discord.RichEmbed()
	        .setAuthor('Thông tin Server',avatarSv)
            .setTitle(message.guild.name)
            .setColor("#15edf1")
            .setThumbnail(avatarSv)
            .addField("**Tên Server**",message.guild.name)
            .addField("**Owner**",message.guild.owner.user.tag)
            .addField(`**Role**`, `${arr1.length}`, true)
<<<<<<< HEAD
            .addField("**Số thành viên**",+message.guild.memberCount+"\nNgày tạo: " + moment(message.guild.createdAt).format("H:m:s D/M/YYYY"))
=======
            .addField("**Số thành viên**",+message.guild.memberCount+"\n**Ngày tạo:** " + moment(message.guild.createdAt).format("H:m:s D/M/YYYY"))
>>>>>>> 7e5c15fae62773109dd2e481fcda15c41ffb738f
            .setDescription("[Fanpage](https://www.facebook.com/RingofelysiumRoevn/)\n[Group Facebook](https://www.facebook.com/groups/roevietnam.vn/)")
        return message.channel.send(serverembed);
    //thông tin server

}

module.exports.help = {
    name: "serverinfo"
}
