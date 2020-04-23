const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
var mongoose = require('mongoose');
const Mute = require('../models/mute.js');
mongoose.connect('mongodb+srv://roe:roe@roe-dewbn.azure.mongodb.net/data-ROE?retryWrites=true&w=majority',
    { useUnifiedTopology: true ,useNewUrlParser: true}
);
bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd= messageArray[0];

    let checkadmin = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
    if(!checkadmin) return;

    let mUser = message.guild.member(message.mentions.users.first());
    if(!mUser) return message.channel.send("Không tìm thấy người dùng.");
    let muterole = message.guild.roles.find(`name`, "mute");
    let sendchannel =  message.guild.channels.find(`id`, "549109631234998273");
    Mute.findOne({
        userID: mUser.id
    },(err, result)=>{
        if(err) return console.log(err);
        if(!result) return message.channel.send("Người này không bị mute!");
        mUser.removeRole(muterole.id);
        Mute.find({userID: mUser.id}).remove().exec();
        const embed = new Discord.RichEmbed()
			  .setAuthor("Unmute")
			  .addField(`:white_check_mark:`,`Unmute <@${mUser.id}>`,true)
			  .setColor("#0af58b")
			  .setFooter("Code by Sen")
			  .setTimestamp()
		return sendchannel.send(embed);
    })

}

module.exports.help = {
    name: "unmute"
}
