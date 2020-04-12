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
    

//kick người dùng
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!message.member.roles.has('545275416232067072')) return message.channel.send("Bạn không có quyền này!");
        if(!kUser) return message.channel.send("Không tìm thấy người dùng.");
        //if(!message.member.hasPermission("KICK_MEMBERS")){message.delete().catch(O_o => {}); return;}
        if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Không thể kick thành viên này!");
        let kreason = args.join(" ").slice(22);

        if(kreason < 5){message.delete().catch(O_o => {});  return message.channel.send("Nhập lý do vd:/report @user [nội dung]");}


        let kickEmbed = new Discord.RichEmbed()
        .setTitle("Kick")
        .setColor("#9c99ff")
        .setDescription(`Kick bởi ${message.author} ở ${message.channel} lúc ${message.createdAt} \nKick thành viên ${kUser}(ID: ${kUser.id}) với lý do:\n${kreason}` )
        
        let kickChannel = message.guild.channels.find(`name`, "lịch-sử-chỉnh-sửa");
        if(!kickChannel) return message.channel.send("Không thể Kick lúc này!");

        message.guild.member(kUser).kick(kreason);
        kickChannel.send(kickEmbed);
         message.delete().catch(O_o => {});
         return;

    //kick người dùng
}

module.exports.help = {
    name: "kick"
}