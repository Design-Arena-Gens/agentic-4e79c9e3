"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Appointment, appointments as initialAppointments } from "@/data/mock-data";
import { statusStyles } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

function formatTimeRange(appointment: Appointment) {
  return `${format(appointment.start, "p")} – ${format(appointment.end, "p")}`;
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: appointment.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">{appointment.patient}</h4>
          <p className="text-xs text-slate-500">{appointment.reason}</p>
        </div>
        <Badge className={statusStyles[appointment.status] ?? "bg-sky-100 text-sky-700"}>
          {appointment.status.replace("-", " ")}
        </Badge>
      </div>
      <dl className="mt-3 space-y-1 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <dt className="font-medium">Time</dt>
          <dd aria-label="Appointment time">{formatTimeRange(appointment)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="font-medium">Provider</dt>
          <dd>{appointment.provider}</dd>
        </div>
        {appointment.notes && (
          <div className="flex items-start gap-2">
            <dt className="font-medium">Notes</dt>
            <dd className="text-slate-600">{appointment.notes}</dd>
          </div>
        )}
      </dl>
      <p className="mt-3 text-xs text-slate-400">
        Drag to reschedule • Press space to toggle keyboard dragging
      </p>
    </article>
  );
}

export function DailySchedule() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const grouped = useMemo(() => {
    return appointments.reduce<Record<string, Appointment[]>>((accumulator, appointment) => {
      const key = format(appointment.start, "a");
      if (!accumulator[key]) accumulator[key] = [];
      accumulator[key].push(appointment);
      return accumulator;
    }, {});
  }, [appointments]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = appointments.findIndex((appointment) => appointment.id === active.id);
    const newIndex = appointments.findIndex((appointment) => appointment.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...appointments];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    setAppointments(reordered);
    toast.success(`${moved.patient}'s visit moved to ${format(moved.start, "p")}`);
  };

  return (
    <section
      aria-label="Today's appointments"
      className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 shadow-sm"
    >
      <header className="flex items-center justify-between border-b border-white/60 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-sky-100 p-2 text-sky-600" aria-hidden>
            <CalendarDaysIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">Today&apos;s Schedule</h3>
            <p className="text-sm text-slate-500">
              Drag and drop appointments to adjust. Conflicts highlighted in orange.
            </p>
          </div>
        </div>
        <Badge className="bg-white text-sky-600">{appointments.length} visits</Badge>
      </header>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <SortableContext items={appointments.map((appointment) => appointment.id)} strategy={rectSortingStrategy}>
            {Object.entries(grouped).map(([period, items]) => (
              <div key={period} className="space-y-3" aria-label={`${period} appointments`}>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {period === "am" ? "Morning" : "Afternoon"}
                </p>
                <div className="grid gap-4 lg:grid-cols-2">
                  {items.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </div>
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </section>
  );
}
