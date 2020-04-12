const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let messageArray = message.content.split(" ");

    // thông tin bot
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setColor("#15edf1")
            .setThumbnail(bicon)
            .setTitle("Thông tin bot")
            .setDescription(`Tên Bot: ${bot.user.username}\n`+"Người tạo: <@328492011403608064>")
            //.setDescription("Người tạo: "+bot.user.username+"\ntest link: [vd link](https://bots.ondiscord.xyz/)")

        return message.channel.send(botembed);
    // thông tin bot

}

module.exports.help = {
    name: "bot"
}