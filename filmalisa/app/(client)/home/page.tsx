import { Movie } from "@/lib/types/movies";
import { CategoryWithMovies } from "@/lib/types/category";
import { proxyToFilmalisa } from "@/lib/api/proxy";
import HeroSlider from "@/features/home/components/HeroSlider";
import CategorySection from "@/features/home/components/CategorySection";

export default async function HomePage() {
  const res = await proxyToFilmalisa("/movies", "GET");
  const data = await res.json();

  const resCat = await proxyToFilmalisa("/categories", "GET");
  const dataCat = await resCat.json();

  const heroMovies: Movie[] = data.data
    .slice()
    .sort(
      (a: Movie, b: Movie) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  const categories: CategoryWithMovies[] = dataCat.data;

  return (
    <main>
      <HeroSlider movies={heroMovies} />
      <CategorySection categories={categories} />
    </main>
  );
}
