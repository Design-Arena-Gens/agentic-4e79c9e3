"use client";

import { useMemo, useState } from "react";
import { PhoneArrowDownLeftIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockVoicemails = [
  {
    id: "vm-001",
    caller: "Laura Parker",
    receivedAt: "09:04 AM",
    urgency: "High",
    summary: "Crown fell out while eating lunch, seeking immediate assistance.",
    sentiment: "Concerned",
  },
  {
    id: "vm-002",
    caller: "Delta Insurance",
    receivedAt: "09:55 AM",
    urgency: "Normal",
    summary: "Requesting clarification on claim #44321 for Marcus Taylor.",
    sentiment: "Neutral",
  },
];

const routingRules = [
  {
    id: "rule-001",
    condition: "Emergency keywords",
    action: "Route to on-call dentist & SMS triage form",
  },
  {
    id: "rule-002",
    condition: "Insurance providers",
    action: "Assign to billing specialist + create task",
  },
  {
    id: "rule-003",
    condition: "After hours",
    action: "Send calming response & schedule first AM slot",
  },
];

export function CallCenter() {
  const [transcribing, setTranscribing] = useState(false);
  const [activeVoicemail, setActiveVoicemail] = useState(mockVoicemails[0]);
  const accessibleId = useMemo(() => `call-center-${Math.random().toString(36).slice(2)}`, []);

  return (
    <section className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 shadow-sm" aria-labelledby={`${accessibleId}-title`}>
      <header className="flex items-center justify-between border-b border-white/60 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-sky-100 p-2 text-sky-600" aria-hidden>
            <PhoneArrowDownLeftIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 id={`${accessibleId}-title`} className="text-base font-semibold text-slate-800">
              Call Management
            </h3>
            <p className="text-sm text-slate-500">
              Voicemail transcription and intelligent routing rules
            </p>
          </div>
        </div>
        <Badge className="bg-white text-slate-500">Realtime sync</Badge>
      </header>
      <div className="grid flex-1 grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-4">
          {mockVoicemails.map((voicemail) => (
            <button
              key={voicemail.id}
              onClick={() => setActiveVoicemail(voicemail)}
              className={`w-full rounded-3xl border bg-white/90 p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                activeVoicemail.id === voicemail.id
                  ? "border-sky-200 shadow-glow"
                  : "border-white/70 hover:border-sky-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{voicemail.caller}</h4>
                  <p className="text-xs text-slate-500">Received {voicemail.receivedAt}</p>
                </div>
                <Badge className={
                  voicemail.urgency === "High"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-amber-100 text-amber-700"
                }>
                  {voicemail.urgency}
                </Badge>
              </div>
              <p className="mt-3 line-clamp-2 text-xs text-slate-600">{voicemail.summary}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-800">{activeVoicemail.caller}</h4>
              <p className="text-xs text-slate-500">Sentiment: {activeVoicemail.sentiment}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setTranscribing(true);
                setTimeout(() => setTranscribing(false), 1200);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <SpeakerWaveIcon className="h-4 w-4" />
              {transcribing ? "Transcribing…" : "Live transcript"}
            </button>
          </div>
          <div className="space-y-3 rounded-2xl bg-sky-50/70 p-4 text-xs text-slate-600">
            <p className="font-medium text-sky-700">AI Transcript</p>
            <p>
              “Hello, this is {activeVoicemail.caller}. {activeVoicemail.summary} Please let me know if I should head to the
              emergency room or if you can fit me in today.”
            </p>
            <p className="rounded-2xl bg-white/80 p-3 text-slate-500">
              Lumi suggests routing to triage nurse and reserving the 12:30pm emergency block with Dr. Chen.
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/70 p-4 text-xs text-slate-500">
            <p className="text-sm font-semibold text-slate-700">Routing automations</p>
            <ul className="mt-2 space-y-2">
              {routingRules.map((rule) => (
                <li key={rule.id} className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <div>
                    <p className="font-medium text-slate-700">{rule.condition}</p>
                    <p>{rule.action}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-seafoam-200 bg-seafoam-50/80 p-4">
            <MessageSquare className="h-6 w-6 text-seafoam-600" aria-hidden />
            <p className="text-xs text-seafoam-700">
              Smart follow-up queued: SMS reassuring the caller, links to emergency instructions, and prompts for photo upload.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
