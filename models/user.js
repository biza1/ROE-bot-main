var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    report: Number,
    nhacnho: Number,
    vipham:Number,
    bireport: Number,
    tinnhan: Number,
});

module.exports = mongoose.model("user",userSchema);