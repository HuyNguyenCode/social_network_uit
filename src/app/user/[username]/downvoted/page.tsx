"use client";
import { useParams } from 'next/navigation'; // Sử dụng useParams
import { mockUsers, mockPosts, mockVotes } from "../data/mockData";
import { useEffect, useState } from 'react';
import Postx from "@/components/profile/Postx";
import { getTimeAgo } from "@/utils/dateFormat";

const DownvotedPosts = () => {
    const params = useParams(); // Lấy params từ URL
    const username = params.username as string; // Lấy username từ params
    const [downvotedPosts, setDownvotedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const currentUser = mockUsers.find((u) => u.username === username);
            
            if (!currentUser) {
                setLoading(false);
                return;
            }

            const posts = mockVotes
                .filter((vote) => 
                    vote.user_id === currentUser.p_id && 
                    vote.vote_type === 0  // For downvotes
                )
                .map((vote) => {
                    const post = mockPosts.find((p) => p.p_id === vote.post_id);
                    if (!post) return null;

                    // Find the original post author
                    const postAuthor = mockUsers.find((u) => u.p_id === post.user_id);
                    if (!postAuthor) return null;

                    return {
                        ...post,
                        user: postAuthor, // Use the original post author
                        vote_type: vote.vote_type,
                        timeAgo: getTimeAgo(post.created_at)
                    };
                })
                .filter(Boolean);

            setDownvotedPosts(posts);
        } catch (error) {
            console.error("Error fetching downvoted posts:", error);
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

    if (downvotedPosts.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">
                No downvoted posts found
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {downvotedPosts.map((post) => (
                <div key={post.p_id} className="border-b border-border pb-4">
                    <Postx post={post} />
                </div>
            ))}
        </div>
    );
};

export default DownvotedPosts;