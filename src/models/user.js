import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    username: { type: String},
    role: {type: String, required: true},
    creationTime: { type: Date, default: Date.now, required: true}
})

export const User = mongoose.model('User', userSchema)
