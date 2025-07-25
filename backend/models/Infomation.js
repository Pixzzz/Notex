const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InformationSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    dateCreated:{type: Date, default: Date.now()},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})
    
module.exports = mongoose.model('Information', InformationSchema);