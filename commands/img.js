const Discord = require("discord.js");
const bot = new Discord.Client();
var download = require('download-file');
bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
  let checkadmin = message.member.hasPermission("ADMINISTRATOR");
  if(!checkadmin) return message.delete().catch();

  let say = args.join(" ");

  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)){
      console.log("take");            
    } 
    function attachIsImage(msgAttach) {
      var url = msgAttach.url;
      var namefile =url.slice(url.lastIndexOf("/")+1,url.lastIndexOf(""));
      var options = {
          directory: "./img/",
          filename: `${namefile}`
      }
      download(url, options, function(err){
        if (err) return; 
        message.channel.send(`${say}`, {
            files: ["./img/"+namefile]
          });
         
      })  
    } 
	message.delete().catch();
  }else{
    message.delete().catch();
     message.channel.send(`${say}`);
  }
}

module.exports.help = {
    name: "img"
}

