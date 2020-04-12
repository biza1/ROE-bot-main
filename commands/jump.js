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
    //let user = message.mentions.users.first() || message.author;
    let jump = args.join(" ");
    let room;
    let roomID;
    let take = jump.toLowerCase();
    console.log(parseInt(take));
    if(parseInt(take)){
        const channel = message.guild.channels.find('id', `${take}`);
        if(!channel) return message.channel.send("Không tìm thấy phòng!");
         message.member.setVoiceChannel(take);
         return message.reply(`Nhảy tới <#${take}>!`);
    }else{
    let sq1 = ["sq1","squad 1","squad 01","squad1","squad01","sq 1","sq 01","sq01"] //547602062276296717
    let sq2 = ["sq2","squad 2","squad 02","squad2","squad02","sq 2","sq 02","sq02"] //547602167373234202
    let sq3 = ["sq3","squad 3","squad 03","squad3","squad03","sq 3","sq 03","sq03"] //547602200566824970
    let sq4 = ["sq4","squad 4","squad 04","squad4","squad04","sq 4","sq 04","sq04"] //547602226194153472
    let sq5 = ["sq5","squad 5","squad 05","squad5","squad05","sq 5","sq 05","sq05"]//551302265932218368
    let sq6 = ["sq6","squad 6","squad 06","squad6","squad06","sq 6","sq 06","sq06"]//560441600098959362
    let sq7 = ["sq7","squad 7","squad 07","squad7","squad07","sq 7","sq 07","sq07"]//547062301195370507
    let sq8 = ["sq8","squad 8","squad 08","squad8","squad08","sq 8","sq 08","sq08"]//597326002519015424
    let sq9 = ["sq9","squad 9","squad 09","squad09","squad9","sq 9","sq 09","sq09"]//597326046928306176
    let sq10 = ["sq10","squad 10","squad10","sq 10","sq 10","sq10"] //597326085772017673
    let sq11 = ["sq11","squad 11","squad11","sq 11","sq 11","sq11"]//598143913907191859
    let sq12 = ["sq12","squad 12","squad12","sq 12","sq 12","sq12"]//598143945020801025
    let sq13 = ["sq13","squad 13","squad13","sq 13","sq 13","sq13"]//598143974724861963
    let sq14 = ["sq14","squad 14","squad14","sq 14","sq 14","sq14"]//598144002906259466
    let sq15 = ["sq15","squad 15","squad15","sq 15","sq 15","sq15"]//598144026021199894
    let sq = [sq1,sq2,sq3,sq4,sq5,sq6,sq7,sq8,sq9,sq10,sq11,sq12,sq13,sq14,sq15]
    let team = ["547602062276296717","547602167373234202", "547602200566824970","547602226194153472","551302265932218368","560441600098959362", "547062301195370507","597326002519015424", "597326046928306176","597326085772017673", "598143913907191859","598143945020801025","598143974724861963","598144002906259466","598144026021199894"]
  //  const channel = message.guild.channels.find('name', `${room}`);
    for(let i =0; i<15;i++){
     if(sq[i].indexOf(take)>=0) {
        for(let z = 0;z<15;z++){
           if(i==z) {
            const channel = message.guild.channels.find('id', `${team[z]}`);
            if(!channel) return message.channel.send("Không tìm thấy phòng!");
                message.member.setVoiceChannel(channel);
            return message.reply(`Nhảy tới <#${channel.id}>!`);
           }
         }
     }  
    }
	
	if(jump.toLowerCase()=="phòng trà"){jump ="☕ Phòng Trà";}
	if(jump.toLowerCase()=="phòng bay lắc"){jump ="💃 Phòng Bay Lắc";}
    if(jump.toLowerCase()=="talk show"){jump ="🎭 Talk Show";}
    if(jump.toLowerCase()=="duo 1"||jump.toLowerCase()=="duo 01"){jump ="🎲 Duo 01";}
    if(jump.toLowerCase()=="duo 2"||jump.toLowerCase()=="duo 02"){jump ="🎲 Duo 02";}
        const channel = message.guild.channels.find('name', `${jump}`);
	if(channel.id==="695169623234052146") return message.channel.send("Không tìm thấy phòng!");
	if(channel.id==="695173781177630740") return message.channel.send("Không tìm thấy phòng!");
        console.log(jump);
        if (channel == null) return message.channel.send("Không tìm thấy phòng!");
        if(channel.type == 'text') return message.channel.send("Phòng text không thể join");
        // else message.channel.send("phòng voice");
        if(!message.member.voiceChannel)
        {
            return message.reply("Hãy vào voice Channel bất kỳ!"); 
        }
        message.member.setVoiceChannel(channel.id);
        return message.reply(`Nhảy tới <#${channel.id}>!`);
}
    // else{
    //     if (channel == null) return message.channel.send("Không tìm thấy phòng!");
    //     if(channel.type == 'text') return message.channel.send("Phòng text không thể join");
    //     // else message.channel.send("phòng voice");
    //     if(!message.member.voiceChannel)
    //     {
    //         return message.reply("Hãy vào voice Channel bất kỳ!"); 
    //     }
    //     return message.member.setVoiceChannel(channel.id);
    //     }
    
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
    name: "jump"
}
