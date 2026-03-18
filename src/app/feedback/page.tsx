"use client";

import { FormEvent, useState } from "react";

type FeedbackEntry = {
  id: string;
  team: string;
  topic: string;
  priority: "Low" | "Medium" | "High";
  notes: string;
};

const initialFeedback: FeedbackEntry[] = [
  {
    id: "fb1",
    team: "Engineering",
    topic: "Running effective cross-team retrospectives",
    priority: "Medium",
    notes: "Need a template and a facilitation checklist.",
  },
  {
    id: "fb2",
    team: "Sales",
    topic: "Product update communication rhythm",
    priority: "High",
    notes: "Want clearer cadence when features change.",
  },
];

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>(initialFeedback);
  const [team, setTeam] = useState("Engineering");
  const [topic, setTopic] = useState("");
  const [priority, setPriority] = useState<FeedbackEntry["priority"]>("Medium");
  const [notes, setNotes] = useState("");

  function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!topic.trim() || !notes.trim()) {
      return;
    }

    setFeedback((current) => [
      {
        id: `fb-${Date.now()}`,
        team,
        topic: topic.trim(),
        priority,
        notes: notes.trim(),
      },
      ...current,
    ]);

    setTopic("");
    setNotes("");
    setPriority("Medium");
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-3xl font-semibold text-slate-900">Employee Feedback Loop</h1>
        <p className="mt-2 text-sm text-slate-600">
          HR can collect training/topic requests and prioritize what to cover next.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <article className="rounded-2xl border border-slate-200 bg-white/85 p-5">
          <h2 className="font-display text-xl font-semibold text-slate-900">Submit Feedback</h2>
          <form className="mt-4 grid gap-3" onSubmit={submitFeedback}>
            <select
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={team}
              onChange={(event) => setTeam(event.target.value)}
            >
              <option>Engineering</option>
              <option>Sales</option>
              <option>Customer Success</option>
              <option>HR</option>
            </select>
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Requested future topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            />
            <select
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={priority}
              onChange={(event) => setPriority(event.target.value as FeedbackEntry["priority"])}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <textarea
              className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Why this topic is needed"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Add Feedback
            </button>
          </form>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white/85 p-5">
          <h2 className="font-display text-xl font-semibold text-slate-900">Feedback Backlog</h2>
          <div className="mt-4 space-y-3">
            {feedback.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{item.topic}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.priority === "High"
                        ? "bg-rose-100 text-rose-800"
                        : item.priority === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">Team: {item.team}</p>
                <p className="mt-2 text-sm text-slate-700">{item.notes}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
