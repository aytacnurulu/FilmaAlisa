"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { revealContainer, revealItem } from "@/shared/motion";
export default function HeroSection() {
  // TODO: add hero email form state

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 lg:px-16 text-center">
      <Image
        fill
        priority
        src="/filmalisaBackground.jpg"
        alt=""
        aria-hidden={true}
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-overlay pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        variants={revealContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-6 max-w-2xl w-full"
      >
        <motion.h1
          variants={revealItem}
          className="font-display text-3xl font-bold leading-tight"
        >
          Unlimited movies, TV shows, and more
        </motion.h1>
        <motion.p variants={revealItem} className="text-text-muted text-lg">
          Filmalisa is a movie search platform
        </motion.p>
        <motion.p variants={revealItem} className="text-text-muted">
          Ready to watch? Enter your email to get started.
        </motion.p>
        <motion.form
          variants={revealItem}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
        >
          <div className="flex-1">
            {/* TODO: add hero email form state */}
            <Input
              leftIcon={<FiMail />}
              type="email"
              placeholder="Email address"
            />
          </div>
          <Link href="/login">
            <Button variant="primary" size="md" type="button">
              Get Started →
            </Button>
          </Link>
        </motion.form>
      </motion.div>
    </section>
  );
}
