const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd= messageArray[0];


//ban người dùng
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!bUser) return message.channel.send("Không tìm thấy người dùng.");
            if(!message.member.hasPermission("BAN_MEMBERS")){message.delete().catch(O_o => {}); return;}
            if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Không thể kick thành viên này!");
            let breason = args.join(" ").slice(22);
    
            if(breason < 5){message.delete().catch(O_o => {});  return message.channel.send("Nhập lý do vd:/report @user [nội dung]");}
    
    
            let banEmbed = new Discord.RichEmbed()
            .setTitle("Ban")
            .setColor("#9c99ff")
            .setDescription(`Ban bởi ${message.author} ở ${message.channel} lúc ${message.createdAt} \nBan thành viên ${bUser}(ID: ${bUser.id}) với lý do:\n${breason}` )
            
            let banChannel = message.guild.channels.find(`name`, "lịch-sử-chỉnh-sửa");
            if(!banChannel) return message.channel.send("Không thể Ban lúc này!");
    
            message.guild.member(bUser).ban(breason);
            banChannel.send(banEmbed);
             message.delete().catch(O_o => {});
             return;
    //ban người dùng
}

module.exports.help = {
    name: "ban"
}