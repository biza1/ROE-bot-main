const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

module.exports.run = async (bot, message, args) => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let prefix = botconfig.prefix;
     //help commands
  let help = [
    `Ping: \`${prefix}ping\`\n`,
    `Thông tin người dùng: \`${prefix}info\` hoặc \`${prefix}info @user#0123\`\n`,
    `Thông tin server: \`${prefix}serverinfo\`\n`,
    `Thông tin Bot: \`${prefix}bot\`\n`,
    `Theo dõi diễn biến dịch Corona:\`${prefix}corona\`\n`,
    `random số: \`${prefix}roll\` hoặc \`${prefix}roll [số-giới-hạn]\` vd: \`${prefix}roll 5\`\n`,
    `Xem các role: \`${prefix}role\`\n`,
    `Add role team: \`${prefix}addrole\` hoặc \`${prefix}addrole help\` để xem hướng dẫn\n`,
    `Các lệnh di chuyển khác: \`${prefix}help move\`\n`,
  ];
  let hAdmin = [
    `\n**Administrator**\n`,
    `Bot gửi file: \`${prefix}img [text] [kèm-file]\`\n`,
    `Bot gửi nhiều file: \`${prefix}album [kèm file]\` tối đa 10 file 1 lúc\n`,
    `Bot say: \`${prefix}say [text]\`\n`,
    `Top tin nhắn: \`${prefix}toptn\`\n`,
    `Top nói tục: \`${prefix}topbad\`\n`,
    `Mute user: \`${prefix}mute @user#0123 [lý do/hoặc không]\` và xem list mute bằng lệnh \`${prefix}listmute\`\n`,
    `Ban user: \`${prefix}ban @user#0123 [lý do]\`\n`,
    `Kick user: \`${prefix}kick @user#0123 [lý do]\`\n`,
  ];
  let hMove = [
    `Vào phòng muốn kết nối: \`$jump + [tên room]\`\nvd: \`$jump sq1\` \n`,
    `Kéo người được tag vào: \`$move + [tag người muốn kéo vào]\`\nvd: \`$move @user#1234\`\n`,
    `Đẩy người dùng về phòng chờ: \`$leave + [tag người muốn đẩy ra]\`\nvd: \`$leave @user#1234\`\n`,
    `\n**Lưu ý:** \n     Chỉ <@&591292951905304652> , <@&568105173591785472> và <@&598845743431680020> mới có quyền dùng lệnh.\n`,
    `Lạm dụng quyền để phá sẽ bị tước role.\n`,
    `Tên phòng phải viết chính xác nhé!`
  ]
    if(args[0]==="move"){
      let check  = message.member.roles.has('568105173591785472')||message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
      if(!check) return;
      let helps1 = new Discord.RichEmbed()
        .setDescription(hMove.join(""))
        .setColor("#15edf1")
        .setTitle("Help move")
        .setFooter("Code by Sen")
        .setTimestamp()
      return message.channel.send(helps1);
    }

     let check = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
   
     let helps = new Discord.RichEmbed()
     .setColor("#15edf1")
     .setTitle("Commands")
     .setFooter("Code by Sen")
        .setTimestamp()
     if(!check){//not admin
         helps.setDescription(help.join(""))  
         return message.channel.send(helps);
     }else{//an admin
         helps.setDescription(help.join("")+hAdmin.join(""))
         return message.channel.send(helps);
     }
    //help commands

}

module.exports.help = {
    name: "help"
}
