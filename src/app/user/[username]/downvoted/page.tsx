"use client";
import { useEffect, useState } from "react";
import PostComponent from "@/app/(post)/components/PostComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getDownVotePostById } from "@/redux/postSlice";
import { useParams } from "next/navigation";
import { fetchUserByUsername } from "@/redux/userSlice";
const DownvotedPosts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { username } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { downvotedPosts } = useSelector((state: RootState) => state.post);
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
      dispatch(getDownVotePostById(userId));
    }
  }, [userId, dispatch]);

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

  if (!Array.isArray(downvotedPosts) || downvotedPosts.length === 0) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">No upvoted posts found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {downvotedPosts.map((post) => (
        <div key={post.p_id} className="border-b border-border pb-4">
          <PostComponent post={{ ...post }} />
        </div>
      ))}
    </div>
  );
};

export default DownvotedPosts;
