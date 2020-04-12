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

    let user = message.mentions.users.first() || message.author;
    let name =user.id;
    var filetn = `./commands/log/warning/${name}/tinnhan`;
    fs.readFile('./commands/log/lvl/lvl','utf8',function(err,datalvl){ 
    fs.readFile(`./commands/log/warning/${name}/tinnhan`,'utf8',function(err){
    fs.readFile(filetn,'utf8',function(err,data){
           
        var exp = data*10;    
        var lines;
            lines = datalvl.split("\n");  
           
              for(let i= 0; i<100; i++){
                   
               if(exp == lines[i].split(" ")[1]) return message.channel.send(`<@${name}>`+" | "+lines[i].split(" ")[0]+ ` | Exp: `+data*10+`/`+ lines[i+1].split(" ")[1]);
              if(exp>lines[i].split(" ")[1]&& exp<lines[i+1].split(" ")[1]) return message.channel.send(`<@${name}>`+" | "+lines[i].split(" ")[0]+ ` | Exp: `+data*10+`/`+ lines[i+1].split(" ")[1]);
    
              if(exp > lines[99].split(" ")[1]) return message.channel.send("LV.100")
            }
                    
    });


}); 
}); 
}

module.exports.help = {
    name: "lvl"
}