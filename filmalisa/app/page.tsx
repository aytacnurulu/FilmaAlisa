"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMail, FiUser } from "react-icons/fi";
import { Logo } from "@/shared/components/ui/Logo";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Accordion } from "@/shared/components/ui/Accordion";
import { faqItems } from "@/shared/data/faq";
import {
  revealUp,
  revealContainer,
  revealItem,
  imageReveal,
} from "@/shared/motion";

const footerColumns: Record<string, string[]> = {
  Company: ["FAQ", "Jobs", "Press", "About"],
  Account: ["My Account", "Profiles", "Membership"],
  Help: ["Help Center", "Contact Us", "Speed Test"],
  Legal: ["Privacy", "Terms of Use", "Cookies"],
};

export default function LandingPage() {
  const [heroEmail, setHeroEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  function handleHeroSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(heroEmail);
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ name: contactName, email: contactEmail, message: contactMessage });
  }

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-16 py-4">
          <Logo size="md" withWordmark />
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-bg px-4 lg:px-16 text-center">
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
            onSubmit={handleHeroSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
          >
            <div className="flex-1">
              <Input
                leftIcon={<FiMail />}
                type="email"
                placeholder="Email address"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
              />
            </div>
            <Button variant="primary" size="md" type="submit">
              Get Started →
            </Button>
          </motion.form>
        </motion.div>
      </section>

      {/* ── FEATURE A — Enjoy on your TV ── */}
      <section className="bg-bg border-t border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-4"
          >
            <motion.h2
              variants={revealItem}
              className="font-display text-2xl font-bold"
            >
              Enjoy on your TV
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="text-text-muted leading-relaxed"
            >
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more. Your favourite titles on the biggest
              screen in the room.
            </motion.p>
          </motion.div>
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center"
          >
            <Image
              src="/landingpageImg1.svg"
              alt="TV mockup showing Filmalisa"
              width={560}
              height={420}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE B — Watch everywhere ── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center order-2 lg:order-1"
          >
            <Image
              src="/landingpageImg2.svg"
              alt="Devices mockup showing Filmalisa"
              width={560}
              height={420}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-4 order-1 lg:order-2"
          >
            <motion.h2
              variants={revealItem}
              className="font-display text-2xl font-bold"
            >
              Watch everywhere
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="text-text-muted leading-relaxed"
            >
              Stream on your phone, tablet, laptop, and TV. Your watchlist and
              history follow you seamlessly across every device you own.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE C — Create profiles for kids ── */}
      <section className="bg-bg border-t border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-4"
          >
            <motion.h2
              variants={revealItem}
              className="font-display text-2xl font-bold"
            >
              Create profiles for kids
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="text-text-muted leading-relaxed"
            >
              Send kids on adventures with their favourite characters. Filter
              by rating and genre to find age-appropriate titles. Safe,
              simple, and fun for the whole family.
            </motion.p>
          </motion.div>
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center"
          >
            <Image
              src="/landingpageImg3.svg"
              alt="Kids illustration"
              width={560}
              height={420}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-md mx-auto px-4 py-20">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-display text-2xl font-bold text-center">
              Contact us
            </h2>
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <Input
                leftIcon={<FiUser />}
                placeholder="Full name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <Input
                leftIcon={<FiMail />}
                type="email"
                placeholder="Email address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <textarea
                placeholder="Message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-md text-text placeholder:text-text-faint text-base px-4 py-3 min-h-[120px] resize-none transition-colors focus-visible:outline-none focus-visible:border-accent focus-visible:[box-shadow:0_0_0_3px_var(--color-accent-soft)]"
              />
              <Button variant="primary" fullWidth type="submit">
                Send
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-bg border-t border-border">
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

      {/* ── FOOTER ── */}
      <footer className="bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-16 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {Object.entries(footerColumns).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-text">{heading}</h3>
                {links.map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="text-sm text-text-faint hover:text-text transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-text-faint">
            © 2025 Filmalisa. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
