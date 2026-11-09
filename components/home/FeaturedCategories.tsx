"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/site";
import Reveal, { RevealStagger, staggerItem } from "../ui/Reveal";
import { motion } from "framer-motion";

export default function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-8xl px-6 py-24 lg:px-10">
      <Reveal>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Browse by room</p>
            <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              Shop by Category
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Six curated collections, each built around how a room is actually
            lived in.
          </p>
        </div>
      </Reveal>

      <RevealStagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={staggerItem}>
            <Link
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width:768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl text-white">{cat.name}</h3>
                    <p className="mt-1 text-xs text-white/70">{cat.description}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}
