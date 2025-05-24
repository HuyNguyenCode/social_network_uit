// "use client";
// import Image from "next/image";
// import styles from "../../home.module.scss";
// import classNames from "classnames/bind";
// const cx = classNames.bind(styles);
// import Sidebar from "@/app/(home)/sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { getPopularPost } from "@/redux/postSlice";
// import { useEffect, useState, useRef } from "react";
// import Post from "@/app/(post)/components/post";
// import { getTimeAgo } from "@/utils/dateFormat";
// export default function Popularage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { popularPosts } = useSelector((state: RootState) => state.post);
//   const lastPostElementRef = useRef<HTMLDivElement | null>(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10; // Có thể điều chỉnh

//   useEffect(() => {
//     dispatch(
//       getPopularPost({
//         page: currentPage,
//         pageSize,
//       }),
//     );
//   }, [dispatch, currentPage]);
//   console.log("popularPosts", popularPosts);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setCurrentPage((prev) => prev + 1);
//         }
//       },
//       {
//         threshold: 1,
//       },
//     );

//     if (lastPostElementRef.current) {
//       observer.observe(lastPostElementRef.current);
//     }

//     return () => {
//       if (lastPostElementRef.current) {
//         observer.unobserve(lastPostElementRef.current);
//       }
//     };
//   }, [popularPosts]);

//   return (
//     <div className={cx("home-wrapper")}>
//       <div className={cx("container")}>
//         <div className={cx("home-content")}>
//           <Sidebar />
//           <div className={cx("middle-content")}>
//             {popularPosts &&
//               popularPosts.map((post, index) => {
//                 const isLastPost = index === popularPosts.length - 1;
//                 return (
//                   <div key={post.id} ref={isLastPost ? lastPostElementRef : null} className="border-b border-border pb-4">
//                     <Post post={{ ...post, userAvatar: post.userAvatar ?? undefined, timeAgo: getTimeAgo(post.createdOn) }} />
//                   </div>
//                 );
//               })}
//           </div>
//           <div className={cx("right-content")}>
//             <div className={cx("recent-post-header")}>
//               <span className={cx("recent-post-header-text")}>Recent Posts</span>
//               <span className={cx("recent-post-header-clear")}>Clear</span>
//             </div>
//             <div className={cx("recent-post")}>
//               <div className={cx("recent-post-header")}>
//                 <div className={cx("avatar")}>
//                   <Image src="/avatar.jpg" alt="avatar" width={24} height={24} className={cx("avatar-image")}></Image>
//                 </div>
//                 <span className={cx("name")}>s/tiktokcringe</span>
//               </div>
//               <div className={cx("recent-post-content")}>
//                 <div className={cx("recent-post-with-img")}>
//                   <div className={cx("left-content-recent-post")}>
//                     <span className={cx("post-title")}>
//                       Guy with fear of heights gets the courage make it to the cliffside view
//                     </span>
//                     <p className={cx("post-content")}>
//                       https://www.slothui.com/guy-with-fear-of-heights-gets-the-courage-to-make-if
//                     </p>
//                   </div>
//                   <div className={cx("right-content-recent-post")}>
//                     <Image src="/post-img.jpg" width={200} height={200} alt="avatar" className={cx("avatar-image")}></Image>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={cx("recent-post")}>
//               <div className={cx("recent-post-header")}>
//                 <div className={cx("avatar")}>
//                   <Image src="/avatar.jpg" width={24} height={24} alt="avatar" className={cx("avatar-image")}></Image>
//                 </div>
//                 <span className={cx("name")}>s/anime</span>
//               </div>
//               <div className={cx("recent-post-content")}>
//                 <span className={cx("post-title")}>Best anime for gen Z</span>
//                 <p className={cx("post-content")}>
//                   I like movies where they start out in a way that you think you're in for a typical movie where you have a pretty
//                   good idea how{" "}
//                 </p>
//               </div>
//             </div>
//             <div className={cx("recent-post")}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularPost } from "@/redux/postSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Sidebar from "@/app/(home)/sidebar";
import Post from "@/app/(post)/components/post";
import { getTimeAgo } from "@/utils/dateFormat";
import classNames from "classnames/bind";
import styles from "../../home.module.scss";

const cx = classNames.bind(styles);

export default function PopularPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { popularPosts, loading } = useSelector((state: RootState) => state.post);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 10;

  // Gọi API khi page thay đổi
  useEffect(() => {
    dispatch(getPopularPost({ page, pageSize }));
  }, [page, dispatch]);
  console.log("page: ", page);
  console.log("popularPosts:", popularPosts);
  // Tạo observer khi scroll tới cuối
  const handleObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && popularPosts && page < popularPosts.pages) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, popularPosts, page],
  );

  // Gắn observer vào post cuối
  useEffect(() => {
    if (lastPostRef.current) {
      handleObserver(lastPostRef.current);
    }
  }, [popularPosts?.items, handleObserver]);

  return (
    <div className={cx("home-wrapper")}>
      <div className={cx("container")}>
        <div className={cx("home-content")}>
          <Sidebar />
          <div className={cx("middle-content")}>
            {popularPosts?.items?.length ? (
              <>
                {popularPosts.items.map((post, index) => {
                  const isLastPost = index === popularPosts.items.length - 1;
                  return (
                    <div key={index} ref={isLastPost ? lastPostRef : null} className="border-b border-border pb-4">
                      <Post
                        post={{
                          ...post,
                          userAvatar: post.userAvatar ?? undefined,
                          timeAgo: getTimeAgo(post.createdOn),
                        }}
                      />
                    </div>
                  );
                })}
                {loading && <div className="text-center text-gray-500 py-2">Đang tải thêm bài viết...</div>}
              </>
            ) : (
              <div className="text-gray-500 text-sm text-center py-4">Không có bài viết nào.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
