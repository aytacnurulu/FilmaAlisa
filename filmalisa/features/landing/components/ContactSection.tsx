"use client";

import { motion } from "framer-motion";
import { FiMail, FiUser } from "react-icons/fi";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { revealUp } from "@/shared/motion";

// TODO: add contact form state (name, email, message)

export default function ContactSection() {
  return (
    <section className="bg-surface">
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
          <form className="flex flex-col gap-4">
            {/* TODO: add contact form state (name, email, message) */}
            <Input leftIcon={<FiUser />} placeholder="Full name" />
            <Input leftIcon={<FiMail />} type="email" placeholder="Email address" />
            <textarea
              placeholder="Message"
              className="w-full bg-surface-2 border border-border rounded-md text-text placeholder:text-text-faint text-base px-4 py-3 min-h-[120px] resize-none transition-colors focus-visible:outline-none focus-visible:border-accent focus-visible:[box-shadow:0_0_0_3px_var(--color-accent-soft)]"
            />
            <Button variant="primary" fullWidth type="submit">
              Send
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
