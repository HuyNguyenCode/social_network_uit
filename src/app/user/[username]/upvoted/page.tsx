"use client";
import { useState, useEffect } from "react";
import PostComponent from "@/app/(post)/components/PostComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUpVotePostById } from "@/redux/postSlice";
import { useParams } from "next/navigation";
import { fetchUserByUsername } from "@/redux/userSlice";

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
  const { username } = useParams();

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

  const { userInforByUN } = useSelector((state: RootState) => state.user);
  const [userId, setUserId] = useState<string | undefined>();
  useEffect(() => {
    if (typeof username === "string") {
      dispatch(fetchUserByUsername(username));
    } else if (Array.isArray(username) && username.length > 0) {
      dispatch(fetchUserByUsername(username[0]));
    }
  }, [username]);

  useEffect(() => {
    setUserId(userInforByUN?.id);
  }, [userInforByUN]);

  useEffect(() => {
    if (userId) {
      dispatch(getUpVotePostById(userId));
    }
  }, [userId, dispatch]);
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
      {upvotedPosts.map((post, index) => (
        <div key={index} className="border-b border-border pb-4">
          <PostComponent post={{ ...post }} />
        </div>
      ))}
    </div>
  );
}
