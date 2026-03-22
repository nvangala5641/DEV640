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
  const eventCountByTeam = activityEvents.reduce<Record<string, number>>((acc, event) => {
    acc[event.team] = (acc[event.team] || 0) + 1;
    return acc;
  }, {});

  const activityByTeam = teamMetrics.map((team) => ({
    team: team.team,
    totalEvents: eventCountByTeam[team.team] || 0,
    weeklyPosts: team.weeklyPosts,
  }));

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-3xl font-semibold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
          User Activity Tracking
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Monitor engagement across posts, messages, and learning participation.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="font-display text-xl font-semibold text-slate-900">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            {activityEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 transition duration-200 hover:border-indigo-200 hover:bg-indigo-50/70"
              >
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

        <article className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="font-display text-xl font-semibold text-slate-900">Team Signals</h2>
          <div className="mt-4 space-y-3">
            {activityByTeam.map((item) => (
              <div
                key={item.team}
                className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 transition duration-200 hover:border-teal-200 hover:bg-teal-50/70"
              >
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