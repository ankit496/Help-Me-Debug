import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/lib/connectDB";
import { authConfig } from "@/lib/auth.config";
import User from "@/lib/models/User"
import bcrypt from "bcryptjs"
const login=async(credentials)=>{
    connectDB()
    try{
        const user=await User.findOne({email:credentials.email});
        if(!user)
                throw new Error("Wrong Credentials");
        const isValidPassword=await bcrypt.compare(
            credentials.password,user.password
        )
        if(!isValidPassword)
            throw new Error("Wrong Credentials");
        return user
    }
    catch(error){
        throw new Error(error)
    }
}
const handler=NextAuth({
    ...authConfig,
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials){
                try{
                    const user=login(credentials)
                    return user;
                }
                catch(error){
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks:{
        async signIn({user,account,profile}){
            connectDB()
            try{
                const findUser=await User.findOne({email:user.email})
                console.log(user)
                if(!findUser){
                    const newUser=await User.create({
                        email:user.email,
                        username:user.name,
                        profilePic:user.image
                    })
                    user.id=newUser._id;
                }
                else{
                    user.id=findUser._id
                }
            }
            catch(error){
                throw new Error(error)
            }
            return true;
        },
        ...authConfig.callbacks
    },
})
export {handler as GET,handler as POST}