"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/auth", label: "Secure Auth",protected: false },
  { href: "/", label: "Overview", protected: true },
  { href: "/dashboard", label: "Dashboard", protected: true },
  { href: "/admin", label: "Admin", protected: true },
  { href: "/feed", label: "Posts & Quotes", protected: true },
  { href: "/messages", label: "Messaging", protected: true },
  { href: "/activity", label: "Activity", protected: true },
  { href: "/counseling", label: "Counseling", protected: true },
  { href: "/feedback", label: "HR Feedback", protected: true },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSession = document.cookie.split(';').some(row => row.startsWith("session="));
    setIsLoggedIn(hasSession);
  }, [pathname]);

  function handleLogout() {
    document.cookie = "session=; path=/; max-age=0";
    setIsLoggedIn(false);
    router.push("/auth");
  }

  if (!mounted) return null;
  const filteredLinks = links.filter(link => isLoggedIn ? link.protected : !link.protected);

  return (
    <nav className="space-y-2">
      {filteredLinks.map((link) => {
        const active = isActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-teal-700 text-white shadow-md"
                : "text-slate-700 hover:bg-teal-50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="mt-4 block w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700"
        >
          Log Out
        </button>
      )}
    </nav>
  );
}
