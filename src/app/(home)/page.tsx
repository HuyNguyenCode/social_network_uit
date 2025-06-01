"use client";
import Image from "next/image";
import styles from "./home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/app/(home)/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getHomePost } from "@/redux/postSlice";
// import Post from "@/app/(post)/components/Post";

const cx = classNames.bind(styles);
export default function Home() {
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth as { user: any });

  useEffect(() => {
    if (!user) {
      router.push("/auth"); // Chuyển hướng nếu chưa đăng nhập
    }
  }, [user, router]);

  if (!user) return null; // Tránh hiển thị nội dung khi đang redirect

  const dispatch = useDispatch<AppDispatch>();
  const { homePosts } = useSelector((state: RootState) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Có thể điều chỉnh
  // useEffect(() => {
  //   dispatch(
  //     getHomePost({
  //       page: currentPage,
  //       pageSize,
  //     }),
  //   );
  // }, [dispatch]);

  return (
    <div className={cx("home-wrapper")}>
      <div className={cx("container")}>
        <div className={cx("home-content")}>
          <Sidebar />
          {/* <div className={cx("middle-content")}>
            {homePosts &&
              Array.isArray(homePosts) &&
              homePosts.map((post) => (
                <div key={post.id} className="border-b border-border pb-4">
                  <Post post={{ ...post }} />
                </div>
              ))}
          </div> */}
          <div className={cx("right-content")}>
            <div className={cx("recent-post-header")}>
              <span className={cx("recent-post-header-text")}>Recent Posts</span>
              <span className={cx("recent-post-header-clear")}>Clear</span>
            </div>
            <div className={cx("recent-post")}>
              <div className={cx("recent-post-header")}>
                <div className={cx("avatar")}>
                  <Image src="/avatar.jpg" alt="avatar" width={24} height={24} className={cx("avatar-image")}></Image>
                </div>
                <span className={cx("name")}>s/tiktokcringe</span>
              </div>
              <div className={cx("recent-post-content")}>
                <div className={cx("recent-post-with-img")}>
                  <div className={cx("left-content-recent-post")}>
                    <span className={cx("post-title")}>
                      Guy with fear of heights gets the courage make it to the cliffside view
                    </span>
                    <p className={cx("post-content")}>
                      https://www.slothui.com/guy-with-fear-of-heights-gets-the-courage-to-make-if
                    </p>
                  </div>
                  <div className={cx("right-content-recent-post")}>
                    <Image src="/post-img.jpg" width={200} height={200} alt="avatar" className={cx("avatar-image")}></Image>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("recent-post")}>
              <div className={cx("recent-post-header")}>
                <div className={cx("avatar")}>
                  <Image src="/avatar.jpg" width={24} height={24} alt="avatar" className={cx("avatar-image")}></Image>
                </div>
                <span className={cx("name")}>s/anime</span>
              </div>
              <div className={cx("recent-post-content")}>
                <span className={cx("post-title")}>Best anime for gen Z</span>
                <p className={cx("post-content")}>
                  I like movies where they start out in a way that you think you're in for a typical movie where you have a pretty
                  good idea how{" "}
                </p>
              </div>
            </div>
            {/* <div className={cx("recent-post")}></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
