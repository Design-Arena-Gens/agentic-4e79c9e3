"use client";

import { useMemo, useState } from "react";
import { MessageSquareIcon } from "lucide-react";
import { Switch } from "@headlessui/react";
import { Message, messages, patients } from "@/data/mock-data";
import { toast } from "react-toastify";

export function MessageCenter() {
  const [messageList, setMessageList] = useState<Message[]>(messages);
  const [autoReminders, setAutoReminders] = useState(true);
  const accessibleId = useMemo(() => `message-center-${Math.random().toString(36).slice(2)}`, []);

  const sendReply = (message: Message) => {
    const patient = patients.find((item) => item.id === message.patientId);
    setMessageList((prev) => [
      ...prev,
      {
        id: `reply-${Date.now()}`,
        sender: "clinic",
        patientId: message.patientId,
        body: "Lumi: Confirmed and shared parking guidance.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        channel: message.channel,
      },
    ]);
    toast.success(`Reply sent to ${patient?.name ?? "patient"}`);
  };

  return (
    <section className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 shadow-sm">
      <header className="flex items-center justify-between border-b border-white/60 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-sky-100 p-2 text-sky-600" aria-hidden>
            <MessageSquareIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 id={`${accessibleId}-title`} className="text-base font-semibold text-slate-800">
              Patient Messaging
            </h3>
            <p className="text-sm text-slate-500">Two-way confirmations, reminders, and follow-ups</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          Auto-reminders
          <Switch
            checked={autoReminders}
            onChange={setAutoReminders}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              autoReminders ? "bg-seafoam-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                autoReminders ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </Switch>
        </div>
      </header>
      <div className="grid flex-1 grid-cols-1 gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          {messageList.map((message) => {
            const patient = patients.find((item) => item.id === message.patientId);
            return (
              <article
                key={message.id}
                className="flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/90 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{patient?.name}</h4>
                    <p className="text-xs text-slate-500">Via {message.channel.toUpperCase()}</p>
                  </div>
                  <span className="text-xs text-slate-400">{message.timestamp}</span>
                </div>
                <p className="text-sm text-slate-600">{message.body}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <button
                    type="button"
                    onClick={() => sendReply(message)}
                    className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    Send smart reply
                  </button>
                  <p>Lumi suggests confirming arrival + parking instructions.</p>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/70 bg-white/90 p-4 text-sm text-slate-600 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-800">Confirmation rates</h4>
            <p className="mt-2">92% confirmed • 6% awaiting • 2% reschedule requests</p>
            <div className="mt-4 space-y-2 text-xs text-slate-500">
              <p>• Lumi drafted 3 follow-up emails for late respondents.</p>
              <p>• No-show risk model flags Avery Johnson (60%).</p>
              <p>• Flow automatically shares pre-visit instructions.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/70 bg-sky-50 p-4 text-xs text-slate-500 shadow-inner">
            <h4 className="text-sm font-semibold text-sky-700">Smart templates</h4>
            <ul className="mt-3 space-y-2">
              <li>• Post-visit care instructions</li>
              <li>• Insurance info request</li>
              <li>• Review invitation & gratitude note</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
