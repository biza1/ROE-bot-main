const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roe:roe@roe-dewbn.azure.mongodb.net/data-ROE?retryWrites=true&w=majority',
    { useUnifiedTopology: true ,useNewUrlParser: true}
);
const Team = require('../models/team.js');
const { count, find } = require("../models/team.js");
const team = require("../models/team.js");
bot.commands = new Discord.Collection();
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    let checkadmin = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
    if(!args[0]){

        let teamRole = [];
        var data = [];
        var outMess = [];
        var left = [];
        Team.find({}).sort({role:-1}).exec(async function(err, result) { 
            if(!result||result[0]===undefined||err) return message.channel.send("Đã xảy ra lỗi, vui lòng thử lại sau!");
            else{
                message.guild.roles.find(function(role){
                    let count = `${role.id}`;
                    if(role.name.indexOf("Team")!=-1) teamRole.push(`${count}`);
                });
                


               let countGet = 0;
                for(var i = 0; i < teamRole.length; i++) {
                    for(var j = 0; j < result.length; j++ ) {
                        if(teamRole[i].indexOf(result[j].role) > -1){
                            let list = message.guild.roles.get(result[j].role).members.map(m=>m.user.id);
                            data.push({role:`${result[j].role}`,leader:result[j].leader,mem:list.length});
                            countGet++;
                        }else{
                            if(j == result.length-1&&countGet==i){
                                let list = message.guild.roles.get(teamRole[i]).members.map(m=>m.user.id);
                                data.push({role:`${teamRole[i]}`,mem:list.length}); 
                                countGet++;  
                            }
                        }
                                                                                         
                    }
                }
                data.sort(function(a, b){return b.mem-a.mem});
                
                for(let i =0;i<data.length;i++){
                    if(!data[i].leader){
                        outMess.push(`\`${i+1}\`: <@&${data[i].role}> , ${data[i].mem} thành viên.\n`);
                    }else{
                        outMess.push(`\`${i+1}\`: <@&${data[i].role}> , ${data[i].mem} thành viên. Leader: **<@!${data[i].leader}>**\n`);
                    }
                } 
                const embed = new Discord.RichEmbed()
                    .setAuthor("Team")
                    .setDescription(outMess.join(""))
                    .setColor("#0af58b")
                    .setFooter("Code by Sen")
                    .setTimestamp()
                return message.channel.send(embed);
                
            }
        });
    

    }else{

        let teamRoleget = message.guild.roles.find("name", `${args.join(" ")}`);
        if(!teamRoleget) teamRole = message.guild.roles.find("id", `${args[0]}`);
        if(!teamRoleget) return console.log("not found role");
        if(teamRoleget.name.indexOf("Team")==-1)return console.log("not role Team");
        let list = message.guild.roles.get(teamRoleget.id).members.map(m=>m.user.id);
        let timeCreate = moment(teamRoleget.createdAt).format("H:m:s D/M/YYYY");

        Team.findOne({
            role: teamRoleget.id,
        },(err, result)=>{
            if(!result){
                const embed = new Discord.RichEmbed()
                    .setAuthor(`${teamRoleget.name}`)
                    .addField(`**Leader:**`,`undefined`)
                    .addField(`**Thành viên:** **${list.length}**`,`<@!${list.join(">, <@!")}>.`,true)
                    .addField(`**Thời gian tạo:**`,timeCreate)
                    .setColor("#0af58b")
                    .setFooter("Code by Sen")
                    .setTimestamp()
                return message.channel.send(embed);
            }else{
                const embed = new Discord.RichEmbed()
                    .setAuthor(`${teamRoleget.name}`)
                    .addField(`**Leader:**`,`<@!${result.leader}>`)
                    .addField(`**Thành viên:** **${list.length}**`,`<@!${list.join(">, <@!")}>.`,true)
                    .addField(`**Thời gian tạo:**`,timeCreate)
                    .setColor("#0af58b")
                    .setFooter("Code by Sen")
                    .setTimestamp()
                return message.channel.send(embed);
            }

            
        });
    }

}
module.exports.help = {
    name: "team"
}
