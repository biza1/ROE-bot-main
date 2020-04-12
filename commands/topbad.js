const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const fs = require('fs');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb+srv://sen:sen@data-2dbpw.gcp.mongodb.net/test';
bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);
    }
  
 var dbo = db.db("test");
 if(!message.member.hasPermission("ADMINISTRATOR")) return;
var mysort = { nhacnho: -1 };
  dbo.collection("ROE").find().sort(mysort).toArray(async function(err, result) {
    if (err) throw err;
    var punch = [

    ];
    for(var i=0;i<20;i++){
      await punch.push(`Hạng ${i+1}: <@!${result[i].id}> ${result[i].nhacnho} lần\n`);
    if(19==i){
      let hit = new Discord.RichEmbed()
        .setDescription(`${punch.join("")}`)
        .setTitle("Top 20 người nói tục nhiều nhất")
        .setColor("#15edf1")
        .setFooter("Code by Sen")
        .setTimestamp()
      return message.channel.send(hit);
    }
    }
    
        
  });    
   
   

});     
}

module.exports.help = {
    name: "topbad"
}
