"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { ClipboardDocumentCheckIcon, QrCodeIcon } from "@heroicons/react/24/outline";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .regex(/^[0-9() -]{10,}$/i, "Enter a valid phone number"),
  reason: z.string().min(3, "Reason required"),
});

type FormValues = z.infer<typeof schema>;

export function CheckInPanel() {
  const [qrCode, setQrCode] = useState<string>("");
  const [checkedInCount, setCheckedInCount] = useState(6);

  useEffect(() => {
    QRCode.toDataURL("https://lumineux-dental.com/check-in", {
      margin: 1,
      color: {
        dark: "#2c7a62",
        light: "#ffffff",
      },
    }).then(setQrCode);
  }, []);

  const formId = useMemo(() => `check-in-form-${Math.random().toString(36).slice(2)}`, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success(`${values.name} checked in successfully`);
    setCheckedInCount((count) => count + 1);
    reset();
  };

  return (
    <section className="flex h-full flex-col" aria-labelledby={`${formId}-title`}>
      <header className="flex items-center justify-between border-b border-white/60 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-seafoam-100 p-2 text-seafoam-600" aria-hidden>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 id={`${formId}-title`} className="text-base font-semibold text-slate-800">
              Patient Check-In
            </h3>
            <p className="text-sm text-slate-500">Scan & submit digital forms within 2 minutes</p>
          </div>
        </div>
        <Badge className="bg-seafoam-100 text-seafoam-700">{checkedInCount} today</Badge>
      </header>
      <div className="grid flex-1 grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-3xl border border-seafoam-200 bg-white/80 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-seafoam-500 p-2 text-white" aria-hidden>
                <QrCodeIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700">Express QR Check-In</h4>
                <p className="text-xs text-slate-500">Patients scan at kiosk or their device</p>
              </div>
            </div>
            {qrCode && (
              <div className="mt-4 inline-flex items-center justify-center rounded-2xl border border-seafoam-200 bg-white p-4">
                <Image src={qrCode} alt="Check-in QR code" width={160} height={160} className="rounded-xl" />
              </div>
            )}
            <ul className="mt-4 space-y-2 text-xs text-slate-500">
              <li>• Auto-fill returning patient info</li>
              <li>• Digital signatures stored securely</li>
              <li>• Accessibility support for screen readers</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/80 p-5 text-xs text-slate-500">
            <h4 className="text-sm font-semibold text-slate-700">Arrival insights</h4>
            <p className="mt-2 leading-relaxed">
              Lumi predicts a 5 minute delay for Marcus Taylor based on traffic reports and
              has already notified Dr. Patel. Avery Johnson flagged for pre-med form, reminder sent.
            </p>
          </div>
        </div>
        <form
          aria-describedby={`${formId}-description`}
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm"
        >
          <p id={`${formId}-description`} className="text-sm text-slate-500">
            Manual check-in for walk-ins or accessibility assistance. Required fields marked with *.
          </p>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-name`}>
              Full name *
              <input
                id={`${formId}-name`}
                className="mt-1 w-full rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                {...register("name")}
              />
              {errors.name && <span className="mt-1 block text-xs text-rose-600">{errors.name.message}</span>}
            </label>
            <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-phone`}>
              Mobile number *
              <input
                id={`${formId}-phone`}
                inputMode="tel"
                className="mt-1 w-full rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                {...register("phone")}
              />
              {errors.phone && <span className="mt-1 block text-xs text-rose-600">{errors.phone.message}</span>}
            </label>
            <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-reason`}>
              Visit reason *
              <textarea
                id={`${formId}-reason`}
                rows={3}
                className="mt-1 w-full rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                {...register("reason")}
              />
              {errors.reason && <span className="mt-1 block text-xs text-rose-600">{errors.reason.message}</span>}
            </label>
          </div>
          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="text-xs text-slate-400">HIPAA-compliant storage • E-sign ready</div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-seafoam-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-seafoam-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-seafoam-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Checking in…" : "Complete check-in"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
