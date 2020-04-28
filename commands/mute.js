﻿const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
var mongoose = require('mongoose');
const Mute = require('../models/mute.js');
mongoose.connect('mongodb+srv://roe:roe@roe-dewbn.azure.mongodb.net/data-ROE?retryWrites=true&w=majority',
    { useUnifiedTopology: true ,useNewUrlParser: true}
);

module.exports.run = async (__bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!args[0]||args[0]==="help"){
        let muteEmbed = new Discord.RichEmbed()
            .setTitle("Mute help")
            .setColor("#9c99ff")
            .setDescription(`**Lệnh**\n\`$${module.exports.help.name} @user#1234 [time] [lý do]\`\nĐịnh dạng thời gian trong lệnh lần lượt:\ns = giây\nm = phút\nh = giờ\nd = ngày\ny = năm\nvd: ${prefix}mute @user#0001 2d`)
            .setFooter("Code by Sen")
		.setTimestamp()
        return message.channel.send(muteEmbed);
    }
    let messageArray = message.content.split(" ");
    console.log(messageArray);
    const   s = 1000;
            m = 60000;
            h = 3600000;
            d = 86400000;
            y = 31557600000;
            vntime = "";
            Number.timecount = 0;         //tính theo milisecond
            

    // mute người dùng
let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!mUser) return message.channel.send("Không tìm thấy người dùng.");
let checkadmin = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
if(!checkadmin) return;
if(mUser.hasPermission("ADMINISTRATOR")||message.member.roles.has('545275416232067072')) return message.channel.send("Không thể mute thành viên này!");
let muterole = message.guild.roles.find(`name`, "mute");
if(!muterole){
    try{
        muterole = await message.guild.createRole({
            name: "mute",
            color:"#000000",
            permission:[]
        })
        message.guild.channels.forEach(async (channel, id)=>{
            await channel.overwritePermisions(muterole,{
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    }catch(e){
        console.log(e.stack);
    }
}

var mutetime = args[1];
var lydo1 = args[2];
var messDown = args.join(" ");
var lyDo = messDown.slice(messDown.indexOf(`${lydo1}`));

if(!mutetime) return message.channel.send("Nhập thời gian vd: $mute @user#0001 2d");
var time = ["s","m","h","d","y"];    
var get = 0;
    t = 0;

for(var x=0;x<5;x++){
    if(mutetime.indexOf(time[x]) != -1){
       get = 1;
       t=x;
    }
}
if(get != 1){ return message.channel.send("Định dạng thời gian trong lệnh lần lượt:\ns = giây\nm = phút\nh = giờ\nd = ngày\ny = năm\nvd: /mute @user#0001 2d");}
if(!mutetime) return message.channel.send("Nhập thời gian vd: /mute @user#0001 2d");

var val = mutetime.slice(0,mutetime.lastIndexOf("")-1)-0;

if(time.indexOf(time[t]) === 0)
{
    var sec = " giây"   
    vntime = val + sec;
    Number.timecount =  val*s;   
}
if(time.indexOf(time[t]) === 1)
{
    var min = " phút"   
    vntime = val + min;
    Number.timecount =  val*m; 
}
if(time.indexOf(time[t]) === 2)
{   
    var hour = " giờ"   
    vntime = val + hour;
    Number.timecount =  val*h; 
}
if(time.indexOf(time[t]) === 3)
{
    var day = " ngày"   
    vntime = val + day;
    Number.timecount = val*d; 
}
if(time.indexOf(time[t]) === 4)
{
    var year = " năm"   
    vntime = val + year;
    Number.timecount = val*y; 
}
    await(mUser.addRole(muterole.id));
    const embed = new Discord.RichEmbed()
        .setAuthor("Mute")
        .addField(`:shushing_face:`,`Mute <@${mUser.id}> ${vntime} lý do: ${lyDo}`,true)
        .setColor("#f50a74")
        .setFooter("Code by Sen")
        .setTimestamp()
	message.channel.send(embed);
    console.log(Number.timecount);

    const mute = new Mute({
        _id: mongoose.Types.ObjectId(),
        userID: `${mUser.id}`,
        userMute:message.author.id,
        lydo:`${lyDo}`,
        mutetime:Number.timecount,
        time:new Date()
    });
    mute.save().then(console.log("save")).catch(err => console.log(err));
	setTimeout(function(){
	Mute.findOne({
        userID: mUser.id,
    	},(err, result)=>{
        if(err) return console.log(err);
        if(!result) return;
        mUser.removeRole(muterole.id);
        Mute.find({userID: mUser.id}).remove().exec();
        const embed = new Discord.RichEmbed()
			  .setAuthor("Unmute")
			  .addField(`:white_check_mark:`,`Unmute <@${mUser.id}>`,true)
			  .setColor("#0af58b")
			  .setFooter("Code by Sen")
			  .setTimestamp()
        return message.channel.send(embed);
    })
    }, Number.timecount);
    // mute người dùng
}

module.exports.help = {
    name: "mute"
}
