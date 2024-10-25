"use server"
import bcrypt from 'bcryptjs';
import User from "@/lib/models/User"
import Issue from '@/lib/models/Issue';
import connectDB from './connectDB';
import { signIn } from 'next-auth/react';
const API = process.env.API

export const register = async (formData) => {
    const { username, email, password, confirm_password } = formData;

    if (password !== confirm_password) {
        return { error: "Passwords do not match" };
    }

    connectDB(); // Ensure you're awaiting the DB connection
    try {

        const user = await User.findOne({ email });
        if (user) {
            return { error: "Email already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return { success: true };
    } catch (err) {
        // console.error("Error saving user:", err);
        return { error: "Something went wrong!" };
    }
};

export const raiseIssue = async (formData) => {
    const { title, type, issue, userId } = formData;

    connectDB();

    try {
        const createdIssue = await Issue.create({ title, issue, type, userId });

        return { success: true, createdIssue };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const fetchIssue = async (field, page = 1, sortType) => {
    try {
        const res = await fetch(`${API}/api/doubts/${field}?page=${page}&sort=${sortType}`, { cache: 'no-cache' });
        const data = await res.json();
        return data;
    } catch (error) {
        return {error}
    }
};

export const fetchIssuebyId = async (field, id) => {
    const res = await fetch(`${API}/api/doubts/${field}/${id}`, { cache: 'no-cache' });
    if (!res.ok) {
        throw new Error("Failed to fetch issues");
    }
    const data = await res.json();
    return data;
};
export const addComment = async (userId, comment, field, id) => {
    const data = { userId, comment, field, id };
    const res = await fetch(`${API}/api/doubts/${field}/${id}`, {
        method: 'POST',
        body: JSON.stringify(data)
    }, { cache: 'no-cache' });
    const response = await res.json();
    return response;
}
export const addVote = async (field, id, vote) => {
    try {
        const data = { vote };
        const res = await fetch(`${API}/api/doubts/${field}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data)
        }, { cache: 'no-cache' });
        const response = await res.json();
        return response;
    }
    catch (error) {
        throw new Error(error);
    }
}
export async function compileCode(requestData) {
    try{
        //console.log("from the action",requestData)
        const res=await fetch(`${API}/api/compiler`,{
            method:"POST",
            body:JSON.stringify(requestData)
        })
        const response=await res.json();
        //console.log(response);
        return response;
    }
    catch(error){
        throw new Error(error);
    }
}
