const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

module.exports.run = async (__bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = botconfig.prefix;
    if(!args[0]||args[0 == "help"]){
        let check = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
        if(!check){
            let hit = new Discord.RichEmbed()
                .setDescription(`Lệnh thêm Role: \`$addrole [tên role Team] [tag người dùng]\`\nVD: \`$addrole ROE Team @user#1234\`\nLệnh cho phép các thành viên có role Team dùng để thêm thành viên vào Team mình.\nLưu ý, muốn thêm role Team cho một ai đó thì hãy chắc chắn rằng người đó đang không ở trong Team nào cả và bạn phải có role Team.\n`)
                .setTitle("Help Add Role")
                .setColor("#15edf1")
            return message.channel.send(hit);
        }else{
            let hit = new Discord.RichEmbed()
            .setDescription(`Lệnh thêm Role: \`$addrole [tên role Team] [tag người dùng]\`\nVD: \`$addrole ROE Team @user#1234\``)
            .setTitle("Help Add Role")
            .setColor("#15edf1")
            return message.channel.send(hit);
        }
    }

    let user = message.guild.member(message.mentions.users.first());
    if(!user.id) return message.channel.send("Không tìm thấy người dùng!");
    let getrole = take.slice(0,take.lastIndexOf("<@")-1);
    let teamrole = message.guild.roles.find("name", `${getrole}`);
    role = teamrole.id;
    if(!teamrole) return message.channel.send("Không có Role này!");

    let check = message.member.roles.has('545275416232067072')||message.member.hasPermission("ADMINISTRATOR");
    if(!check){
        if(teamrole.name.indexOf("Team")==-1) return message.channel.send("Bạn chỉ có thể thêm role Team mà bạn đang có cho người khác!");

        //check user have anyrole Team
        let arr = [];
        let rolem = message.guild.roles.find(function(role){
            let roleName = `${role.name}`;
            

            if(roleName.lastIndexOf("Team")>-1){
                arr.push(roleName);             
            }        
        });
        
        for(let i=0;i<arr.length;i++){
            let findRole = message.guild.roles.find("name", `${arr[i]}`);
            if(user.roles.has(findRole.id)){
                return message.channel.send("Người này đang ở trong một Team khác!");
            }
        }


        if(user.roles.has(teamrole.id))return message.channel.send("Người này đã có Role này!"); 
        if(message.member.roles.has(teamrole.id)){
            let membersWithRole = message.guild.members.filter(member => { 
                return member.roles.find("name", teamrole.name);
            }).map(member => {
                return member.user.username;
            })
            
                user.addRole(teamrole.id);
                return message.channel.send(`Addrole thành công!`);               


        }else{ return message.channel.send("Bạn chỉ có thể thêm role Team mà bạn đang có cho người khác!");}
    }else{
            if(user.hasPermission("ADMINISTRATOR")) return message.channel.send("Không thể set Role thành viên này!");
            user.addRole(teamrole.id);     
            return message.channel.send(`Done!`);      
    }

    

}

module.exports.help = {
    name: "addrole"
}