"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { teamMetrics, upcomingTrainings } from "@/lib/app-data";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("fullName") || "User";
    setUserName(name);
  }, []);

  const totals = teamMetrics.reduce(
    (acc, team) => {
      acc.members += team.members;
      acc.posts += team.weeklyPosts;
      acc.unresolved += team.unresolvedMessages;
      acc.completion += team.trainingCompletion;
      return acc;
    },
    { members: 0, posts: 0, unresolved: 0, completion: 0 }
  );

  const averageCompletion = Math.round(totals.completion / teamMetrics.length);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="font-display text-3xl font-semibold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="mt-3 text-lg font-medium text-slate-700">
          Welcome back, <span className="text-slate-900">{userName}</span>
        </p>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Aggregated visibility across teams, organization groups, communication, and training.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/feed" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md">
          <span className="text-lg">&#9998;</span> Create a Post
        </Link>
        <Link href="/messages" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md">
          <span className="text-lg">&#9993;</span> Send a Message
        </Link>
        <Link href="/feedback" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md">
          <span className="text-lg">&#9733;</span> Submit Feedback
        </Link>
        <Link href="/activity" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md">
          <span className="text-lg">&#9776;</span> View Activity
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="kpi transition duration-200 hover:-translate-y-1 hover:shadow-xl">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Employees</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.members}</p>
        </article>

        <article className="kpi transition duration-200 hover:-translate-y-1 hover:shadow-xl">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Weekly Posts</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.posts}</p>
        </article>

        <article className="kpi transition duration-200 hover:-translate-y-1 hover:shadow-xl">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Open Messages</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.unresolved}</p>
        </article>

        <article className="kpi transition duration-200 hover:-translate-y-1 hover:shadow-xl">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Avg Training Completion</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{averageCompletion}%</p>
        </article>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
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
              <tr
                key={team.team}
                className="border-b border-slate-100 transition hover:bg-indigo-50/40 last:border-none"
              >
                <td className="px-4 py-3 font-medium text-slate-900">{team.team}</td>
                <td className="px-4 py-3 text-slate-700">{team.organization}</td>
                <td className="px-4 py-3 text-slate-700">{team.members}</td>
                <td className="px-4 py-3 text-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-500"
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

      <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition duration-200 hover:shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-slate-900">Upcoming Trainings</h2>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
            {upcomingTrainings.length} scheduled
          </span>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {upcomingTrainings.map((training) => (
            <article
              key={training.id}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition duration-200 hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-50/60 hover:shadow-lg"
            >
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