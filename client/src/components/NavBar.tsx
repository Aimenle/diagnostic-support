"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@heroui/react";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Patient Lookup", icon: "search" },
    { path: "/enter", label: "New Diagnosis", icon: "plus" },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "search":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "plus":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="ml-2 text-xl font-bold text-gray-900">
                Diagnosis System
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={pathname === item.path ? "solid" : "light"}
                color={pathname === item.path ? "primary" : "default"}
                onPress={() => router.push(item.path)}
                startContent={getIcon(item.icon)}
                className={`${
                  pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
