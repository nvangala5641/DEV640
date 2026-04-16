"use client";

import { FormEvent, useState } from "react";
import { useLocalStorage } from "../../hooks/localstorage";

type Training = {
  id: string;
  title: string;
  owner: string;
  date: string;
};

type Topic = {
  id: string;
  name: string;
  audience: string;
  status: "Planned" | "Published";
};

const initialTrainings: Training[] = [
  {
    id: "tr1",
    title: "Onboarding: Internal Communication",
    owner: "HR",
    date: "2026-03-25",
  },
  {
    id: "tr2",
    title: "Data Privacy for Startup Teams",
    owner: "Engineering",
    date: "2026-03-30",
  },
];

const initialTopics: Topic[] = [
  {
    id: "tp1",
    name: "Asking for Help Early",
    audience: "All Teams",
    status: "Published",
  },
  {
    id: "tp2",
    name: "Handling Customer Escalations",
    audience: "Customer Success",
    status: "Planned",
  },
];

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminPage() {
  const [trainings, setTrainings] = useLocalStorage<Training[]>("trainings", initialTrainings);
  const [topics, setTopics] = useLocalStorage<Topic[]>("topics", initialTopics);

  const [trainingTitle, setTrainingTitle] = useState("");
  const [trainingOwner, setTrainingOwner] = useState("HR");
  const [trainingDate, setTrainingDate] = useState("");

  const [topicName, setTopicName] = useState("");
  const [topicAudience, setTopicAudience] = useState("All Teams");

  function addTraining(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trainingTitle.trim() || !trainingDate) {
      return;
    }

    setTrainings((current) => [
      {
        id: `tr-${Date.now()}`,
        title: trainingTitle.trim(),
        owner: trainingOwner,
        date: trainingDate,
      },
      ...current,
    ]);

    setTrainingTitle("");
    setTrainingDate("");
  }

  function addTopic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!topicName.trim()) {
      return;
    }

    setTopics((current) => [
      {
        id: `tp-${Date.now()}`,
        name: topicName.trim(),
        audience: topicAudience,
        status: "Planned",
      },
      ...current,
    ]);

    setTopicName("");
  }

  function toggleTopicStatus(topicId: string) {
    setTopics((current) =>
      current.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              status: topic.status === "Planned" ? "Published" : "Planned",
            }
          : topic,
      ),
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-3xl font-semibold text-slate-900">Admin</h1>
        <p className="mt-2 text-sm text-slate-600">
          Create and manage trainings and discussion topics for the organization.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white/85 p-5">
          <h2 className="font-display text-xl font-semibold text-slate-900">Create Training</h2>
          <form className="mt-4 grid gap-3" onSubmit={addTraining}>
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Training title"
              value={trainingTitle}
              onChange={(event) => setTrainingTitle(event.target.value)}
            />
            <select
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={trainingOwner}
              onChange={(event) => setTrainingOwner(event.target.value)}
            >
              <option>HR</option>
              <option>Engineering</option>
              <option>Sales</option>
              <option>Customer Success</option>
            </select>
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              type="date"
              value={trainingDate}
              onChange={(event) => setTrainingDate(event.target.value)}
            />
            <button className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">
              Add Training
            </button>
          </form>

          <div className="mt-5 space-y-3">
            {trainings.map((training) => (
              <div
                key={training.id}
                className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3"
              >
                <p className="font-medium text-slate-900">{training.title}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {training.owner} · {formatDate(training.date)}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white/85 p-5">
          <h2 className="font-display text-xl font-semibold text-slate-900">Create Topic</h2>
          <form className="mt-4 grid gap-3" onSubmit={addTopic}>
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Topic name"
              value={topicName}
              onChange={(event) => setTopicName(event.target.value)}
            />
            <select
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={topicAudience}
              onChange={(event) => setTopicAudience(event.target.value)}
            >
              <option>All Teams</option>
              <option>Engineering</option>
              <option>Sales</option>
              <option>Customer Success</option>
              <option>HR</option>
            </select>
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Add Topic
            </button>
          </form>

          <div className="mt-5 space-y-3">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{topic.name}</p>
                  <button
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      topic.status === "Published"
                        ? "bg-teal-100 text-teal-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                    onClick={() => toggleTopicStatus(topic.id)}
                    type="button"
                  >
                    {topic.status}
                  </button>
                </div>
                <p className="mt-1 text-sm text-slate-600">Audience: {topic.audience}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
