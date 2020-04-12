const Discord = require('discord.js');
const botconfig = require("./commands/botconfig.json");
const tokenfile = require("./token.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
var mongodb = require('mongodb');
bot.commands = new Discord.Collection();
var MongoClient = mongodb.MongoClient;
var url = 'mongodb+srv://sen:sen@data-2dbpw.gcp.mongodb.net/test';
var mongoose = require('mongoose');
const Mute = require('../models/mute.js');
mongoose.connect('mongodb+srv://sen:sen@data-2dbpw.gcp.mongodb.net/test',{ useUnifiedTopology: true ,useNewUrlParser: true});

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
          name: 'Ring of Elysium',
           type: 'PLAYING',
            url: "https://discordapp.com/"
		
       }
    });

//bot.user.setStatus('online','Ring of Elysium') 

	
});
MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);
    }
   
    var dbo = db.db("test");
bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    var mkdirp = require('mkdirp');
    var name = message.author.id;
    var noidungtext =message.author.username+'#'+message.author.discriminator+': '+messageArray.join(" "); 
    var channelGet = message.channel.name;
    fs.appendFileSync(`./commands/log/guild/${channelGet}`,noidungtext+"\n", function (err) {
    });
    console.log(message.channel.name+"|"+message.author.username+'#'+message.author.discriminator+': '+messageArray.join(" "));
    var query = { id: `${message.author.id}` };
    dbo.collection("ROE").find(query).toArray(function(err, result) {
        if (err)throw err;
        if(result[0] === undefined){
            var cnew = { id:`${query.id}`,bireport: 0,bireport: 0,nhacnho: 0,report: 0,tinnhan: 1,vipham:0}
            dbo.collection("ROE").insertOne(cnew, function(err, res) {
            if (err) throw err;    
            });
        }else{
            var newvalues = { $set: { tinnhan: result[0].tinnhan+1 } };
            dbo.collection("ROE").updateOne(query, newvalues, function(err, res) {
                if (err) throw err;                            
            }); 
        }      
    }); 


     
    var textH = ["địt","cặc","cặc","buồi","fuck","lồn"];
    var lowercase = messageArray.join(" ").toLowerCase();
    for(var x =0;x<6;x++){
            if(lowercase.indexOf(textH[x]) > -1){
                let checktuc = x===5&&lowercase.indexOf("lồn")===lowercase.indexOf("lồng")
                if(!checktuc){
                    dbo.collection("ROE").find(query).toArray(function(err, result) {
                        if (err)throw err;
                        var newvalues = { $set: { nhacnho: result[0].nhacnho+1 } };
                        dbo.collection("ROE").updateOne(query, newvalues, function(err, res) {
                            if (err) throw err;
                            var rd = Math.floor(Math.random()*4); 
                            fs.readFile(`./commands/log/tuc/${rd}`,'utf8',function(err,data){                                   
                                return message.reply(`\`${data}\``);
                            });                                
                        });        
                    });  
                    break;
                }else{
                        break;
                }                     
            }
    }
    setInterval(function(){ 
        Mute.find({
            __v: 0,
        },async function(err,result){
            if(err) return;
            if(result[0]===undefined) return;
            for(let x =0; x<result.length;x++){
                let today = new Date();
                let old = new Date(`${result[x].time}`);
                if((today-old)>=result[x].mutetime){
                    let mUser = message.guild.members.get(result[x].userID);
                    let muterole = message.guild.roles.find(`name`, "mute");
                    mUser.removeRole(muterole.id);
                    Mute.find({userID: mUser.id}).remove().exec();
                    let sendchannel =  message.guild.channels.find(`id`, "549109631234998273");
                    const embed = new Discord.RichEmbed()
                        .setAuthor("Unmute")
                        .addField(`:white_check_mark:`,`Unmute <@${mUser.id}>`,true)
                        .setColor("#0af58b")
                        .setFooter("Code by Sen")
                        .setTimestamp()
                    sendchannel.send(embed);
                    return message.channel.send(`Hết hiệu lực mute cho <@${mUser.id}>`);
                }
            }
        })
     }, 1000);


         
    if(messageArray[0].slice(0,1) == prefix){
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot,message,args);
    }
        
});
});
bot.login(tokenfile.token);

