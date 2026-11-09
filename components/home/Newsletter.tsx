"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import Reveal from "../ui/Reveal";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-8xl px-6 py-24 lg:px-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-[#5f3e28] px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white">
            <Mail size={20} />
          </span>
          <h2 className="mx-auto mt-6 max-w-lg text-balance font-display text-3xl text-white sm:text-4xl">
            Join the list for early access & 10% off
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/75">
            New arrivals, design guides, and members-only sales — no spam, ever.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/60 backdrop-blur focus:border-white focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-accent"
            >
              {submitted ? (
                <>
                  <Check size={15} /> Subscribed
                </>
              ) : (
                "Subscribe"
              )}
            </motion.button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
