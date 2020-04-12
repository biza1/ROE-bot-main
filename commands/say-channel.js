const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const fs = require("fs");

bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd= messageArray[0];
    
let checkadmin = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
if(!checkadmin) return;
let sendchannel =  message.guild.channels.find(`id`, `${args[0]}`)
let say = args.join(" ");

message.delete().catch();
if(say.length<1) return;


return sendchannel.send(say.slice(19));

}

module.exports.help = {
    name: "c"
}
