import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExclamationTriangleIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import { appointments } from "@/data/mock-data";

const urgentTasks = [
  {
    id: "task-001",
    label: "Urgent tooth pain (Avery Johnson)",
    detail: "Awaiting chair confirmation • prep op room 2",
    type: "Appointment",
  },
  {
    id: "task-002",
    label: "Insurance review overdue",
    detail: "Marcus Taylor claim follow-up due in 1 hour",
    type: "Insurance",
  },
  {
    id: "task-003",
    label: "Voicemail escalation",
    detail: "Laura Parker emergency callback pending",
    type: "Call",
  },
];

export function PriorityQueue() {
  return (
    <Card className="bg-rose-50/70">
      <CardHeader className="items-start">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-rose-200 p-2 text-rose-700" aria-hidden>
            <BellAlertIcon className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-base text-rose-800">Urgent attention</CardTitle>
            <p className="text-xs text-rose-600">
              Lumi monitors conflicts and escalates tasks requiring immediate action.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {urgentTasks.map((task) => (
          <div
            key={task.id}
            className="rounded-2xl border border-rose-200 bg-white/80 p-4 text-xs text-rose-700 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{task.label}</p>
              <Badge className="bg-rose-100 text-rose-700">{task.type}</Badge>
            </div>
            <p className="mt-2 text-rose-600">{task.detail}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-700">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <ExclamationTriangleIcon className="h-5 w-5" />
            Conflicting appointments
          </p>
          <ul className="mt-2 space-y-1">
            {appointments
              .filter((appointment) => appointment.status === "conflict")
              .map((appointment) => (
                <li key={appointment.id}>
                  {appointment.patient} • {appointment.reason}
                </li>
              ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
