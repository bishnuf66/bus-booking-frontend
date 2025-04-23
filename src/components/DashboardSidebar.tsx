"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Tag, User, LogOut } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Blogs", href: "/dashboard/blog", icon: BookOpen },
  { name: "Categories", href: "/dashboard/categories", icon: Tag },
  // { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-700 p-4">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut
            className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-white"
            aria-hidden="true"
          />
          Logout
        </button>
      </div>
    </div>
  );
}
