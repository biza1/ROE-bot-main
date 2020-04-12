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
      fs.readFile('./commands/log/lvl/lvl','utf8',function(err,datalvl){
        if(err) console.log(err);
    
        let jsfile = files.filter(f=>f)
        if(jsfile.length <= 0){
            console.log("Không tìm thấy tin nhắn");
            return;
        }
          jsfile.forEach((f, i)=> {
            fs.readFile(`./commands/log/warning/${f}/tinnhan`, 'utf-8', (err, data) => {
              let data1 = data.split("\n");
             // return console.log(data1*10);
              
              let exp = data1*10;
             // console.log(exp);
              //console.log(data1);
              var lvl1;  
              var lines;
              lines = datalvl.split("\n");  
             //if(exp > 0) return console.log("Im here");
             if(exp <lines[0].split(" ")[1]){lvl1 =0;} 
             if(exp > lines[99].split(" ")[1]){lvl1=`100`;}
              for(let e= 0; e<100; e++){
                if(exp == lines[e].split(" ")[1]){lvl1= e+1; }              
                if(exp>lines[e].split(" ")[1]&& exp<lines[e+1].split(" ")[1]){lvl1= e+1; }   
              }
              score.push({name:`${f}`,message: `${exp}`,lvl:`${lvl1}`});
              score.sort(function(a, b){return b.message - a.message});
             
            if(jsfile.length-1 == i){
                 var punch = [];
                setTimeout(async function(){
                  for(let y = 0; y < 20; y++){
                  await punch.push(`Hạng ${y+1} <@!${score[y].name}>` +" Lv."+score[y].lvl+"\n");
                  if(19 == y){
                  let hit = new Discord.RichEmbed()
                  .setDescription(`${punch.join("")}`)
                  .setTitle("Top 20 người Level cao nhất")
                  .setColor("#15edf1")
                  .setFooter("Code by Sen")
			  .setTimestamp()
                  return message.channel.send(hit);
                   }
                   }
              // for(let y = 0; y < jsfile.length; y++){
              //   if(score[y].lvl ==0) return message.channel.send("Done!");
              //  message.channel.send(`Hạng ${y+1} <@!${score[y].name}>` +" Lv."+score[y].lvl+"\n");
             
              // }
            }, 100);
             }  
           });     
          });
        });
    })

    
}

module.exports.help = {
    name: "toplvl"
}
