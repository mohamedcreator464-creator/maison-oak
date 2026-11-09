"use client";

import { Truck, Hammer, ShieldCheck, Leaf, Headset, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Reveal, { RevealStagger, staggerItem } from "../ui/Reveal";

const items = [
  { icon: Truck, title: "Free Delivery", desc: "On all orders over $500, curbside or white-glove" },
  { icon: Hammer, title: "Premium Craftsmanship", desc: "Hand-finished by artisans using solid materials" },
  { icon: ShieldCheck, title: "5-Year Warranty", desc: "Structural coverage on every single piece" },
  { icon: Leaf, title: "Eco Friendly", desc: "FSC-certified wood and low-VOC finishes" },
  { icon: Headset, title: "24×7 Support", desc: "Real people, ready before and after your order" },
  { icon: Lock, title: "Secure Payment", desc: "Encrypted checkout with buyer protection" },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-8xl px-6 py-24 lg:px-10">
      <Reveal>
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Why Maison &amp; Oak</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Built on Trust and Craft
          </h2>
        </div>
      </Reveal>

      <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-black/5 bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-accent">
              <Icon size={22} />
            </span>
            <h3 className="mt-5 font-display text-lg text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}
