"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type ChatMessage = {
  id: string;
  from: "me" | "them";
  body: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  team: string;
  messages: ChatMessage[];
};

const initialConversations: Conversation[] = [
  {
    id: "c1",
    name: "Customer Success Leads",
    team: "Customer Success",
    messages: [
      {
        id: "m1",
        from: "them",
        body: "Can engineering review the new escalation workflow draft?",
        time: "09:12",
      },
      {
        id: "m2",
        from: "me",
        body: "Yes, we can provide notes by this afternoon.",
        time: "09:18",
      },
    ],
  },
  {
    id: "c2",
    name: "HR Coordination",
    team: "HR",
    messages: [
      {
        id: "m3",
        from: "them",
        body: "Please share attendance for this week training.",
        time: "10:02",
      },
    ],
  },
];

function currentTimeLabel(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return initialConversations;
  const stored = localStorage.getItem("conversations");
  return stored ? JSON.parse(stored) : initialConversations;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations);
  const [activeId, setActiveId] = useState(initialConversations[0].id);

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);
  const [draft, setDraft] = useState("");

  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeId) ?? conversations[0],
    [conversations, activeId],
  );

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) {
      return;
    }

    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      from: "me",
      body: draft.trim(),
      time: currentTimeLabel(),
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, messages: [...conversation.messages, newMessage] }
          : conversation,
      ),
    );

    setDraft("");
  }

  return (
    <div className="space-y-7">
      <section>
        <h1 className="font-display text-3xl font-semibold text-slate-900">Messaging</h1>
        <p className="mt-2 text-sm text-slate-600">
          Direct collaboration space for cross-team communication.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white/85 p-4">
          <h2 className="font-display text-lg font-semibold text-slate-900">Conversations</h2>
          <div className="mt-3 space-y-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                  conversation.id === activeConversation.id
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
                onClick={() => setActiveId(conversation.id)}
                type="button"
              >
                <p className="text-sm font-medium text-slate-900">{conversation.name}</p>
                <p className="text-xs text-slate-500">{conversation.team}</p>
              </button>
            ))}
          </div>
        </aside>

        <article className="rounded-2xl border border-slate-200 bg-white/85 p-4">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              {activeConversation.name}
            </h2>
            <p className="text-xs text-slate-500">Team: {activeConversation.team}</p>
          </div>

          <div className="mt-4 space-y-3">
            {activeConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  message.from === "me"
                    ? "ml-auto bg-teal-700 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                <p>{message.body}</p>
                <p className={`mt-1 text-[11px] ${message.from === "me" ? "text-teal-100" : "text-slate-500"}`}>
                  {message.time}
                </p>
              </div>
            ))}
          </div>

          <form className="mt-4 flex gap-2" onSubmit={sendMessage}>
            <input
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Type a message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Send
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}
