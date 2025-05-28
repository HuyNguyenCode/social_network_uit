"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostWithId } from "@/redux/postSlice";
import { getTimeAgo } from "@/utils/dateFormat";
import Post from "@/app/(post)/components/post";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/redux/store";

// export default function UserPosts() {
//   const { userId } = useUserStore(); // Lấy thông tin từ store
//   const dispatch = useDispatch();
//   const { posts, loading, error } = useSelector((state) => state.post);

//   useEffect(() => {
//     // Giả sử username chính là userId (nếu không cần API để chuyển đổi)
//     dispatch(getPostWithId({ userId: userId as string, page: 1, pageSize: 10 }));
//   }, [userId, dispatch]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!posts?.items?.length) {
//     return <div>Người dùng chưa có bài viết nào</div>;
//   }

//   return (
//     <div>
//       {posts.items.map((post) => (
//         <Post
//           key={post.id}
//           post={{
//             ...post,
//             timeAgo: getTimeAgo(post.createdOn) // Format ngày
//           }}
//         />
//       ))}
//     </div>
//   );
// }

export default function UserPosts() {
  const { username } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.post);

  // State quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Có thể điều chỉnh
  const { userId } = useUserStore(); // Lấy thông tin từ store
  // console.log("posts", posts);

  useEffect(() => {
    if (userId) {
      dispatch(
        getPostWithId({
          userId: userId as string,
          page: currentPage,
          pageSize,
        }),
      );
    }
  }, [username, currentPage, dispatch]);

  const handleNextPage = () => {
    if (posts && currentPage < posts.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[200px] p-4 text-destructive">Error: {error}</div>;
  }

  if (!posts?.items?.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4 text-muted-foreground">
        Người dùng chưa có bài viết nào
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Danh sách bài viết */}
      <div className="space-y-4">
        {posts.items.map((post) => (
          <div key={post.id} className="border-b border-border pb-4">
            <Post post={{ ...post, userAvatar: post.userAvatar ?? undefined, timeAgo: getTimeAgo(post.createdOn) }} />
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {posts.pages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" disabled={currentPage === 1} onClick={handlePrevPage}>
            Trang trước
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, posts.pages) }, (_, i) => {
              let pageNum;
              if (posts.pages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= posts.pages - 2) {
                pageNum = posts.pages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button variant="outline" disabled={currentPage >= posts.pages} onClick={handleNextPage}>
            Trang sau
          </Button>
        </div>
      )}

      {/* Hiển thị thông tin phân trang */}
      <div className="text-sm text-muted-foreground text-center mt-2">
        Trang {currentPage} / {posts.pages} - Tổng {posts.total} bài viết
      </div>
    </div>
  );
}
