import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import mongoose from "mongoose";
import {Setting} from "@/models/Setting";

export default async function handle(req, res) {
    await mongooseConnect();
    await isAdminRequest(req, res);
    
    if (req.method === 'PUT') {
        const {name, value} = req.body;
        const settingDoc = await Setting.findOne({name});
        
        if (settingDoc) {
            settingDoc.value = value;
            await settingDoc.save();
        } else {
            await Setting.create({name, value});
        }
    }
}
