import { teamMetrics, upcomingTrainings } from "@/lib/app-data";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const totals = teamMetrics.reduce(
    (acc, team) => {
      acc.members += team.members;
      acc.posts += team.weeklyPosts;
      acc.unresolved += team.unresolvedMessages;
      acc.completion += team.trainingCompletion;
      return acc;
    },
    { members: 0, posts: 0, unresolved: 0, completion: 0 },
  );

  const averageCompletion = Math.round(totals.completion / teamMetrics.length);

  return (
    <div className="space-y-7">
      <section>
        <h1 className="font-display text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Aggregated visibility across teams, organization groups, communication, and training.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="kpi">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Employees</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.members}</p>
        </article>
        <article className="kpi">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Weekly Posts</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.posts}</p>
        </article>
        <article className="kpi">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Open Messages</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.unresolved}</p>
        </article>
        <article className="kpi">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Avg Training Completion</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{averageCompletion}%</p>
        </article>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/85">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-4 py-3 font-medium">Organization</th>
              <th className="px-4 py-3 font-medium">Members</th>
              <th className="px-4 py-3 font-medium">Training</th>
              <th className="px-4 py-3 font-medium">Weekly Posts</th>
            </tr>
          </thead>
          <tbody>
            {teamMetrics.map((team) => (
              <tr key={team.team} className="border-b border-slate-100 last:border-none">
                <td className="px-4 py-3 font-medium text-slate-900">{team.team}</td>
                <td className="px-4 py-3 text-slate-700">{team.organization}</td>
                <td className="px-4 py-3 text-slate-700">{team.members}</td>
                <td className="px-4 py-3 text-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-teal-600"
                        style={{ width: `${team.trainingCompletion}%` }}
                      />
                    </div>
                    <span>{team.trainingCompletion}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">{team.weeklyPosts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white/85 p-5">
        <h2 className="font-display text-xl font-semibold text-slate-900">Upcoming Trainings</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {upcomingTrainings.map((training) => (
            <article key={training.id} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-sm font-medium text-slate-900">{training.title}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-500">
                {training.owner}
              </p>
              <p className="mt-3 text-sm text-slate-600">{formatDate(training.scheduledFor)}</p>
              <p className="text-sm text-slate-600">Seats: {training.seats}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
