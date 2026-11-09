import { Product } from "@/types";
import ProductCard from "../ui/ProductCard";
import Reveal from "../ui/Reveal";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-8xl px-6 py-24 lg:px-10">
      <Reveal>
        <h2 className="mb-10 font-display text-3xl text-ink sm:text-4xl">
          You May Also Like
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
