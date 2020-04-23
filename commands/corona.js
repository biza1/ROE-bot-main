const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const http = require('https');
var request = require('request');
bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
    if(message.author.bot) return;
    //if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd= messageArray[0];
if(message.channel.id=="545269780005781506"){
      let check= message.member.hasPermission("ADMINISTRATOR")||message.member.roles.has("545275416232067072");
if(!check) return message.channel.send("Vui lòng xuống <#545280256119013406> hoặc <#610833292312182830> để gọi lệnh Bot. Xin cảm ơn <:police:665946381101432881>");
}



// $.getJSON('https://code.junookyo.xyz/api/ncov-moh/data.json', function(data) {
//     console.log(JSON.parse(data));
// });

    request('https://code.junookyo.xyz/api/ncov-moh/data.json',function (error, response, body) {

      var data = body;
      var result = JSON.parse(body);
      console.log(result)
      var tgGot =  result.data.global.cases;
      var tgDie =  result.data.global.deaths;
      var tgRev =  result.data.global.recovered;
      var vnGot =  result.data.vietnam.cases;
      var vnDie =  result.data.vietnam.deaths;
      var vnRev =  result.data.vietnam.recovered;

      var word ="<:pepemask:676082059168579610>: "+tgGot+" người nhiễm \n\n💀: "+tgDie+" người chết \n\n<:pepeOK:686466713373507614>: "+tgRev+" người hồi phục\n";
      var vn = "<:pepemask:676082059168579610>: "+vnGot+" người nhiễm \n\n💀: "+vnDie+" người chết \n\n<:pepeOK:686466713373507614>: "+vnRev+" người hồi phục\n";
      const embed = new Discord.RichEmbed()
			  .setAuthor("Diễn biến dịch Corona ")
			  .setThumbnail(`https://discordapp.com/assets/ed1c937de3aee41b70cea715005de3ef.svg`)
			  .addField(`Thế giới :earth_americas:`,`${word}`,true)
			  .addField(`Việt Nam :flag_vn:`,`${vn}`,true)
			  .setColor("#e21d41")
			  .setFooter("Code by Sen(Bộ Y Tế Việt Nam)")
			  .setTimestamp()
		  message.channel.send(embed);
      });
}

module.exports.help = {
    name: "corona"
}

