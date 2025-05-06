"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { mockUsers, mockPosts, mockSavedPosts, mockVotes } from "../data/mockData";
import Postx from "@/components/profile/Postx";
import { getTimeAgo } from "@/utils/dateFormat";
import Post from "@/app/(post)/components/post";
import UserPeakProfile from "@/app/(post)/components/UserPeakProfile";
import Page from "@/app/(post)/post/[slug]/page";

export default function SavedPosts() {
    const params = useParams();
    const username = params.username as string;
    const [savedPosts, setSavedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const currentUser = mockUsers.find((u) => u.username === username);
            
            if (!currentUser) {
                setLoading(false);
                return;
            }

            // Create a Set to track unique post IDs
            const uniquePostIds = new Set();

            const posts = mockSavedPosts
                .filter((saved) => saved.user_id === currentUser.p_id)
                .map((saved) => {
                    // Skip if we've already processed this post
                    if (uniquePostIds.has(saved.post_id)) {
                        return null;
                    }

                    const post = mockPosts.find((p) => p.p_id === saved.post_id);
                    if (!post) return null;

                    // Add post ID to our Set
                    uniquePostIds.add(saved.post_id);

                    const postAuthor = mockUsers.find((u) => u.p_id === post.user_id);
                    if (!postAuthor) return null;

                    const userVote = mockVotes.find(
                        (vote) => vote.post_id === post.p_id && vote.user_id === currentUser.p_id
                    );

                    return {
                        ...post,
                        user: postAuthor,
                        vote_type: userVote?.vote_type || null,
                        timeAgo: getTimeAgo(post.created_at),
                        saved_at: saved.saved_at // Keep track of when it was saved
                    };
                })
                .filter(Boolean)
                // Sort by saved date (most recent first)
                .sort((a, b) => new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime());

            setSavedPosts(posts);
        } catch (error) {
            console.error("Error fetching saved posts:", error);
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

    if (savedPosts.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">
                No saved posts found
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {savedPosts.map((post) => (
                <div key={post.p_id} className="border-b border-border pb-4">
                    {/* <Postx post={post} /> */} 
                    <Post/>  

                </div>
            ))}
        </div>
    );
}
  