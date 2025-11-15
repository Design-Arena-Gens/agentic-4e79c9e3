"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { CommandSearch } from "@/components/search/command-search";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Schedule", href: "#schedule" },
  { label: "Check-in", href: "#checkin" },
  { label: "Insurance", href: "#insurance" },
  { label: "Calls", href: "#calls" },
  { label: "Messaging", href: "#messaging" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  useHotkeys("ctrl+k, meta+k", (event) => {
    event.preventDefault();
    setSearchOpen((previous) => !previous);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-seafoam-50">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-full border border-white/70 bg-white p-2 text-sky-500 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Toggle navigation"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            <Link href="#" className="text-lg font-semibold text-slate-800">
              Lumi Reception
            </Link>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-sky-600">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((previous) => !previous)}
              className="hidden items-center gap-2 rounded-full border border-white/70 bg-white px-4 py-2 text-xs font-medium text-slate-500 shadow-sm transition hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:flex"
            >
              Press ⌘K to search
            </button>
            <button
              type="button"
              className="relative rounded-full border border-white/80 bg-white p-3 text-slate-500 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                3
              </span>
            </button>
            <div className="hidden items-center gap-3 rounded-full border border-white/80 bg-white px-4 py-2 text-left md:flex">
              <div>
                <p className="text-xs text-slate-500">On duty</p>
                <p className="text-sm font-semibold text-slate-700">Alex Morgan</p>
              </div>
              <span className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-seafoam-400" aria-hidden />
            </div>
          </div>
        </div>
        <div className={cn("border-t border-white/60 bg-white/90 px-6 py-4 transition", searchOpen ? "block" : "hidden md:block")}
        >
          <div className="mx-auto max-w-4xl">
            <CommandSearch />
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8" id="dashboard">
        {children}
      </main>
    </div>
  );
}
