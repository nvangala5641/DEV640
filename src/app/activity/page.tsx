import { activityEvents, teamMetrics } from "@/lib/app-data";

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ActivityPage() {
  const activityByTeam = teamMetrics.map((team) => ({
    team: team.team,
    totalEvents: activityEvents.filter((event) => event.team === team.team).length,
    weeklyPosts: team.weeklyPosts,
  }));

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-3xl font-semibold text-slate-900">User Activity Tracking</h1>
        <p className="mt-2 text-sm text-slate-600">
          Monitor engagement across posts, messages, and learning participation.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-2xl border border-slate-200 bg-white/85 p-5">
          <h2 className="font-display text-xl font-semibold text-slate-900">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            {activityEvents.map((event) => (
              <div key={event.id} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-slate-900">{event.user}</span> {event.action}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {event.team} · {formatDateTime(event.at)}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white/85 p-5">
          <h2 className="font-display text-xl font-semibold text-slate-900">Team Signals</h2>
          <div className="mt-4 space-y-3">
            {activityByTeam.map((item) => (
              <div key={item.team} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
                <p className="font-medium text-slate-900">{item.team}</p>
                <p className="mt-1 text-sm text-slate-600">Timeline events: {item.totalEvents}</p>
                <p className="text-sm text-slate-600">Weekly posts: {item.weeklyPosts}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
