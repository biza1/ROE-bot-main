const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const fs = require('fs');



bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd= messageArray[0];
let checkadmin = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
if(!checkadmin) return;
    var score = [

    ];
  
    fs.readdir("./commands/log/warning/", (err, files)=>{
        if(err) console.log(err);
    
        let jsfile = files.filter(f=>f)
        if(jsfile.length <= 0){
            console.log("Không tìm thấy tin nhắn");
            return;
        }
          jsfile.forEach((f, i)=> {
            fs.readFile(`./commands/log/warning/${f}/tinnhan`, 'utf-8', (err, data) => {
              let data1 = data.split("\n");
              score.push({name:`${f}`,message: `${data1[0]}`});
            score.sort(function(a, b){return b.message - a.message});
             if(jsfile.length-1 == i){
                 var punch = [];
                setTimeout(async function(){
		message.channel.send("Top toàn server");
              for(let y = 0; y < jsfile.length; y++){
		
               message.channel.send(`Hạng ${y+1} <@!${score[y].name}>` +" "+score[y].message + " tin nhắn " +"\n");
		if(y ==jsfile.length-1)return message.channel.send("Xong!");
               
              }
            }, 100);
		
             }  
           });     
          });
    })

    
}

module.exports.help = {
    name: "toptnall"
}
