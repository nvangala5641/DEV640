"use client";

import { useEffect, useState, useCallback } from "react";
import { activityEvents as staticEvents, teamMetrics } from "@/lib/app-data";

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const STATIC_IDS = new Set(["p1", "p2", "fb1", "fb2", "tr1", "tr2", "tp1", "tp2", "c1", "c2", "m1", "m2", "m3"]);

export default function ActivityPage() {
  const [allEvents, setAllEvents] = useState(staticEvents);

  const syncData = useCallback(() => {
    const dynamicEvents: any[] = [];
    
    // Helper to process different storage keys
    const processKey = (
      key: string,
      prefix: string,
      actionLabel: string,
      userKey: string,
      getContent: (item: any) => string
    ) => {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      try {
        const items = JSON.parse(raw);
        items.forEach((item: any) => {
          
          // SKIP STATIC ITEMS (Posts, Topics, Trainings, Conversations)
          if (STATIC_IDS.has(item.id)) return;

          if (key === "conversations" && item.messages) {
            item.messages.forEach((msg: any) => {
          
              if (STATIC_IDS.has(msg.id)) return;

              let timestamp = new Date().toISOString(); 
              
              if (msg.id.includes("-")) {
                const parts = msg.id.split("-");
                const unixTime = parseInt(parts[1]);
                if (!isNaN(unixTime)) {
                  timestamp = new Date(unixTime).toISOString();
                }
              }

              dynamicEvents.push({
                id: `${prefix}-${msg.id}`,
                user: msg.from === "me" ? "You" : item.name,
                action: `Message: ${msg.body.slice(0, 50)}`,
                team: item.team || "General",
                at: timestamp, 
              });
            });
          } else {
            // STANDARD DYNAMIC EVENT
            dynamicEvents.push({
              id: `${prefix}-${item.id}`,
              user: item[userKey] || "User",
              action: `${actionLabel}: ${getContent(item).slice(0, 50)}`,
              team: item.team || item.audience || "General",
              at: item.date || item.createdAt || new Date().toISOString(),
            });
          }
        });
      } catch (e) { /* ignore */ }
    };

    processKey("posts", "post", "", "author", (item) => {
      const actionlabel = item.quoteId ? "Quoted: " : "Posted";
      return `${actionlabel}${item.content}`;
    });
    processKey("trainings", "train", "Training Added", "owner", (item) => item.title);
    processKey("topics", "topic", "Topic Created", "audience", (item) => `${item.name} (${item.status})`);
    processKey("conversations", "msg", "Messaged", "name", (item) => "");
    processKey("feedback", "fb", "Feedback", "team", (item) => {
      return `${item.topic} [${item.priority} Priority]`;
    });


    const merged = [...dynamicEvents, ...staticEvents].sort(
      (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
    );


    const unique = Array.from(new Map(merged.map((e) => [e.id, e])).values());
    setAllEvents(unique);
  }, []);


  useEffect(() => {
    syncData(); // Initial load

    // Listen for changes from other tabs/windows
    window.addEventListener("storage", syncData);
    // Listen for changes in the same tab (from your custom hook)
    window.addEventListener("local-storage", syncData);

    return () => {
      window.removeEventListener("storage", syncData);
      window.removeEventListener("local-storage", syncData);
    };
  }, [syncData]);

  // Calculations for the sidebar
  const eventCountByTeam = allEvents.reduce<Record<string, number>>((acc, event) => {
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
          Monitor real-time engagement across posts, messages, and participation.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-slate-900">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            {allEvents.map((event) => (
              <div key={event.id} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 hover:bg-indigo-50 transition">
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

        <article className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
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