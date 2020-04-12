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
    let test  = 10;
    var s;
//     test ="asdasdsdadsdsasddad" ;
//     test1 = `"`;
//     test2 = "`";
//  message.channel.send(test2+test2+test2+test+test2+test2+test2);
 let role1 =  message.guild.roles.find("name", "🔧 Mod");
// if(message.member.role.has(role1)){
//     let say = args.join(" ");
// message.delete().catch();
// return message.channel.send(say);
// }
console.log(role1.id);
let checkadmin = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
if(!checkadmin) return;
let say = args.join(" ");
message.delete().catch();
if(say.length<1) return;


return message.channel.send(say);

}

module.exports.help = {
    name: "say"
}