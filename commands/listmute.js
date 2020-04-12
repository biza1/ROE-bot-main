const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
var mongoose = require('mongoose');
const Mute = require('../models/mute.js');
mongoose.connect('mongodb+srv://sen:sen@data-2dbpw.gcp.mongodb.net/test',{ useUnifiedTopology: true ,useNewUrlParser: true});


bot.commands = new Discord.Collection();

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd= messageArray[0];

    const   s = 1000;
    m = 60000;
    h = 3600000;
    d = 86400000;
    y = 31557600000;
    timeLeft =0;
    year = day = hour = min = sec = wy = wd = wh = wm = ws = 0; 
let list = [];
    Mute.find({
        __v: 0,
    },async function(err,result){
        if(err) return;
        if(result[0]===undefined) return message.channel.send("Không có list mute");
        
        for(let x=0;x<result.length;x++){
            let today = new Date();
            let old = new Date(result[x].time);
            let timeLeft = result[x].mutetime-(today-old);
            console.log(timeLeft)
            if(timeLeft >= y){
                year = Math.floor(timeLeft / y);
                timeLeft -= y*year;
            if(timeLeft >= d){
            day = Math.floor(timeLeft / d);
            timeLeft -= d*day;
            if(timeLeft >= h){
                hour = Math.floor(timeLeft / h);
                timeLeft -= h*hour;
                if(timeLeft >= m){
                    min = Math.floor(timeLeft / m);
                    timeLeft -= m*min;
                    if(timeLeft >= s){
                       sec = Math.floor(timeLeft / s);
                    }
                }else{
                    sec = Math.floor(timeLeft / s);
                }s
            }else{
                if(timeLeft >= m){
                    min = Math.floor(timeLeft / m);
                    timeLeft -= m*min;
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }
                }else{
                    sec = Math.floor(timeLeft / s);
                }
            }
        }else{
            if(timeLeft >= h){
                hour = Math.floor(timeLeft / h);
                timeLeft -= h*hour;
                if(timeLeft >= m){
                    min = Math.floor(timeLeft / m);
                    timeLeft -= m*min;
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }
                }else{
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }

                }s
            }else{
                if(timeLeft >= m){
                    min = Math.floor(timeLeft / m);
                    timeLeft -= m*min;
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }
                }else{
                    sec = Math.floor(timeLeft / s);
                }
            }
        }
    }else{
        if(timeLeft >= d){
            day = Math.floor(timeLeft / d);
            timeLeft -= d*day;
            if(timeLeft >= h){
                hour = Math.floor(timeLeft / h);
                timeLeft -= h*hour;
                if(timeLeft >= m){
                    min = Math.floor(timeLeft / m);
                    timeLeft -= m*min;
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }
                }else{
                    sec = Math.floor(timeLeft / s);
                }s
            }else{
                if(timeLeft >= m){
                    min = Math.floor(timeLeft / m);
                    timeLeft -= m*min;
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }
                }else{
                    sec = Math.floor(timeLeft / s);
                }
            }
        }else{
            if(timeLeft >= h){
                hour = Math.floor(timeLeft / h);
                timeLeft -= h*hour;
                if(timeLeft >= m){
                    min = Math.floor(timeLeft / m);
                    timeLeft -= m*min;
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }
                }else{
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }

                }s
            }else{
                if(timeLeft >= m){
                    min = Math.floor(timeLeft / m);
                    timeLeft -= m*min;
                    if(timeLeft >= s){
                        sec = Math.floor(timeLeft / s);
                    }
                }else{
                    sec = Math.floor(timeLeft / s);
                }
            }
        }
    }

    if(year >= 1){
        wy = year + " năm "; 
    }else wy = "";
    if(day >=1){
        wd = day + " ngày "; 
    }else wd = "";
    if(hour >=1){
        wh = hour + " giờ "; 
    }else wh = "";
    if(min >=1){
        wm = min + " phút "; 
    }else wm = "";
    if(sec >=1){
        ws = sec + " giây"; 
    }else ws = "";

    await list.push(`<@${result[x].userID}> | Lý do: ${result[x].lydo}`+ " | Còn lại "+ wy +""+ wd+""+wh+""+wm+""+ws+"."+ `[<@${result[x].userMute}>]\n`);
        if(x==result.length-1){
            let hit = new Discord.RichEmbed()
                         .setDescription(`${list.join("")}`)
                         .setTitle("Listmute")
                         .setColor("#15edf1")
                         .setFooter("Code by Sen")
			             .setTimestamp()
            return message.channel.send(hit);
        }

    }
    
    })
}
 
module.exports.help = {
    name: "listmute"
}
