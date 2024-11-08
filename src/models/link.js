import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    link: {type: String, required: true}
})

export const Link = mongoose.model("Link", linkSchema)