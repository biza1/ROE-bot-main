const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
var today = new Date();
const fs = require("fs");

module.exports.run = async (__bot, message, args) => {
   
    fs.readdir("./commands/log/report/", (err, files)=>{
        if(err) console.log(err);
    
        let jsfile = files.filter(f=>f)
        if(jsfile.length <= 0){
            let hit = new Discord.RichEmbed()
            .setDescription(`Không có list!`)
            .setTitle("List Report")
            .setColor("#15edf1")
            return message.channel.send(hit);
        }
        var punch = [];  
        jsfile.forEach((f, i)=> {
            fs.readFile(`./commands/log/report/${f}`, 'utf-8', (err, data) => {
            punch.push(data);
            if(i+1==jsfile.length){
                let hit = new Discord.RichEmbed()
                .setDescription(`${punch.join("\n")}`)
                .setTitle("List Report")
                .setColor("#15edf1")
                return message.channel.send(hit);
            }
           });     
          });
         

    })

    //report người dùng
}

module.exports.help = {
    name: "lreport"
}
