"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { mockUsers, mockPosts, mockVotes } from "../data/mockData";
import Postx from "@/components/profile/Postx";
import { getTimeAgo } from "@/utils/dateFormat";
import Post from '@/app/(post)/components/post';

// Define proper types to match your Postx component's expectations
interface User {
    p_id: string;
    username: string;
    avatar_url: string;
    // Add other user properties your component needs
}

interface Post {
    p_id: string;
    title: string;
    content: string;
    user_id: string;
    created_at: string;
    vote_type?: number;
    user?: User;
    avatar_url?: string;
    // Add other post properties your component needs
}

export default function UpvotedPosts() {
    const params = useParams();
    const username = params.username as string;
    const [upvotedPosts, setUpvotedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            // Find the current user (who is viewing their upvoted posts)
            const currentUser = mockUsers.find((u) => u.username === username);
            console.log("Current user:", currentUser); // Debug log
            
            if (!currentUser) {
                setLoading(false);
                return;
            }

            // Get all posts this user has upvoted
            const posts = mockVotes
                .filter((vote) => 
                    vote.user_id === currentUser.p_id && 
                    vote.vote_type === 1
                )
                .map((vote) => {
                    // Find the original post
                    const post = mockPosts.find((p) => p.p_id === vote.post_id);
                    if (!post) return null;

                    // Find the original post author
                    const postAuthor = mockUsers.find((u) => u.p_id === post.user_id);
                    console.log("Post author:", postAuthor); // Debug log

                    if (!postAuthor) return null;

                    return {
                        ...post,
                        user: postAuthor, // Use the original post author
                        vote_type: vote.vote_type,
                        timeAgo: getTimeAgo(post.created_at)
                    };
                })
                .filter(Boolean);

            console.log("Processed posts:", posts); // Debug log
            setUpvotedPosts(posts);
        } catch (error) {
            console.error("Error fetching upvoted posts:", error);
            setError("An error occurred while fetching upvoted posts.");
        } finally {
            setLoading(false);
        }
    }, [username]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px] p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[200px] p-4 text-red-500">
                {error}
            </div>
        );
    }

    if (upvotedPosts.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">
                No upvoted posts found
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {upvotedPosts.map((post) => (
                <div key={post.p_id} className="border-b border-border pb-4">
                    {/* <Postx post={post} /> */}
                    <Post/>
                </div>
            ))}
        </div>
    );
}