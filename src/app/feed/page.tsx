"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Post = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  quoteId?: string;
};

const initialPosts: Post[] = [
  {
    id: "p1",
    author: "Xinyi Yin",
    content: "Training reminder: please complete the communication workshop by Friday.",
    createdAt: "2026-03-14T09:10:00",
  },
  {
    id: "p2",
    author: "Darshilkumar Patel",
    content: "Sales team updated the FAQ based on this week feedback.",
    createdAt: "2026-03-14T11:30:00",
    quoteId: "p1",
  },
];

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function loadPosts(): Post[] {
  if (typeof window === "undefined") return initialPosts;
  const stored = localStorage.getItem("posts");
  return stored ? JSON.parse(stored) : initialPosts;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(loadPosts);
  const [author, setAuthor] = useState("Team Member");

  useEffect(() => {
    const name = localStorage.getItem("fullName");
    if (name) setAuthor(name);
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);
  const [draft, setDraft] = useState("");
  const [quoteId, setQuoteId] = useState("");

  const orderedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts],
  );

  function publishPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) {
      return;
    }

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: author.trim() || "Team Member",
      content: draft.trim(),
      createdAt: new Date().toISOString(),
      quoteId: quoteId || undefined,
    };

    setPosts((current) => [newPost, ...current]);
    setDraft("");
    setQuoteId("");
  }

  return (
    <div className="space-y-7">
      <section>
        <h1 className="font-display text-3xl font-semibold text-slate-900">Posts and Quotes</h1>
        <p className="mt-2 text-sm text-slate-600">
          Employees can post updates and quote prior posts to keep context visible.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white/85 p-5">
        <h2 className="font-display text-xl font-semibold text-slate-900">Create Post</h2>
        <form className="mt-4 grid gap-3" onSubmit={publishPost}>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Your name"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <textarea
            className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Share an update, blocker, or lesson learned"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <select
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={quoteId}
            onChange={(event) => setQuoteId(event.target.value)}
          >
            <option value="">No quote</option>
            {orderedPosts.map((post) => (
              <option key={post.id} value={post.id}>
                Quote: {post.author} - {post.content.slice(0, 45)}
              </option>
            ))}
          </select>
          <button className="w-fit rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">
            Publish Post
          </button>
        </form>
      </section>

      <section className="space-y-3">
        {orderedPosts.map((post) => {
          const quotedPost = post.quoteId ? posts.find((item) => item.id === post.quoteId) : null;

          return (
            <article key={post.id} className="rounded-2xl border border-slate-200 bg-white/85 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-900">{post.author}</p>
                <p className="text-xs text-slate-500">{formatDateTime(post.createdAt)}</p>
              </div>
              {quotedPost && (
                <blockquote className="mt-3 rounded-xl border border-slate-200 bg-slate-50/90 px-3 py-2 text-sm text-slate-600">
                  <p className="font-medium">Quoted from {quotedPost.author}</p>
                  <p className="mt-1">{quotedPost.content}</p>
                </blockquote>
              )}
              <p className="mt-3 text-sm text-slate-700">{post.content}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
