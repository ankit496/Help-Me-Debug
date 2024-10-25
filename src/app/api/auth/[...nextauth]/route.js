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
               return {error:"Wrong credentials"};
        const isValidPassword=await bcrypt.compare(
            credentials.password,user.password
        )
        if(!isValidPassword)
            return {error:"Wrong credentials"}
        return user
    }
    catch(error){
        return {error:error.message}
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
                    return {error:error.message};
                }
            }
        })
    ],
    callbacks:{
        async signIn({user,account,profile}){
            connectDB()
            try{
                const findUser=await User.findOne({email:user.email})
                //console.log(user)
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
                return {error:error.message}
            }
            return true;
        },
        ...authConfig.callbacks
    },
})
export {handler as GET,handler as POST}