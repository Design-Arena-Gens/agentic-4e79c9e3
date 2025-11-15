"use client";

import { useMemo, useState, type FormEvent } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const suggestions = [
  "Reschedule Samantha's cleaning",
  "Check insurance for Marcus",
  "Send intake forms to new patient",
  "Summarize urgent tasks",
];

type Message = {
  id: string;
  author: "assistant" | "user";
  content: string;
};

export function AiConcierge({
  onCommand,
}: {
  onCommand?: (input: string) => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([
    {
      id: "msg-initial",
      author: "assistant",
      content:
        "Hi! I'm Lumi, your AI receptionist assistant. Ask me to manage appointments, send reminders, verify insurance, or summarize patient status.",
    },
  ]);

  const accessibleId = useMemo(() => `ai-concierge-${Math.random().toString(36).slice(2)}`, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${crypto.randomUUID()}`,
      author: "user",
      content: input.trim(),
    };

    setHistory((prev) => [...prev, userMessage]);
    onCommand?.(input.trim());

    const assistantReply: Message = {
      id: `assistant-${crypto.randomUUID()}`,
      author: "assistant",
      content:
        "I'll take care of that. I've logged the action and will keep you posted with updates.",
    };

    setHistory((prev) => [...prev, assistantReply]);
    setInput("");
  };

  return (
    <section
      className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 shadow-sm"
      aria-labelledby={`${accessibleId}-title`}
    >
      <div className="flex items-center justify-between border-b border-white/60 px-6 py-4">
        <div>
          <h3 id={`${accessibleId}-title`} className="text-base font-semibold text-slate-800">
            Conversational Assistant
          </h3>
          <p className="text-sm text-slate-500">
            Natural language commands to manage clinic operations
          </p>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4" role="log" aria-live="polite">
        {history.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3", 
              message.author === "assistant" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                message.author === "assistant" ? "bg-sky-100 text-sky-700" : "bg-seafoam-100 text-seafoam-700"
              )}
              aria-hidden
            >
              {message.author === "assistant" ? "AI" : "You"}
            </div>
            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                message.author === "assistant"
                  ? "bg-white text-slate-700 shadow-sm"
                  : "bg-seafoam-500 text-white shadow-glow"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3 border-t border-white/60 bg-white/70 px-6 py-4">
        <div className="flex flex-wrap gap-2" aria-label="Suggested prompts">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-medium text-sky-600 transition hover:border-sky-300 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="relative">
          <label htmlFor={`${accessibleId}-input`} className="sr-only">
            Message Lumi assistant
          </label>
          <textarea
            id={`${accessibleId}-input`}
            required
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Lumi to help with scheduling, reminders, insurance, and more..."
            className="w-full resize-none rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            rows={3}
          />
          <button
            type="submit"
            className="absolute bottom-6 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Send message"
          >
            <PaperAirplaneIcon className="h-5 w-5" aria-hidden />
          </button>
        </form>
      </div>
    </section>
  );
}
