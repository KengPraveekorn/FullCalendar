const mongoose = require('mongoose')


const evnetSchema = mongoose.Schema({
    title:{
        type: String
    },
    filename:{
        type: String
    },
    start:{
        type: Date
    },
    end:{
        type: Date
    },
    color:{
        type: String
    },
    allDay:{
        type: Boolean,
        default: true
    },
    PIC:{
        type: String
    },
    Lotno:{
        type: String
    },
    Machine:{
        type: String
    },
    TroubleCT:{
        type: String
    },

},{timestamps: true})

module.exports = Events = mongoose.model('events',evnetSchema)