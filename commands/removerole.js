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
    let take = messageArray.slice(9);
        let check = message.member.roles.has('545275416232067072')||message.member.roles.has('545270443779817493')||message.member.roles.has('545479791785017364');
        if(!check){
            let rmRole = message.guild.roles.find("name", `${args.join(" ")}`);
            if(!rmRole) return message.channel.send("Không tìm thấy role!");
            else {
                if(message.member.roles.has(rmRole.id)){
                    message.member.removeRole(rmRole.id);
                    return message.channel.send("Done!");
                }else{
                    return message.channel.send("Bạn không có role này!");
                }
            }
        }else{
            let user = message.mentions.users.first() || message.author;
            let rmUser = message.guild.member(user);
           // if(rmUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Không thể set Role thành viên này!");
            var joins = args.join(" ");
            let nameRole = joins.slice(0,joins.indexOf(" <@"));
            if(nameRole.toLowerCase()=="kỳ cựu") return console.log(nameRole);
            
            let rmRole = message.guild.roles.find("name", `${nameRole}`);
            if(!rmRole) return message.channel.send("Không tìm thấy role!");
            else {
                if(rmUser.roles.has(rmRole.id)){
                    rmUser.removeRole(rmRole.id);
                   // if(Error) return message.channel.send("Em méo đủ quyền để dùng trên người dùng này!");
                    return message.channel.send("Done!");
                }else{
                    return message.channel.send("Người dùng không có role này!");
                }
            }

        }

}

module.exports.help = {
    name: "rmrole"
}