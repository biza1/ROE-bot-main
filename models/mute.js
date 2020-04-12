var mongoose = require('mongoose');

const muteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    lydo: String,
    userMute:String,
    mutetime:Number,
    time:Date,
});

module.exports = mongoose.model("roe_mute",muteSchema);