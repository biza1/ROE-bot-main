const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb+srv://sen:sen@data-2dbpw.gcp.mongodb.net/test';

module.exports.run = async (bot, message, args) => {
    // if(message.author.bot) return;
    // if(message.channel.type === "dm") return;
    
    // let prefix = botconfig.prefix;
    // let messageArray = message.content.split(" ");
    // let cmd= messageArray[0];

    MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          //HURRAY!! We are connected. :)
          console.log('Connection established to', url);
        }
       
     var dbo = db.db("test");
    let user = message.mentions.users.first() || message.author;

    let userinfo = {};
        userinfo.avatar = user.displayAvatarURL;
        userinfo.name = user.username;
        userinfo.discrim - `#${user.discrimination}`;
        userinfo.id - user.id;
        userinfo.status = user.presence.status;
        userinfo.joined = user.joinedAt;
    var query = { id: `${user.id}` };  

    dbo.collection("ROE").find(query).toArray(function(err, result) {
        if (err)throw err;
        if(result[0] === undefined){
            console.log(result);
            const embed = new Discord.RichEmbed()
                .setAuthor(user.tag, userinfo.avatar)
                .setThumbnail(userinfo.avatar)
                .addField(`Username: ${userinfo.name}`,`ID: ${user.id}`) 
                // .addField(`ID: `,user.id)
                .addField(`Status: `,userinfo.status)
            return message.channel.send(embed);
        }else{
            if (err) throw err;
            const embed = new Discord.RichEmbed()
                .setAuthor(user.tag, userinfo.avatar)
                .setThumbnail(userinfo.avatar)
                .addField(`Username: ${userinfo.name}`,`ID: ${user.id}\n\nStatus: ${userinfo.status}\nSố tin nhắn: ${result[0].tinnhan}\nSố lần report: ${result[0].report}\nSố lần bị report: ${result[0].bireport}\nSố lần vi phạm: ${result[0].vipham}\nSố lần nhắc nhở: ${result[0].nhacnho}`)
            message.channel.send(embed);
    }
    });  

});
}

module.exports.help = {
    name: "info"
}
