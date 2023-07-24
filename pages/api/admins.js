import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {Admin} from "@/models/Admin";

export default async function handle(req, res) {
    await mongooseConnect();
    await isAdminRequest(req, res);
    
    if (req.method === 'POST') {
        const {email} = req.body;
        res.json(await Admin.create({email}));
    }
}