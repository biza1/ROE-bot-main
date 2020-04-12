const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    // Moves a member to a voice channel
    let check  = message.member.roles.has('568105173591785472')||message.member.roles.has('545275416232067072')||message.member.roles.has("591292951905304652");
    if(!check) return;
    let user = message.guild.member(message.mentions.users.first());
    let jump = args.join(" ");
    let checkadmin = user.roles.has('545275416232067072')||user.hasPermission("ADMINISTRATOR");
    if(!checkadmin){
        if(!message.member.voiceChannel)
        {
            return message.reply("Hãy vào voice Channel bất kỳ!"); 
        }
        if(!user.voiceChannel){
            return message.reply(`${user.user.username} chưa vào voice Channel bất kỳ!`); 
        }
            const channel = message.guild.channels.find('name', `Phòng chờ (chưa có team)`);
                user.setVoiceChannel(channel);
            return message.reply(`Move ${user.user.username} tới <#${channel.id}>!`);

    }else return message.channel.send("Không thể move thành viên này!");
       

}
    // if(jump.toLowerCase() == "squad 1"){room = "awse";}
    // const channel = message.guild.channels.find('name', `${room}`)
    // if (channel == null) return message.channel.send("Không tìm thấy phòng");
    // if(channel.type == 'text') return message.channel.send("phòng text không thể join");
    // // else message.channel.send("phòng voice");
    // if(!message.member.voiceChannel)
    // {
    //     return message.reply("Hãy vào voice Channel bất kỳ!"); 
    // }
    // return message.member.setVoiceChannel(channel.id);




//SOURCE - code
// import { Client } from 'discord.js'
// const client = new Client()

// client.on('message', message => {
//   if (message.content === 'test') {
//     console.log('hi')
//     const channel = message.guild.channels.find('name', 'voicechannel')
//     message.member.setVoiceChannel(channel)
//   }
// })

// client.login('xxx')

module.exports.help = {
    name: "leave"
}
