"use client";

import { useState } from "react";
import type { Comment } from "@/lib/types/comment";
import { FiSend, FiTrash2, FiUser, FiMessageCircle } from "react-icons/fi";

interface Props {
  movieId: string;
  initialComments: Comment[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CommentSection({ movieId, initialComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/movies/${movieId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: text.trim() }),
      });
      if (res.ok) {
        const body = await res.json();
        const newComment: Comment = body.data ?? {
          id: Date.now(),
          comment: text.trim(),
          created_at: new Date().toISOString(),
        };
        setComments((prev) => [...prev, newComment]);
        setText("");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(commentId: number) {
    setDeletingId(commentId);
    try {
      const res = await fetch(`/api/movies/${movieId}/comment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <FiMessageCircle
            size={20}
            style={{ color: "var(--color-accent)" }}
          />
          <h2
            className="text-xl font-display font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            Comments
          </h2>
          <span
            className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
            style={{
              backgroundColor: "var(--color-accent-soft)",
              color: "var(--color-accent)",
            }}
          >
            {comments.length}
          </span>
        </div>

        {/* Comment list */}
        <div className="space-y-3 mb-8">
          {comments.length === 0 ? (
            <p
              className="text-center py-10 text-sm"
              style={{ color: "var(--color-text-faint)" }}
            >
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-4 rounded-xl group"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                {/* Avatar */}
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-surface-2)" }}
                >
                  <FiUser
                    size={15}
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text)" }}
                  >
                    {comment.comment}
                  </p>
                  <p
                    className="text-xs mt-1.5"
                    style={{ color: "var(--color-text-faint)" }}
                  >
                    {formatDate(comment.created_at)}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(comment.id)}
                  disabled={deletingId === comment.id}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg disabled:opacity-30"
                  style={{ color: "var(--color-danger)" }}
                  aria-label="Delete comment"
                >
                  {deletingId === comment.id ? (
                    <span
                      className="block w-4 h-4 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: "var(--color-danger)",
                        borderTopColor: "transparent",
                      }}
                    />
                  ) : (
                    <FiTrash2 size={15} />
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment…"
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "var(--color-accent)" }}
            aria-label="Post comment"
          >
            <FiSend size={16} color="#fff" />
          </button>
        </form>
      </div>
    </section>
  );
}
