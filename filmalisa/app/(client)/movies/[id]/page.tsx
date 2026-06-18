"use client";

import { use } from "react";
import { useMovie } from "@/lib/api/movies";
import {
  useComments,
  useAddComment,
  useDeleteComment,
} from "@/lib/api/comment";

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = use(params);
  const id = Number(rawId);

  const { data: movie, isLoading: movieLoading } = useMovie(id);
  const { data: comments, isLoading: commentsLoading } = useComments(id);
  const addComment = useAddComment(id);
  const deleteComment = useDeleteComment(id);

  if (movieLoading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <main>
      {/* Hero */}
      <section>
        <h1>{movie?.title}</h1>
      </section>

      {/* Info */}
      <section>
        <img src={movie?.cover_url} alt={movie?.title} />
        <p>{movie?.overview}</p>
        <p>IMDB: {movie?.imdb}</p>
        <p>Runtime: {movie?.run_time_min} min</p>
        <p>Category: {movie?.category?.name}</p>

        <div>
          {movie?.actors?.map((actor) => (
            <div key={actor.id}>
              <img src={actor.img_url} alt={`${actor.name} ${actor.surname}`} />
              <p>
                {actor.name} {actor.surname}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comments */}
      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem(
              "comment",
            ) as HTMLInputElement;
            addComment.mutate(input.value);
            input.value = "";
          }}
        >
          <input name="comment" placeholder="your comment..." />
          <button type="submit">Send</button>
        </form>

        {commentsLoading ? (
          <div>Loading comments...</div>
        ) : (
          comments?.map((comment) => (
            <div key={comment.id}>
              <p>{comment.comment}</p>
              <button onClick={() => deleteComment.mutate(comment.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
