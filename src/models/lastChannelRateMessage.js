import mongoose from 'mongoose';

const lastChannelRateMessageSchema = new mongoose.Schema({
    messageId: String
})

export const LastChannelRateMessage = mongoose.model('lastChannelRateMessage', lastChannelRateMessageSchema)