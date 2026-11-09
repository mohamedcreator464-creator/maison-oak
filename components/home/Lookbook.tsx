"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import Reveal from "../ui/Reveal";
import { formatPrice } from "@/lib/utils";

const hotspots = [
  { slug: "aveline-boucle-sofa", top: "58%", left: "32%" },
  { slug: "marlow-marble-coffee-table", top: "78%", left: "62%" },
  { slug: "nolan-oak-console", top: "30%", left: "78%" },
];

export default function Lookbook() {
  return (
    <section className="mx-auto max-w-8xl px-6 py-24 lg:px-10">
      <Reveal>
        <div className="mb-12 max-w-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Lookbook</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Shop the Look
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            A sunlit living room styled with pieces from our Soft Form
            collection. Tap a hotspot to see the details.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=80"
            alt="Styled living room lookbook"
            fill
            className="object-cover"
          />
          {hotspots.map((h) => {
            const product = getProductBySlug(h.slug);
            if (!product) return null;
            return (
              <div
                key={h.slug}
                style={{ top: h.top, left: h.left }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
              >
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur"
                >
                  <Plus size={16} />
                </motion.span>
                <Link
                  href={`/product/${product.slug}`}
                  className="absolute left-1/2 top-10 z-10 w-44 -translate-x-1/2 scale-90 rounded-xl bg-white p-3 opacity-0 shadow-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                >
                  <p className="font-display text-sm leading-snug text-ink">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">{formatPrice(product.price)}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
