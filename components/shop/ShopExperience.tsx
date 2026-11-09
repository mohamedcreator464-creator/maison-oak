"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { Category } from "@/types";
import ProductCard from "../ui/ProductCard";

const categories: Category[] = ["Living Room", "Bedroom", "Dining", "Office", "Outdoor", "Kids"];
const materials = ["Solid Oak", "Solid Walnut", "Leather", "Velvet", "Bouclé", "Teak", "Rattan"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

export default function ShopExperience() {
  const params = useSearchParams();
  const initialCategory = (params.get("category") as Category) || null;

  const [activeCategories, setActiveCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [maxPrice, setMaxPrice] = useState(4000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const toggleCategory = (cat: Category) => {
    setPage(1);
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const inCategory = activeCategories.length === 0 || activeCategories.includes(p.category);
      const underPrice = p.price <= maxPrice;
      const stockOk = !inStockOnly || p.inStock;
      return inCategory && underPrice && stockOk;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [activeCategories, maxPrice, inStockOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const FilterPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="font-display text-sm uppercase tracking-wider text-ink">Category</h4>
        <div className="mt-4 flex flex-col gap-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 text-sm text-muted">
              <input
                type="checkbox"
                checked={activeCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-ink/20 text-accent focus:ring-accent"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-sm uppercase tracking-wider text-ink">Price</h4>
        <input
          type="range"
          min={100}
          max={4000}
          step={100}
          value={maxPrice}
          onChange={(e) => {
            setPage(1);
            setMaxPrice(Number(e.target.value));
          }}
          className="mt-4 w-full accent-accent"
        />
        <p className="mt-2 text-xs text-muted">Up to ${maxPrice.toLocaleString()}</p>
      </div>

      <div>
        <h4 className="font-display text-sm uppercase tracking-wider text-ink">Material</h4>
        <div className="mt-4 flex flex-wrap gap-2">
          {materials.map((m) => (
            <span
              key={m}
              className="cursor-default rounded-full border border-ink/10 px-3 py-1.5 text-xs text-muted"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-sm uppercase tracking-wider text-ink">Availability</h4>
        <label className="mt-4 flex items-center gap-2.5 text-sm text-muted">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => {
              setPage(1);
              setInStockOnly((v) => !v);
            }}
            className="h-4 w-4 rounded border-ink/20 text-accent focus:ring-accent"
          />
          In stock only
        </label>
      </div>

      {(activeCategories.length > 0 || inStockOnly || maxPrice < 4000) && (
        <button
          onClick={() => {
            setActiveCategories([]);
            setInStockOnly(false);
            setMaxPrice(4000);
            setPage(1);
          }}
          className="link-underline self-start text-xs font-medium text-accent"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <section className="mx-auto max-w-8xl px-6 pb-24 pt-14 lg:px-10">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Full Catalog</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Shop All Furniture</h1>
        <p className="mt-3 max-w-lg text-sm text-muted">
          {filtered.length} products {activeCategories.length > 0 && `in ${activeCategories.join(", ")}`}
        </p>
      </div>

      <div className="flex items-center justify-between border-y border-black/10 py-3">
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-ink lg:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
        <span className="hidden text-sm text-muted lg:block">
          Showing {paginated.length} of {filtered.length}
        </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm focus:border-accent focus:outline-none"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        <div>
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-24 text-center">
              <p className="font-display text-xl text-ink">No products match those filters</p>
              <p className="mt-2 text-sm text-muted">Try adjusting price or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
              {paginated.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                    page === i + 1
                      ? "bg-accent text-white"
                      : "text-ink hover:bg-secondary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink/40 lg:hidden"
            onClick={() => setFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 h-full w-[85%] max-w-xs overflow-y-auto bg-white p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl">Filters</span>
                <button onClick={() => setFiltersOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              {FilterPanel}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
