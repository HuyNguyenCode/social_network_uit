"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { mockUsers, mockPosts, mockComments } from "../data/mockData";
import { getTimeAgo } from "@/utils/dateFormat";
import Postx from "@/components/profile/Postx";

import { useDispatch, useSelector } from "react-redux";
import { getCommentWithId } from "@/redux/commentSlice";

import { useUserStore } from "@/store/useUserStore";

import { AppDispatch, RootState } from "@/redux/store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
export default function UserComments() {
  const params = useParams();
  const username = params.username as string;
  const [userComments, setUserComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const { comments } = useSelector((state: RootState) => state.comment);

  const { userId } = useUserStore(); // Lấy thông tin từ store
  useEffect(() => {
    if (userId) {
      dispatch(
        getCommentWithId({
          userId: userId as string,
        }),
      );
    }
  }, [username, dispatch]);

  useEffect(() => {
    try {
      //   const currentUser = mockUsers.find((u) => u.username === username);

      //   if (!currentUser) {
      //     setLoading(false);
      //     return;
      //   }

      //   const comments = mockComments
      //     .filter((comment) => comment.user_id === currentUser.p_id)
      //     .map((comment) => {
      //       const post = mockPosts.find((p) => p.p_id === comment.post_id);
      //       if (!post) return null;

      //       const postAuthor = mockUsers.find((u) => u.p_id === post.user_id);
      //       if (!postAuthor) return null;

      //       let parentCommentAuthor = null;
      //       if (comment.parent_comment_id) {
      //         const parentComment = mockComments.find((c) => c.comment_id === comment.parent_comment_id);
      //         if (parentComment) {
      //           parentCommentAuthor = mockUsers.find((u) => u.p_id === parentComment.user_id);
      //         }
      //       }

      //       return {
      //         ...post,
      //         user: postAuthor,
      //         timeAgo: getTimeAgo(post.created_at),
      //         comment: {
      //           id: comment.comment_id,
      //           content: comment.content,
      //           timeAgo: getTimeAgo(comment.created_at),
      //           isReply: !!comment.parent_comment_id,
      //           parentAuthor: parentCommentAuthor?.username,
      //         },
      //       };
      //     })
      //     .filter(Boolean);

      setUserComments(Array.isArray(comments) ? comments.filter(Boolean) : []);
    } catch (error) {
      console.error("Error fetching user comments:", error);
    } finally {
      setLoading(false);
    }
  }, [username]);
  console.log("userComments", userComments);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  console.log("comments", comments);

  if (comments === null) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">No comments found</div>;
  }
  dayjs.extend(relativeTime);
  return (
    <div className="p-4 space-y-4">
      {Array.isArray(comments) &&
        comments.map((comment) => (
          <div key={comment.id} className="border rounded-lg border-border p-4">
            {/* <Postx post={post} /> */}
            <div className="mt-4 pl-4 border-l-2 border-border">
              {comment.childComments.length > 0 ? (
                <div className="text-sm text-muted-foreground">
                  Replied to @{comment.parentCommentId} • {dayjs(comment.createdOn).fromNow()}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Commented {dayjs(comment.createdOn).fromNow()}</div>
              )}
              <div className="mt-2 text-sm">{comment.content}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
