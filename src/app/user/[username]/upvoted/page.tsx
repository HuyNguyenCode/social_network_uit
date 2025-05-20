"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserVotedPosts } from "@/redux/postSlice";
import { getTimeAgo } from "@/utils/dateFormat";
import Post from "@/app/(post)/components/post";
import { AppDispatch, RootState } from "@/redux/store";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";

export default function UpvotedPosts() {
  const params = useParams();
  const username = params.username as string;
  const { userId } = useUserStore();
  const dispatch = useDispatch<AppDispatch>();
  const { votedPosts, loading, error } = useSelector((state: RootState) => state.post);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (userId) {
      dispatch(
        getUserVotedPosts({
          userId: userId as string,
          voteType: "upvote",
        }),
      );
    }
  }, [userId, dispatch, currentPage]);

  // Debug logging
  useEffect(() => {
    if (votedPosts) {
      console.log("Received upvoted posts data:", votedPosts);
    }
  }, [votedPosts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-destructive">{error}</div>;
  }

  if (!votedPosts?.length) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">No upvoted posts found</div>;
  }

  return (
    <div className="space-y-4">
      {/* Danh sách bài viết */}
      <div className="space-y-4">
        {votedPosts.map((post) => (
          <div key={post.id} className="border-b border-border pb-4">
            <Post
              post={{
                id: post.id,
                title: post.title || "Untitled Post",
                content: post.content || "",
                createdOn: post.createdOn || new Date().toISOString(),
                username: post.username || "Unknown User",
                upvoteCount: post.upvoteCount || 0,
                downvoteCount: post.downvoteCount || 0,
                timeAgo: getTimeAgo(post.createdOn),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
