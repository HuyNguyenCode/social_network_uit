"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { name: "Profile", path: "/settings/settings/profile" },
    { name: "Manage Link Account", path: "/settings/settings/link" },
    { name: "Change Password", path: "/settings/settings/change-password" },
    { name: "Notifications", path: "/settings/settings/notification" },
    { name: "Delete Account", path: "/settings/settings/delete-account" },
  ];

  return (
    <div className="py-8">
      <h2 className="px-10 font-bold text-2xl">Settings</h2>
      <div className="py-4 px-10 text-lg flex font-bold gap-x-12 flex-wrap">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`text-gray-500 text-xm no-underline hover:text-gray-700 hover:underline ${
              pathname === link.path ? "font-bold text-gray-900" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Nội dung của từng mục sẽ hiển thị ở đây */}
      <div className="mt-4">{children}</div>
    </div>
  );
}
