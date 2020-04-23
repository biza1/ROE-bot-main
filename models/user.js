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

<<<<<<< HEAD
module.exports = mongoose.model("user",userSchema);
=======
module.exports = mongoose.model("user",userSchema);
>>>>>>> 2c9f57f9401a492151980f7a287f27b91ea145bb
