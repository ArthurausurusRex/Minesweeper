'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ScoreSchema = new Schema({
    player: {
        type: String,
        required: 'Who are you ?'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    value: {
        type: Int,
        required: 'What is your score ?'
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);