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
     //help commands

   let check = message.member.hasPermission("ADMINISTRATOR");
   
   if(!check){ 
     if(message.member.roles.has('545275416232067072')){
      let helps1 = new Discord.RichEmbed()
        .setDescription(`Ping:\`$ping\`\nThông tin user: \`$info @user#1234\`\nThông tin bot: \`$bot\`\nThông tin server: \`$serverinfo\`\n\nLệnh phát nhạc: \`$music.help\`\n\nKick người dùng: \`$kick @user [nội dung]\`(Mod only)\nBan người dùng: \`$ban @user [nội dung]\`(Mod only)\n\nReport người dùng: \`$report @user [nội dung]\` (lưu ý: có thể gửi cả file[ảnh hoặc text] đính kèm để tăng sự thuyết phục!)\nBot nói thay bạn: \`$say lời-muốn-nói\``)
        .setColor("#15edf1")
        .setTitle("Commands:")
        return message.channel.send(helps1); 
    }
      let helps = new Discord.RichEmbed()
      .setDescription("Ping:\`$ping\`\nThông tin user: \`$info @user#1234\`\nThông tin bot: \`$botinfo\`\nThông tin server: \`$serverinfo\`\n\nLệnh phát nhạc: \`$music.help\`\n\nReport người dùng: \`$report @user [nội dung]\` (lưu ý: có thể gửi cả file[ảnh hoặc text] đính kèm để tăng sự thuyết phục!)")
      .setColor("#15edf1")
      .setTitle("Commands:")
      return message.channel.send(helps);
    }else{
       
      let helps1 = new Discord.RichEmbed()
      .setDescription(`Ping:\`$ping\`\nThông tin user: \`$info @user#1234\`\nThông tin bot: \`$bot\`\nThông tin server: \`$serverinfo\`\n\nLệnh phát nhạc: \`$music.help\`\n\nKick người dùng: \`$kick @user [nội dung]\`(Mod only)\nBan người dùng: \`$ban @user [nội dung]\`(Mod only)\n\nReport người dùng: \`$report @user [nội dung]\` (lưu ý: có thể gửi cả file[ảnh hoặc text] đính kèm để tăng sự thuyết phục!)\nBot nói thay bạn: \`$say lời-muốn-nói\``)
      .setColor("#15edf1")
      .setTitle("Commands:")
      return message.channel.send(helps1); 
      } 
    //help commands

}

module.exports.help = {
    name: "help"
}
