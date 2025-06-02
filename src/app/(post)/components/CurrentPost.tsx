"use client";
import OutputFile from "@/app/(post)/create-post/outputFile";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import styles from "../../(home)/home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
type VoteType = {
  userId: string;
  voteType: number | string;
};
interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdOn?: string;
    createdBy?: string;
    username?: string;
    upvoteCount: number;
    downvoteCount: number;
    commentCount?: number;
    userAvatar?: string;
    comments?: any[];
    postImages?: any[];
    votes?: VoteType[]; // Add this line
    // Thêm các trường khác nếu cần
  };
}

const CurrentPost = ({ post }: PostProps) => {
  dayjs.extend(relativeTime);

  return (
    <div className={cx("recent-post")}>
      <div className={cx("recent-post-header")}>
        <div className="w-6 h-6 rounded-full position-relative" style={{ position: "relative" }}>
          {post?.userAvatar ? (
            <OutputFile imageID={post?.userAvatar ?? ""} />
          ) : (
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"
              alt="avatar"
              className="w-12 h-12 rounded-full"
              width={48}
              height={48}
              style={{ height: "100%" }}
            />
          )}
        </div>
        <span className={cx("name")}>{post.username}</span>
      </div>
      <div className={cx("recent-post-content")}>
        {post.postImages && post?.postImages.length > 0 ? (
          <div className={cx("recent-post-with-img")}>
            <div className={cx("left-content-recent-post")}>
              <span className={cx("post-title")}>{post.title}</span>
              <p className={cx("post-content")}>{post.content}</p>
            </div>
            <div className={cx("right-content-recent-post")}>
              <OutputFile imageID={post?.postImages[0].imageID ?? []} />
            </div>
          </div>
        ) : (
          <div className={cx("recent-post-wihtout-img")}>
            <div className={cx("left-content-recent-post")}>
              <span className={cx("post-title")}>{post.title}</span>
              <p className={cx("post-content")}>{post.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentPost;
