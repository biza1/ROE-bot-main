const Discord = require("discord.js");
// const bot = new Discord.Client();
// bot.commands = new Discord.Collection();

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

//Ping
if(message.channel.id=="545269780005781506"){
      let check= message.member.hasPermission("ADMINISTRATOR")||message.member.roles.has("545275416232067072");
if(!check) return message.channel.send("Vui lòng xuống <#545280256119013406> hoặc <#610833292312182830> để gọi lệnh Bot. Xin cảm ơn <:police:665946381101432881>");
}
message.channel.send("yaaaaaaa....").then(m=>{
    let ping = m.createdTimestamp - message.createdTimestamp
    m.edit(`Latency: \`${ping} ms\``)
})
return;

//Ping 
}

module.exports.help = {
    name: "ping"
}
