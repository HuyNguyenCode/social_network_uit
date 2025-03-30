"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { mockUsers, mockPosts, mockComments } from "../data/mockData";
import { getTimeAgo } from "@/utils/dateFormat";
import Postx from "@/components/profile/Postx";

export default function UserComments() {
    const params = useParams();
    const username = params.username as string;
    const [userComments, setUserComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const currentUser = mockUsers.find((u) => u.username === username);
            
            if (!currentUser) {
                setLoading(false);
                return;
            }

            const comments = mockComments
                .filter((comment) => comment.user_id === currentUser.p_id)
                .map((comment) => {
                    const post = mockPosts.find((p) => p.p_id === comment.post_id);
                    if (!post) return null;

                    const postAuthor = mockUsers.find((u) => u.p_id === post.user_id);
                    if (!postAuthor) return null;

                    let parentCommentAuthor = null;
                    if (comment.parent_comment_id) {
                        const parentComment = mockComments.find(c => c.comment_id === comment.parent_comment_id);
                        if (parentComment) {
                            parentCommentAuthor = mockUsers.find(u => u.p_id === parentComment.user_id);
                        }
                    }

                    return {
                        ...post,
                        user: postAuthor,
                        timeAgo: getTimeAgo(post.created_at),
                        comment: {
                            id: comment.comment_id,
                            content: comment.content,
                            timeAgo: getTimeAgo(comment.created_at),
                            isReply: !!comment.parent_comment_id,
                            parentAuthor: parentCommentAuthor?.username
                        }
                    };
                })
                .filter(Boolean);

            setUserComments(comments);
        } catch (error) {
            console.error("Error fetching user comments:", error);
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

    if (userComments.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">
                No comments found
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {userComments.map((post) => (
                <div key={post.p_id} className="border rounded-lg border-border p-4">
                    <Postx post={post} />
                    <div className="mt-4 pl-4 border-l-2 border-border">
                        {post.comment.isReply ? (
                            <div className="text-sm text-muted-foreground">
                                Replied to @{post.comment.parentAuthor} • {post.comment.timeAgo}
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground">
                                Commented {post.comment.timeAgo}
                            </div>
                        )}
                        <div className="mt-2 text-sm">
                            {post.comment.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}