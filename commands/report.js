const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
var today = new Date();
const fs = require("fs");
var download = require('download-file');

module.exports.run = async (__bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd= messageArray[0];
    var file = "";
        namefile = "";  
    var url;


   //report người dùng
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Không tìm thấy người dùng.");
        let reason = args.join(" ").slice(22);
        
        if(reason < 1){message.delete().catch(O_o => {});  return message.channel.send("Nhập lý do vd:/report @user [lý do]\nCó thể đính kèm file nếu có!");}

        if (message.attachments.size > 0) {
            if (message.attachments.every(attachIsImage)){
                console.log("take");
            }
        }
    
        // function attachIsImage(msgAttach) {
        //     url = msgAttach.url;
        //     file = `\n[file](${url})`;
        //     message.channel.send(url);

        function attachIsImage(msgAttach) {
                url = msgAttach.url;                
                namefile =(today-1)+ url.slice(url.lastIndexOf("/")+1,url.lastIndexOf(""));
                var options = {
                    directory: "./commands/log/fileReport/",
                    filename: `${namefile}`
                }
                download(url, options, function(err){
                    if (err) throw err
                    console.log("done");
                }) 
                // file = `\n[file](${"C:/Users/Seniju/Desktop/patch.txt"})`;  
                
           // file = `\n[file](${"./commands/fileReport/"+namefile})`;    
        }
        let reportEmbed = new Discord.RichEmbed()
                .setTitle("Reports")    
                .setColor("#969996")
                .setDescription(`Báo cáo bởi ${message.author} ở ${message.channel} lúc ${message.createdAt}: \nBáo cáo thành viên ${rUser}(ID: ${rUser.id}) với nội dung:\n${reason} ${file} ` )
                
                
                var data = `<@${rUser.id}>[report bởi ${message.author}] | ${reason} `;
                var filesave = `./commands/log/report/${rUser.id}`;
                fs.writeFileSync(filesave, data);
        
                let reportschannel = message.guild.channels.find(`name`, "lịch-sử-chỉnh-sửa");
                if(!reportschannel) return message.channel.send("Không thể Report lúc này!");
                reportschannel.send(reportEmbed);

    setTimeout(function(){
      return message.delete().catch(O_o => {});
    },5000);   
    
    //report người dùng
}

module.exports.help = {
    name: "report"
}