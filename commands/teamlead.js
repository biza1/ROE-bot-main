const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roe:roe@roe-dewbn.azure.mongodb.net/data-ROE?retryWrites=true&w=majority',
    { useUnifiedTopology: true ,useNewUrlParser: true}
);
const Team = require('../models/team.js');
bot.commands = new Discord.Collection();

module.exports.run = async (bot, message, args) => {
    let checkadmin = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
    if(!checkadmin) return message.channel.send("Bạn không có đủ quyền hạn này!");

    let messageArray = message.content.split(" ");
    let hub = messageArray.join(" ");
    let take = hub.slice(9);
    let user = message.guild.member(message.mentions.users.first());
    if(!user.id) return message.channel.send("Không tìm thấy người dùng!");
    let getrole = take.slice(0,take.lastIndexOf("<")-1);
    let teamrole = message.guild.roles.find("name", `${getrole}`);
    if(!teamrole) return message.channel.send("Có lỗi xảy ra, vui lòng thử lại sau!");


    Team.findOne({
        role: teamrole.id,
    	},(err, result)=>{
        if(err) return console.log(err);
        
        if(!result){
            const team = new Team({
                _id: mongoose.Types.ObjectId(),
                role: teamrole.id,
                leader: user.id,
            });
            const embed = new Discord.RichEmbed()
			  .setAuthor("Set Leader")
			  .setDescription(`Leader <@&${teamrole.id}> từ bây giờ là <@${user.id}>`,true)
			  .setColor("#0af58b")
			  .setFooter("Code by Sen")
			  .setTimestamp()
            return team.save().then(message.channel.send(embed)).catch(err => console.log(err));
        }else{
            result.leader = user.id;
            const embed = new Discord.RichEmbed()
			  .setAuthor("Set Leader")
			  .setDescription(`Leader <@&${teamrole.id}> từ bây giờ là <@${user.id}>`,true)
			  .setColor("#0af58b")
			  .setFooter("Code by Sen")
              .setTimestamp()
            return result.save().then(message.channel.send(embed)).catch(err => console.log(err));
        }
    })

}
module.exports.help = {
    name: "tleader"
}