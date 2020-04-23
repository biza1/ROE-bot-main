const Discord = require('discord.js');
const botconfig = require("./commands/botconfig.json");
const tokenfile = require("./token.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const mongoose = require('mongoose');
const User = require('./models/user.js');
mongoose.connect('mongodb+srv://roe:roe@roe-dewbn.azure.mongodb.net/database?retryWrites=true&w=majority',
    { useUnifiedTopology: true ,useNewUrlParser: true}
);

fs.readdir("./commands/", (err, files)=>{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop()==="js")
    if(jsfile.length <= 0){
        console.log("Không tìm thấy lệnh");
        return;
    }
    jsfile.forEach((f, i)=>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

    });
    module.exports.run = async (bot, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        
        let prefix = botconfig.prefix;
        let messageArray = message.content.split(" ");
        let cmd= messageArray[0];
    }
})



bot.on('ready', async () => {
    console.log(`${bot.user.username} is Online!`);
   // bot.user.setActivity("",{type:"WATCHING"});
  bot.user.setPresence({
       game: {
          name: 'RPG Maker MV',
           type: 'PLAYING',
            url: "https://discordapp.com/"
		
        }
    });

//bot.user.setStatus('online','Ring of Elysium') 

	
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    var mkdirp = require('mkdirp');
    var name = message.author.id;
    var noidungtext =message.author.username+'#'+message.author.discriminator+': '+messageArray.join(" "); 
    var channelGet = message.channel.name;
    fs.appendFileSync(`./commands/log/guild/${channelGet}`,noidungtext+"\n");
    console.log(message.channel.name+"|"+message.author.username+'#'+message.author.discriminator+': '+messageArray.join(" "));
    var query = { id: `${message.author.id}` };

  
    var textH = ["địt","cặc","cặc","buồi","fuck","lồn"];
    var lowercase = messageArray.join(" ").toLowerCase();
    User.findOne({
        id: message.author.id,
    },(err, result)=>{
        for(var x =0;x<6;x++){
            if(lowercase.indexOf(textH[x]) > -1){
                let checktuc = x===5&&lowercase.indexOf("lồn")===lowercase.indexOf("lồng")
                if(!checktuc){
                    if(!result){
                        const newUser = new User({
                            _id: mongoose.Types.ObjectId(),
                            id: message.author.id ,
                            report: 0,
                            nhacnho: 1,
                            vipham:0,
                            bireport: 0,
                            tinnhan: 1,
                        });
                        var rd = Math.floor(Math.random()*4); 
                        let data = fs.readFileSync(`./commands/log/tuc/${rd}`,'utf8'); 
                        return newUser.save().then(message.reply(`\`${data}\``)).catch(err => console.log(err));  
                    }else{
                        result.nhacnho+=1;
                        result.tinnhan+=1;
                        var rd = Math.floor(Math.random()*4); 
                        let data = fs.readFileSync(`./commands/log/tuc/${rd}`,'utf8'); 
                        return result.save().then(message.reply(`\`${data}\``)).catch(err => console.log(err));  
                    }
                }else return;
            }
            
            if(x===5&&lowercase.indexOf(textH[x]) === -1){
                if(!result){
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        id: message.author.id ,
                        report: 0,
                        nhacnho: 0,
                        vipham:0,
                        bireport: 0,
                        tinnhan: 1,
                    });
                    return newUser.save().catch(err => console.log(err));
                }else{
                    result.tinnhan+=1;
                    return result.save().catch(err => console.log(err));  
                }
            }
        }
    });

    if(messageArray[0].slice(0,1) == prefix){
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot,message,args);
    }
});

bot.login("NjI5MjM2MjU5NjAwMjAzNzg4.XoRHug.2XmMexNvOINfOMsELeS3iVXjed0")//tokenfile.token);
