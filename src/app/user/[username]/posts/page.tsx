"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { mockUsers, mockPosts } from "../data/mockData";
// import Postx from "@/components/profile/Postx";
import { getTimeAgo } from "@/utils/dateFormat";
import Post from "@/app/(post)/components/post";

export default function UserPosts() {
    const params = useParams();
    const username = params.username as string;
    const [userPosts, setUserPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            // Find the current user
            const user = mockUsers.find((u) => u.username === username);
            
            if (!user) {
                setLoading(false);
                return;
            }

            // Filter posts to only show posts created by this user
            const posts = mockPosts
                .filter((post) => post.user_id === user.p_id) // Only get posts where user is the author
                .map((post) => ({
                    ...post,
                    user: user, // Add user info to each post
                    timeAgo: getTimeAgo(post.created_at)
                }));

            setUserPosts(posts);
        } catch (error) {
            console.error("Error fetching user posts:", error);
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

    if (userPosts.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">
                No posts found
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {userPosts.map((post) => (
                <div key={post.p_id} className="border-b border-border pb-4">
                    {/* <Postx post={post} /> */}
                    <Post/>
                </div>
            ))}
        </div>
    );
}