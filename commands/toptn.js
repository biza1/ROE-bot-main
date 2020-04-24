const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roe:roe@roe-dewbn.azure.mongodb.net/data-ROE?retryWrites=true&w=majority',
    { useUnifiedTopology: true ,useNewUrlParser: true}
);
const User = require('../models/user.js');
bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
  

 if(!message.member.hasPermission("ADMINISTRATOR")) return;


 User.find({}).sort({tinnhan:-1}).exec(async function(err, result) { 
   if(err) return message.channel.send("Đã xảy ra lỗi, vui lòng thử lại sau!");
    var punch = [

    ];
    if(result.length<10)return message.channel.send("Đã xảy ra lỗi, vui lòng thử lại sau!");
    for(var i=0;i<10;i++){ 
      await punch.push(`Hạng ${i+1}: <@!${result[i].id}> ${result[i].tinnhan} tin nhắn\n`);
    if(9==i){
      let hit = new Discord.RichEmbed()
        .setDescription(`${punch.join("")}`)
        .setTitle("Top 10 người nhắn tin nhiều nhất")
        .setColor("#15edf1")
        .setFooter("Code by Sen")
        .setTimestamp()
      return message.channel.send(hit);
    }
  }
 });
  
}

module.exports.help = {
    name: "toptn"
}
