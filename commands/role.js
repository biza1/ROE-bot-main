const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;   
    let prefix = botconfig.prefix;

    let arr1 = [];
    let rolem = message.guild.roles.find(function(role){
        let count = `${role.id}`;
        arr1.push(`<@&${count}> `);
    });
    let hit = new Discord.RichEmbed()
    .setDescription(`${arr1.join("")}`)
    .setTitle(`Toàn bộ ${arr1.length+1} Role`)
    .setColor("#15edf1")
    return message.channel.send(hit);

}

module.exports.help = {
    name: "role"
}