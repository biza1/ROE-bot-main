const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const fs = require("fs");

bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
  let checkadmin = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
  if(!checkadmin) return message.delete().catch();

  let say = args.join(" ");
  
  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)){
      console.log("take");
    }
  }

 function attachIsImage(msgAttach) {
    var url = msgAttach.url;
message.delete().catch();
      return message.channel.send({files: [url]});
  }
}

module.exports.help = {
    name: "album"
}

