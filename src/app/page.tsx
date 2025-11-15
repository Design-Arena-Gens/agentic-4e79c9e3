import { AppShell } from "@/components/layout/app-shell";
import { OverviewMetrics } from "@/components/visual/overview-metrics";
import { DailySchedule } from "@/components/scheduler/daily-schedule";
import { CheckInPanel } from "@/components/checkin/check-in-panel";
import { InsuranceDashboard } from "@/components/insurance/insurance-dashboard";
import { CallCenter } from "@/components/calls/call-center";
import { MessageCenter } from "@/components/messaging/message-center";
import { AiConcierge } from "@/components/conversation/ai-concierge";
import { PriorityQueue } from "@/components/visual/priority-queue";

export default function Home() {
  return (
    <AppShell>
      <section className="space-y-6">
        <OverviewMetrics />
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]" id="schedule">
          <DailySchedule />
          <PriorityQueue />
        </div>
        <div className="grid gap-6 2xl:grid-cols-[1.5fr_1fr]" id="checkin">
          <CheckInPanel />
          <AiConcierge />
        </div>
        <div className="grid gap-6 lg:grid-cols-2" id="insurance">
          <InsuranceDashboard />
          <CallCenter />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]" id="messaging">
          <MessageCenter />
        </div>
      </section>
    </AppShell>
  );
}
