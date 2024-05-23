import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'




const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET

        })
    ],

    async session({session}) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = session._id.toString()
        return session

    },
    
    async signIn({profile}) {
         try {
            await connectToDB()

            // check if a user already exits
            const UserExists = await User.findOne({
                email: profile.email
            })

            // if not, create a new user
            if(!UserExists){
                 await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", '').toLowerCase(),
                    image: profile.picture
                 })
            }

            return true
         } catch (error){
            console.error(error)
         }
    }
})
export {handler as GET, handler as POST}