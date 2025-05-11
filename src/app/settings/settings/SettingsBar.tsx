"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const SettingsBar = () => {
  const [activeLink, setActiveLink] = useState("Overview");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const links = [
    "Overview",
    "Posts",
    "Comments",
    "Saved",
    "Hidden",
    "Upvoted",
    "Downvoted", 
  ];

  const handleClick = (link: string) => {
    setActiveLink(link);
  };

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "right" ? 100 : -100,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (containerRef.current) {
      setCanScrollLeft(containerRef.current.scrollLeft > 0);
      setCanScrollRight(
        containerRef.current.scrollLeft + containerRef.current.clientWidth <
          containerRef.current.scrollWidth
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className="relative w-full flex items-center overflow-hidden">
      {/* Nút "<" */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 px-2 py-2 flex items-center rounded-full bg-white hover:bg-gray-200 shadow-md"
        >
          <FaChevronLeft className="w-3 h-3" />
        </button>
      )}

      {/* Thanh tabs cuộn ngang (CHỈ CHIẾM PHẦN CỦA CONTENTBAR) */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="w-full items-center font-bold tracking-wide text-sm flex gap-x-8 flex-nowrap overflow-x-auto scrollbar-hide"
      >
        {links.map((link) => (
          <Link
            key={link}
            href={`/settings/settings/${link}`}
            className={`${
              activeLink === link
                ? "px-4 py-3 bg-gray-200 rounded-full font-sm hover:underline"
                : "hover:underline"
            }`}
            onClick={() => handleClick(link)}
          >
            {link}
          </Link>
        ))}
      </div>

      {/* Nút ">" */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 px-2 py-2 rounded-full bg-white hover:bg-gray-200 shadow-md"
        >
          <FaChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default SettingsBar;
