"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts, searchUsers, clearSearchResults } from "@/redux/postSlice";
import { getTimeAgo } from "@/utils/dateFormat";
import { AppDispatch, RootState } from "@/redux/store";
import Post from "@/app/(post)/components/post";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import styles from "@/app/(home)/home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/app/(home)/sidebar";
import Link from "next/link";
import Image from "next/image";

// Add SearchSkeleton component
const SearchSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border-b border-border pb-4">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-20 bg-gray-200 rounded w-full" />
              <div className="flex gap-4 mt-2">
                <div className="h-8 w-20 bg-gray-200 rounded" />
                <div className="h-8 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Add UserCard component
const UserCard = ({ user }: { user: any }) => {
  return (
    <Link href={`/user/${user.userName}`}>
      <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <Image src={user.avatarUrl || "/avatar.jpg"} alt={user.userName} width={48} height={48} className="rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{user.userName}</h3>
            {user.reputation > 0 && <span className="text-sm text-muted-foreground">({user.reputation} điểm)</span>}
          </div>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          {user.isFollowing ? (
            <span className="text-sm text-primary">Đang theo dõi</span>
          ) : (
            <Button variant="outline" size="sm">
              Theo dõi
            </Button>
          )}
          {user.isBlocked && <span className="text-sm text-destructive">Đã chặn</span>}
        </div>
      </div>
    </Link>
  );
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { searchState } = useSelector((state: RootState) => state.post);
  const [searchType, setSearchType] = useState<"posts" | "users">("posts");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const cx = classNames.bind(styles);

  // Get search query from URL
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    if (searchQuery.trim()) {
      console.log("🔍 Searching for:", searchQuery, "Type:", searchType);

      if (searchType === "posts") {
        dispatch(
          searchPosts({
            searchTerm: searchQuery,
            page: currentPage,
            pageSize,
          }),
        );
      } else {
        dispatch(
          searchUsers({
            searchTerm: searchQuery,
            page: currentPage,
            pageSize,
          }),
        );
      }
    }

    return () => {
      dispatch(clearSearchResults());
    };
  }, [searchQuery, searchType, currentPage, dispatch]);

  // Update loading state
  if (searchState.loading) {
    return (
      <>
        <Header />
        <div className={cx("home-wrapper")}>
          <div className={cx("container")}>
            <div className={cx("home-content")}>
              <Sidebar />
              <div className="flex flex-col max-w-[732px] w-full">
                <div className="flex gap-4 mb-6">
                  <Button variant={searchType === "posts" ? "default" : "outline"} onClick={() => setSearchType("posts")}>
                    Bài viết
                  </Button>
                  <Button variant={searchType === "users" ? "default" : "outline"} onClick={() => setSearchType("users")}>
                    Người dùng
                  </Button>
                </div>
                <h1 className="text-xl font-semibold mb-4">Searching for "{searchQuery}"...</h1>
                <SearchSkeleton />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (searchState.error) {
    return (
      <>
        <Header />
        <div className={cx("home-wrapper")}>
          <div className={cx("container")}>
            <div className={cx("home-content")}>
              <Sidebar />
              <div className="flex flex-col max-w-[732px] w-full">
                <div className="flex gap-4 mb-6">
                  <Button variant={searchType === "posts" ? "default" : "outline"} onClick={() => setSearchType("posts")}>
                    Bài viết
                  </Button>
                  <Button variant={searchType === "users" ? "default" : "outline"} onClick={() => setSearchType("users")}>
                    Người dùng
                  </Button>
                </div>
                <div className="flex justify-center items-center min-h-[200px] p-4 text-destructive">
                  Error: {searchState.error}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const results = searchType === "posts" ? searchState.posts : searchState.users;

  // Show empty state
  if (!results || !results.items || results.items.length === 0) {
    return (
      <>
        <Header />
        <div className={cx("home-wrapper")}>
          <div className={cx("container")}>
            <div className={cx("home-content")}>
              <Sidebar />
              <div className="flex flex-col max-w-[732px] w-full">
                <div className="flex gap-4 mb-6">
                  <Button variant={searchType === "posts" ? "default" : "outline"} onClick={() => setSearchType("posts")}>
                    Bài viết
                  </Button>
                  <Button variant={searchType === "users" ? "default" : "outline"} onClick={() => setSearchType("users")}>
                    Người dùng
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center min-h-[200px] p-4 text-muted-foreground">
                  <p>
                    No {searchType} found for "{searchQuery}"
                  </p>
                  <p className="text-sm mt-2">Try different keywords or check your spelling</p>
                </div>
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
            <div className="flex flex-col max-w-[732px] w-full" style={{ marginTop: "20px" }}>
              <div className="flex gap-4 mb-6">
                <Button variant={searchType === "posts" ? "default" : "outline"} onClick={() => setSearchType("posts")}>
                  Bài viết
                </Button>
                <Button variant={searchType === "users" ? "default" : "outline"} onClick={() => setSearchType("users")}>
                  Người dùng
                </Button>
              </div>

              <h1 className="text-xl font-semibold mb-4">
                Search results for "{searchQuery}" ({results.total} {searchType})
              </h1>

              {searchType === "posts" ? (
                // Post list with animation
                <div className="space-y-4">
                  {results.items.map((post: any, index: number) => (
                    <div
                      key={post.id}
                      className="border-b border-border pb-4 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
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
                          votes: post.votes,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // User list with animation
                <div className="space-y-2">
                  {results.items.map((user: any, index: number) => (
                    <div
                      key={user.id}
                      className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <UserCard user={user} />
                    </div>
                  ))}
                </div>
              )}

              {/* Thêm thông báo kết quả tìm kiếm */}
              <div className="text-sm text-muted-foreground text-center mt-4">
                {results.total === 0
                  ? `Không tìm thấy ${searchType === "posts" ? "bài viết" : "người dùng"} nào`
                  : results.total === 1
                    ? `Tìm thấy 1 ${searchType === "posts" ? "bài viết" : "người dùng"}`
                    : `Tìm thấy ${results.total} ${searchType === "posts" ? "bài viết" : "người dùng"}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
