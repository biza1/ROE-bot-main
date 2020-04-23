<<<<<<< HEAD
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

=======
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

>>>>>>> 8e03a8b3ca7d06a340789af973750dbc322bb3b6
module.exports = mongoose.model("user",userSchema);