"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";

export default function FeaturedCollectionBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative mx-auto max-w-8xl overflow-hidden px-6 lg:px-10">
      <div className="relative h-[70vh] min-h-[420px] overflow-hidden rounded-3xl">
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80"
            alt="The Heritage collection"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/40" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-full flex-col items-start justify-end p-8 sm:p-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            The Heritage Collection
          </p>
          <h2 className="mt-3 max-w-lg font-display text-4xl leading-tight text-white sm:text-5xl">
            Solid walnut & white oak, joined by hand
          </h2>
          <MagneticButton className="mt-8">
            <Link href="/shop">Shop Collection</Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
