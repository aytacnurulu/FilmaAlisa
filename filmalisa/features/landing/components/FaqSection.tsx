"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/shared/components/ui/Accordion";
import { faqItems } from "@/shared/data/faq";
import { revealUp } from "@/shared/motion";

export default function FaqSection() {
  return (
    <section className="bg-bg">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-8"
        >
          <h2 className="font-display text-2xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
}
