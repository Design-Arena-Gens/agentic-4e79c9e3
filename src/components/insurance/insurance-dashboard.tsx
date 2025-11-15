"use client";

import { useMemo, useState } from "react";
import { Switch } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { patients, appointments } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { eligibilityCopy } from "@/lib/utils";

const providers = ["SmileSecure", "BrightCare", "HealthySmiles", "DentistryPlus"];

export function InsuranceDashboard() {
  const [autoVerify, setAutoVerify] = useState(true);
  const coverageMap = useMemo(() => {
    return patients.reduce<Record<string, number>>((accumulator, patient) => {
      accumulator[patient.insuranceProvider] = (accumulator[patient.insuranceProvider] ?? 0) + 1;
      return accumulator;
    }, {});
  }, []);

  return (
    <section className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 shadow-sm">
      <header className="flex items-center justify-between border-b border-white/60 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-sky-100 p-2 text-sky-600" aria-hidden>
            <ShieldCheckIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">Insurance Verification</h3>
            <p className="text-sm text-slate-500">
              Eligibility checks synced with major providers • Updates every 5 minutes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          Auto-verify
          <Switch
            checked={autoVerify}
            onChange={setAutoVerify}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              autoVerify ? "bg-sky-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                autoVerify ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </Switch>
        </div>
      </header>
      <div className="grid flex-1 grid-cols-1 gap-6 p-6 xl:grid-cols-2">
        <div className="space-y-4">
          {patients.map((patient) => (
            <article
              key={patient.id}
              className="flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/90 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{patient.name}</h4>
                  <p className="text-xs text-slate-500">{patient.insuranceProvider}</p>
                </div>
                <Badge
                  className={
                    patient.eligibility === "verified"
                      ? "bg-emerald-100 text-emerald-700"
                      : patient.eligibility === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                  }
                >
                  {eligibilityCopy[patient.eligibility]}
                </Badge>
              </div>
              <dl className="grid gap-3 text-xs text-slate-500 sm:grid-cols-2">
                <div>
                  <dt className="font-medium">Member ID</dt>
                  <dd>{patient.insuranceId}</dd>
                </div>
                <div>
                  <dt className="font-medium">Next visit</dt>
                  <dd>
                    {appointments.find((appointment) => appointment.patient === patient.name)?.reason ??
                      "No appointment"}
                  </dd>
                </div>
              </dl>
              {patient.eligibility === "issue" && (
                <p className="rounded-2xl bg-rose-50 p-3 text-xs text-rose-600">
                  Coverage limit reached for restorative treatment. Lumi drafted a request for secondary insurance
                  review and queued follow-up message.
                </p>
              )}
            </article>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div className="rounded-3xl border border-white/60 bg-sky-50/80 p-5 shadow-inner">
            <h4 className="text-sm font-semibold text-sky-700">Provider Coverage</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600" role="list">
              {providers.map((provider) => (
                <li key={provider} className="flex items-center justify-between gap-4">
                  <span>{provider}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-white shadow-inner">
                      <div
                        className="h-full rounded-full bg-sky-400"
                        style={{ width: `${Math.min((coverageMap[provider] ?? 1) * 20, 100)}%` }}
                        aria-hidden
                      />
                    </div>
                    <span className="text-xs text-slate-500">
                      {coverageMap[provider] ?? 0} patients
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/90 p-5 text-sm text-slate-600 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-800">Automations</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>• Eligibility tasks auto-assigned when verification fails.</li>
              <li>• Voicemail parse triggers verification checklist.</li>
              <li>• Lumi drafts insurer call scripts for staff with patient context.</li>
            </ul>
            <p className="mt-4 rounded-2xl bg-sky-50 p-3 text-xs text-sky-600">
              Upcoming: Integrate Delta Dental APIs (beta access granted).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
