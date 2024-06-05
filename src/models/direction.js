import mongoose from 'mongoose';

const directionSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    marginPercentBuy: { type: String},
    marginSecondPercentBuy: {type: String},
    marginPercentSell: {type: String},
    divisor: {type: String},
    description: {type: String}
})

export const Direction = mongoose.model('Direction', directionSchema)
