"use client";

import { useState } from "react";
import type { Comment } from "@/lib/types/comment";
import { FiSend, FiTrash2, FiUser, FiMessageCircle } from "react-icons/fi";
import {
  useDeleteComment,
  useAddComment,
  useComments,
} from "@/lib/api/comment";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

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
  const [text, setText] = useState("");
  const id = Number(movieId);

  const { data: comments = initialComments } = useComments(id);
  const addMutation = useAddComment(id);
  const deleteMutation = useDeleteComment(id);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || addMutation.isPending) return;
    addMutation.mutate(text.trim(), { onSuccess: () => setText("") });
  }

  return (
    <section className="px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FiMessageCircle size={20} style={{ color: "var(--color-accent)" }} />
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
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-surface-2)" }}
                >
                  <FiUser
                    size={15}
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </div>

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

                <Button
                  variant="ghost"
                  onClick={() => deleteMutation.mutate(comment.id)}
                  disabled={
                    deleteMutation.isPending &&
                    deleteMutation.variables === comment.id
                  }
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 h-auto p-1.5 text-danger"
                  aria-label="Delete comment"
                >
                  {deleteMutation.isPending &&
                  deleteMutation.variables === comment.id ? (
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
                </Button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment…"
            className="rounded-xl"
          />
          <Button
            type="submit"
            disabled={addMutation.isPending || !text.trim()}
            className="flex-shrink-0 w-11 h-11 px-0"
            aria-label="Post comment"
          >
            <FiSend size={16} />
          </Button>
        </form>
      </div>
    </section>
  );
}
