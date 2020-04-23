const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sen:senroe@roe-dewbn.azure.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true ,useNewUrlParser: true}
);
const User = require('../models/user.js');

const moment = require('moment');
module.exports.run = async (bot, message, args) => {


    let user = message.guild.member(message.mentions.users.first() || message.author);
    if(!user) return message.channel.send("Không tìm thấy người dùng!");
    const member = message.guild.member(user);
    console.log(member._roles.length)
    let infoUser = {};
        infoUser.id=user.user.id;
    let img = user.user.avatar;
        if(img===null){
            img= "https://cdn.discordapp.com/embed/avatars/0.png";
            infoUser.avatar = img;
        }
        else if(img.startsWith('a_')){
            img = img+".gif";
            infoUser.avatar="https://cdn.discordapp.com/avatars/"+user.user.id+"/"+img;
        }else{
            infoUser.avatar="https://cdn.discordapp.com/avatars/"+user.user.id+"/"+img;
        }
        infoUser.name=user.user.username;
        infoUser.tag=user.user.discriminator;
        infoUser.status=user.presence.status;
        infoUser.joinedSv=`${moment(member.joinedAt).format("H:m:s D/M/YYYY")}`;
        infoUser.create=`${moment(user.user.createdAt).format("H:m:s D/M/YYYY")}`;

        User.findOne({
            id: infoUser.id,
        },(err, result)=>{
            if(!result){
                let embed = new Discord.RichEmbed()
                    .setColor("#15edf1")
                    .setAuthor(`${member.nickname||infoUser.name}`,infoUser.avatar)
                    .setThumbnail(infoUser.avatar)
                    .addField("**Tên**", infoUser.name, true)
                    .addField("**Tag**", infoUser.tag, true)
                    .addField("**Role**", member._roles.length, true)
                    .addField("**Status**", infoUser.status, true)
                    .addField("**Ngày tham gia**", infoUser.joinedSv, true)
                    .addField("**Ngày tạo tài khoản**", infoUser.create, true)
                    .setFooter(`Code by Sen`)
                    .setTimestamp()
                return message.channel.send({embed: embed});
            }else{
                let embed = new Discord.RichEmbed()
                    .setColor("#15edf1")
                    .setAuthor(`${member.nickname||infoUser.name}`,infoUser.avatar)
                    .setThumbnail(infoUser.avatar)
                    .addField("**Tên**", infoUser.name, true)
                    .addField("**Tag**", infoUser.tag, true)
                    .addField("**Role**", member._roles.length, true)
                    .addField("**Status**", infoUser.status, true)
                    .addField("**Số tin nhắn**", result.tinnhan, true)
                    .addField("**Số nhắc nhở**", result.nhacnho, true)
                    .addField("**Ngày tham gia**", infoUser.joinedSv, true)
                    .addField("**Ngày tạo tài khoản**", infoUser.create, true)
                    .setFooter(`Code by Sen`)
                    .setTimestamp()
                return message.channel.send({embed: embed});
            }
        });
}

module.exports.help = {
    name: "info"
}
