const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const YTDL = require('ytdl-core');
const search = require('yt-search');
bot.commands = new Discord.Collection();




module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let get = args.join(" ");
    // Math.floor(Math.random() * 10); 
    if(messageArray.length < 2){
         return message.reply(`${Math.floor(Math.random() * 100)}`);
    }else{
        if(!parseInt(get)) return message.reply("Không nhập chữ!"); 
        return message.reply(`${Math.floor(Math.random() * parseInt(get))}`);
    }

    

  // message.channel.send();
}

module.exports.help = {
    name: "roll"
}