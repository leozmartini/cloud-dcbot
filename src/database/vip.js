const mongoose = require('mongoose');

const vipsDBSchema = new mongoose.Schema({
    userTAG: String,
    userID: String,
    VIP: String,
    VIPRoleID: String,
    Inicio: {
        type: Date,
        default: () => Date.now(),
    },
    Fim: {
        type: Date,
    },
});


module.exports = mongoose.model('vipsDB', vipsDBSchema);