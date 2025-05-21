"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { getTimeAgo } from "@/utils/dateFormat";
import Post from "@/app/(post)/components/post";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUpVotePostById } from "@/redux/postSlice";
import { useUserStore } from "@/store/useUserStore";

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, username } = useUserStore(); // Lấy thông tin từ store

  const dispatch = useDispatch<AppDispatch>();
  const { upvotedPosts } = useSelector((state: RootState) => state.post);
  useEffect(() => {
    try {
      // Find the current user (who is viewing their upvoted posts)

      console.log("Current user:", username); // Debug log

      if (!username) {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error fetching upvoted posts:", error);
      setError("An error occurred while fetching upvoted posts.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (userId) {
      dispatch(getUpVotePostById(userId));
    }
  }, [username, dispatch]);
  console.log("upvotedPost:", upvotedPosts); // Debug log

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-red-500">{error}</div>;
  }

  if (!Array.isArray(upvotedPosts) || upvotedPosts.length === 0) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">No upvoted posts found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {upvotedPosts.map((post) => (
        <div key={post.p_id} className="border-b border-border pb-4">
          <Post post={{ ...post, timeAgo: getTimeAgo(post.createdOn) }} />
        </div>
      ))}
    </div>
  );
}
