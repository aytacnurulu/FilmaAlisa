"use client";

import { motion } from "framer-motion";
import { revealContainer, revealItem, imageReveal } from "@/shared/motion";

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  background: "bg-bg" | "bg-surface";
}

export default function FeatureSection({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition,
  background,
}: FeatureSectionProps) {
  const textOrder =
    imagePosition === "left" ? "order-2 lg:order-2" : "order-1 lg:order-2";
  const imageOrder =
    imagePosition === "left" ? "order-1 lg:order-1" : "order-2 lg:order-1";

  return (
    <section className={background}>
      <div className="max-w-6xl mx-auto px-4 lg:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className={`flex flex-col gap-4 ${textOrder}`}
        >
          <motion.h2
            variants={revealItem}
            className="font-display text-2xl font-bold"
          >
            {title}
          </motion.h2>
          <motion.p variants={revealItem} className="text-text-muted leading-relaxed">
            {description}
          </motion.p>
        </motion.div>
        <motion.div
          variants={imageReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className={`flex justify-center ${imageOrder}`}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
