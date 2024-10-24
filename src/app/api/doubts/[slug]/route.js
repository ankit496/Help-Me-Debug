import connectDB from "@/lib/connectDB";
import Issue from "@/lib/models/Issue";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    let { slug } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1; 
    const limit = 4; 
    const sortParam = searchParams.get('sort') || 'Most popular'; // default to "Most popular"

    // Calculate the skip value
    const skip = (page - 1) * limit;

    try {
        connectDB();
        if (slug === 'Dsa') {
            slug = slug.split('').map(char => char.toUpperCase()).join('');
        }

        // Sorting logic based on the sortParam
        let sortCriteria = {};
        switch (sortParam) {
            case 'Most popular':
                sortCriteria = { createdAt: -1 }; // Sort by newest
                break;
            case 'Most discussed':
                sortCriteria = { comments: -1 }; // Sort by the number of comments (array length)
                break;
            case 'Most upvoted':
                sortCriteria = { votes: -1 }; // Sort by the number of upvotes
                break;
            default:
                sortCriteria = { createdAt: -1 }; // Default to "Most popular"
        }

        const posts = await Issue.find({ type: slug })
            .populate({
                path: 'userId',
                select: '-password' // Exclude the password field
            })
            .sort(sortCriteria) // Apply sorting
            .skip(skip)
            .limit(limit);

        const totalPosts = await Issue.countDocuments({ type: slug });

        return NextResponse.json({
            success: true,
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts,
            message: "Successfully fetched the posts",
        });
    } catch (err) {
        throw new Error(err);
    }
};

