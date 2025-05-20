"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "@/redux/postSlice";
import { getTimeAgo } from "@/utils/dateFormat";
import { AppDispatch, RootState } from "@/redux/store";
import Post from "@/app/(post)/components/post";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import styles from "@/app/(home)/home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/app/(home)/sidebar";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const cx = classNames.bind(styles);

  // Get search query from URL
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(
        searchPosts({
          searchTerm: searchQuery,
          page: currentPage,
          pageSize,
        }),
      );
    }
  }, [searchQuery, currentPage, dispatch]);

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

  // Show loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className={cx("home-wrapper")}>
          <div className={cx("container")}>
            <div className={cx("home-content")}>
              <Sidebar />
              <div className="flex justify-center items-center min-h-[200px] p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Header />
        <div className={cx("home-wrapper")}>
          <div className={cx("container")}>
            <div className={cx("home-content")}>
              <Sidebar />
              <div className="flex justify-center items-center min-h-[200px] p-4 text-destructive">Error: {error}</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show empty state
  if (!posts?.items?.length) {
    return (
      <>
        <Header />
        <div className={cx("home-wrapper")}>
          <div className={cx("container")}>
            <div className={cx("home-content")}>
              <Sidebar />
              <div className="flex flex-col items-center justify-center min-h-[200px] p-4 text-muted-foreground">
                <p>No results found for "{searchQuery}"</p>
                <p className="text-sm mt-2">Try different keywords or check your spelling</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show results
  return (
    <>
      <Header />
      <div className={cx("home-wrapper")}>
        <div className={cx("container")}>
          <div className={cx("home-content")}>
            <Sidebar />
            <div className="flex flex-col max-w-[732px] w-full">
              <h1 className="text-xl font-semibold mb-4">
                Search results for "{searchQuery}" ({posts.total} results)
              </h1>

              {/* Post list */}
              <div className="space-y-4">
                {posts.items.map((post) => (
                  <div key={post.id} className="border-b border-border pb-4">
                    <Post
                      post={{
                        id: post.id,
                        title: post.title || "Untitled Post",
                        content: post.content || "",
                        createdOn: post.createdOn || new Date().toISOString(),
                        username: post.username || "Unknown User",
                        upvoteCount: post.upvoteCount || 0,
                        downvoteCount: post.downvoteCount || 0,
                        timeAgo: getTimeAgo(post.createdOn),
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
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

              {/* Pagination info */}
              {posts.pages > 1 && (
                <div className="text-sm text-muted-foreground text-center mt-2">
                  Trang {currentPage} / {posts.pages} - Tổng {posts.total} bài viết
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
