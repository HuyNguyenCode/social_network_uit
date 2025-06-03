"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentWithId } from "@/redux/commentSlice";
import { fetchUserByUsername } from "@/redux/userSlice";
import CommentWithReply from "@/app/(post)/components/CommentWithReply";
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

  const { userInforByUN } = useSelector((state: RootState) => state.user);
  const [userId, setUserId] = useState<string | undefined>();
  useEffect(() => {
    if (typeof username === "string") {
      dispatch(fetchUserByUsername(username));
    } else if (Array.isArray(username) && username > 0) {
      dispatch(fetchUserByUsername(username[0]));
    }
  }, [username]);

  useEffect(() => {
    setUserId(userInforByUN?.id);
  }, [userInforByUN]);

  useEffect(() => {
    if (userId) {
      dispatch(
        getCommentWithId({
          userId: userId as string,
        }),
      );
    }
  }, [userId, dispatch]);
  useEffect(() => {
    try {
      setUserComments(Array.isArray(comments) ? comments.filter(Boolean) : []);
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

  if (comments === null) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">No comments found</div>;
  }

  dayjs.extend(relativeTime);

  return (
    <div className="p-4 space-y-4">
      {Array.isArray(comments) && comments.map((comment) => <CommentWithReply comment={comment} key={comment.id} />)}
    </div>
  );
}
