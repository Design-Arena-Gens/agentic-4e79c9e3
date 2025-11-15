"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { patients } from "@/data/mock-data";

export function CommandSearch({ onSelect }: { onSelect?: (patientId: string) => void }) {
  const [query, setQuery] = useState("");
  const results = patients.filter((patient) =>
    [patient.name, patient.email, patient.phone, patient.insuranceId]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="relative" role="search">
      <label htmlFor="command-search" className="sr-only">
        Search patients, appointments, or FAQs
      </label>
      <input
        id="command-search"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search patients, notes, insurance, FAQs..."
        className={cn(
          "w-full rounded-full border border-white/80 bg-white/90 py-3 pl-12 pr-6 text-sm text-slate-700 placeholder:text-slate-400",
          "shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        )}
      />
      <MagnifyingGlassIcon
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-500"
      />
      {query && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 w-full rounded-2xl border border-white/90 bg-white p-3 shadow-lg focus:outline-none"
        >
          {results.length === 0 && (
            <li
              className="rounded-xl px-4 py-3 text-sm text-slate-500"
              role="option"
              aria-selected="false"
            >
              No matches found
            </li>
          )}
          {results.map((patient) => (
            <li key={patient.id} role="option" aria-selected="false">
              <button
                type="button"
                className="flex w-full flex-col gap-1 rounded-xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                onClick={() => {
                  setQuery("");
                  onSelect?.(patient.id);
                }}
              >
                <span className="font-medium text-slate-800">{patient.name}</span>
                <span className="text-xs text-slate-500">
                  {patient.email} • {patient.insuranceProvider}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
