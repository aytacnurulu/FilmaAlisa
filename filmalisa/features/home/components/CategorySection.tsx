"use client";

import { motion } from "framer-motion";
import { revealContainer, revealItem } from "@/shared/motion";
import { CategoryWithMovies } from "@/lib/types/category";
import CategoryRow from "./CategoryRow";

type Props = {
  categories: CategoryWithMovies[];
};

export default function CategorySection({ categories }: Props) {
  const withMovies = categories.filter((c) => c.movies.length > 0);

  return (
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col gap-8 py-10"
    >
      {withMovies.map((category) => (
        <motion.div key={category.id} variants={revealItem}>
          <CategoryRow category={category} />
        </motion.div>
      ))}
    </motion.div>
  );
}
