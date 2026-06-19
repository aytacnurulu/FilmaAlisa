import { proxyToFilmalisa } from "@/lib/api/proxy";
import { Movie } from "@/lib/types/movies";
import { CategoryWithMovies } from "@/lib/types/category";
import HeroSlider from "@/features/home/components/HeroSlider";
import CategorySection from "@/features/home/components/CategorySection";

export default async function HomePage() {
  const [moviesRes, catsRes] = await Promise.all([
    proxyToFilmalisa("/movies", "GET"),
    proxyToFilmalisa("/categories", "GET"),
  ]);

  const moviesData = await moviesRes.json();
  const catsData = await catsRes.json();

  const heroMovies: Movie[] = moviesData.data
    .slice()
    .sort(
      (a: Movie, b: Movie) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  const categories: CategoryWithMovies[] = catsData.data;

  return (
    <main>
      <HeroSlider movies={heroMovies} />
      <CategorySection categories={categories} />
    </main>
  );
}
