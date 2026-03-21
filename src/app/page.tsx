import Link from "next/link";

const highlights = [
  {
    title: "Team Agreement",
    detail:
      "Fair workload split, weekly meetings, and issue escalation through active communication.",
  },
  {
    title: "Internal Networking",
    detail:
      "Posts, quotes, and direct messaging help every team share updates in one place.",
  },
  {
    title: "People Development",
    detail:
      "Training management, activity tracking, and HR feedback loop support continuous improvement.",
  },
];

const launchLinks = [
  { href: "/dashboard", label: "Open Dashboard" },
  { href: "/admin", label: "Manage Trainings" },
  { href: "/feed", label: "Go to Posts" },
  { href: "/messages", label: "Open Messaging" },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-slate-900 px-6 py-8 text-slate-50">
        <p className="text-xs uppercase tracking-[0.2em] text-teal-300">Week 1 · Team 2</p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Team Agreement and App Brainstorm
        </h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          This MVP is the social networking concept for startup internal
          communication, including admin tools, posts/quotes, messaging, secure auth, activity
          tracking, counseling support, dashboard analytics, and HR feedback.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {launchLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-slate-500 px-4 py-2 text-sm font-medium transition hover:border-teal-300 hover:text-teal-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="kpi">
            <h2 className="font-display text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white/80 p-6">
        <h2 className="font-display text-2xl font-semibold text-slate-900">Team Members</h2>
        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p>Darshilkumar Patel</p>
          <p>Naga Pranav Vangala</p>
          <p>Yudai Yaguchi</p>
          <p>Xinyi Yin</p>
        </div>
        <p className="mt-6 text-sm text-slate-600">
          Shared docs, GitHub workflows, and regular sync meetings are embedded in this app design
          as collaboration-first principles.
        </p>
      </section>
    </div>
  );
}
