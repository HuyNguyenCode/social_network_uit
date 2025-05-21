"use client";
import { useParams } from "next/navigation"; // Sử dụng useParams
import { mockUsers, mockPosts, mockVotes } from "../data/mockData";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getDownVotePostById } from "@/redux/postSlice";
import { useUserStore } from "@/store/useUserStore";

const DownvotedPosts = () => {
  const params = useParams(); // Lấy params từ URL
  const username = params.username as string; // Lấy username từ params

  const [loading, setLoading] = useState(true);

  const { userId } = useUserStore(); // Lấy thông tin từ store

  const dispatch = useDispatch<AppDispatch>();
  const { downvotedPosts } = useSelector((state: RootState) => state.post);
  useEffect(() => {
    try {
      const currentUser = mockUsers.find((u) => u.username === username);

      if (!currentUser) {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error fetching downvoted posts:", error);
    } finally {
      setLoading(false);
    }
  }, [username]);

    useEffect(() => {
      if (userId) {
        dispatch(getDownVotePostById(userId));
      }
    }, [username, dispatch]);
    console.log("upvotedPost:", downvotedPosts); // Debug log

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }


  if (!Array.isArray(downvotedPosts) || downvotedPosts.length === 0) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">No downvoted posts found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {downvotedPosts.map((post) => (
        <div key={post.p_id} className="border-b border-border pb-4">
          {/* <Postx post={post} /> */}
        </div>
      ))}
    </div>
  );
};

export default DownvotedPosts;
