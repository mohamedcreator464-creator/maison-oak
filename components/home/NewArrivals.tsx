import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newArrivals } from "@/data/products";
import ProductCard from "../ui/ProductCard";
import Reveal from "../ui/Reveal";

export default function NewArrivals() {
  return (
    <section className="mx-auto max-w-8xl px-6 py-24 lg:px-10">
      <Reveal>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Just landed</p>
            <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            className="link-underline flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            Explore Shop <ArrowRight size={15} />
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
        {newArrivals.slice(0, 4).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
