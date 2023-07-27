import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import {Admin} from "@/models/Admin";

async function isAdminEmail(email) {
    try {
        const admin = await Admin.findOne({ email });
        return !!admin; // Return true if admin is found, false otherwise
    } catch (error) {
        console.error('Error checking if email is admin:', error);
        throw new Error('Server Error'); // Throw an error to be handled by the calling function
    }
}

export const authOptions = {
    secret: process.env.SECRET,
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session : async ({session, account, user}) => {
            if (await isAdminEmail(session?.user?.email)) {
                return session;
            } else {
                return false;
            }
        }
    }
};
export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (!(await isAdminEmail(session?.user?.email))) {
        res.status(401);
        res.end();
        throw 'not an admin';
    }
}
