var mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role: String,
    leader: String,
});

module.exports = mongoose.model("team",teamSchema);
