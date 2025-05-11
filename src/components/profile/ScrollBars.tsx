"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from "next/navigation";

const ScrollBars = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams(); // Lấy params từ URL
  const username = params.username as string; // Lấy username từ params

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Tạo links động dựa trên username
  const links = [
    { name: "Posts", path: `/user/${username}/posts` },
    { name: "Comments", path: `/user/${username}/comments` },
    { name: "Saved", path: `/user/${username}/saved` },
    { name: "Upvoted", path: `/user/${username}/upvoted` },
    { name: "Downvoted", path: `/user/${username}/downvoted` },
  ];

  const handleClick = (path: string) => {
    router.push(path, { scroll: false });
  };

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "right" ? 200 : -200,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => checkScroll();
    container.addEventListener("scroll", handleScroll);
    checkScroll(); // Kiểm tra ngay khi render

    // Kiểm tra lại khi resize window
    window.addEventListener("resize", checkScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center overflow-hidden">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 px-3 py-3 flex items-center rounded-full bg-white hover:bg-gray-200 shadow-md transition-all duration-200 z-10"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={containerRef}
        className="w-full items-center font-bold tracking-wide text-sm flex gap-x-8 flex-nowrap overflow-x-auto scrollbar-hide"
      >
        {links.map(({ name, path }) => (
          <button
            key={path}
            className={`px-4 py-3 rounded-full transition-all duration-200 ${
              pathname === path
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleClick(path)}
          >
            {name}
          </button>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 px-3 py-3 rounded-full bg-white hover:bg-gray-200 shadow-md transition-all duration-200 z-10"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ScrollBars;