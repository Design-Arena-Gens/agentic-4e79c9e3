import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, Clock3, HeartPulse, Users } from "lucide-react";

const metrics = [
  {
    id: "metric-appointments",
    label: "Appointments",
    value: "18",
    delta: "+3 today",
    icon: CalendarCheck,
    accent: "bg-sky-100 text-sky-700",
  },
  {
    id: "metric-checkins",
    label: "Checked-in",
    value: "6",
    delta: "2 waiting",
    icon: Users,
    accent: "bg-seafoam-100 text-seafoam-700",
  },
  {
    id: "metric-followups",
    label: "Follow-ups",
    value: "4",
    delta: "2 urgent",
    icon: Clock3,
    accent: "bg-amber-100 text-amber-700",
  },
  {
    id: "metric-health",
    label: "Clinic pulse",
    value: "96%",
    delta: "optimal",
    icon: HeartPulse,
    accent: "bg-emerald-100 text-emerald-700",
  },
];

export function OverviewMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.id} className="bg-white/80">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-800">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-500">{metric.delta}</p>
              </div>
              <span className={`flex h-12 w-12 items-center justify-center rounded-full ${metric.accent}`} aria-hidden>
                <Icon className="h-6 w-6" />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
