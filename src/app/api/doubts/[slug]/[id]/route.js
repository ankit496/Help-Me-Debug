import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Issue from "@/lib/models/Issue";
import Comments from "@/lib/models/Comment";
export const GET = async (request, { params }) => {
    let { slug, id } = params;
    if (slug === 'Dsa') {
        slug = slug.split('').map(char => char.toUpperCase()).join('');
    }
    try {
        connectDB();
        const posts = await Issue
            .find({ type: slug, _id: id })
            .populate({
                path: 'userId',
                select: '-password' // Exclude the password field
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: '-password' // Exclude the password field in comments
                }
            });
        return NextResponse.json({ success: true, posts, message: "Successfully fetched the post" });
    } catch (err) {
        return NextResponse.json({success:false,error:err.message})
    }
}

export const POST=async(request,{params})=>{
    try{
        const body=await request.json()
        const {userId,comment,id}=body;
        const new_comment=await Comments.create({userId:userId,comment:comment});
        const existingIssue=await Issue.findById(id);
        if(!existingIssue.comments)
            existingIssue.comments=[new_comment._id];
        else
            existingIssue.comments.push(new_comment._id);
        existingIssue.save()
        return NextResponse.json({success:true,message:"Successfully added comment"})
    }
    catch(err){
        return NextResponse.json({success:false,error:err.message})
    }
}
export const PATCH = async (request, { params }) => {
    try {
        const body = await request.json();
        const {id}=params
        const {vote } = body;
        connectDB();
        const existingIssue = await Issue.findById(id);
        if (!existingIssue) {
            return NextResponse.json({ success: false, message: "Issue not found" }, { status: 404 });
        }
        const int_vote = parseInt(vote);
        
        // Update the votes
        existingIssue.votes += int_vote;
        
        // Save the updated issue
        await existingIssue.save();
        
        return NextResponse.json({ success: true, message: "Successfully updated vote" });
    } catch (err) {
        return NextResponse.json({ success: false, error:err.message });
    }
};
