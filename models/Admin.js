import {model, models, Schema} from "mongoose";

const adminSchema = new Schema({
    email: {type: String, required: true, unique: true},
})

export const Admin = models?.Admin || model('Admin', adminSchema);
