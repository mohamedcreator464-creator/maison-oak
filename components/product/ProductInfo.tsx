"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Truck, ShieldCheck, RotateCcw, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store-context";
import StarRating from "../ui/StarRating";
import MagneticButton from "../ui/MagneticButton";

const tabs = ["Description", "Specifications", "Reviews"] as const;

export default function ProductInfo({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Description");
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">{product.category}</p>
      <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-3">
        <StarRating rating={product.rating} size={16} />
        <span className="text-sm text-muted">
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-display text-3xl text-ink">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-lg text-muted line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
        {product.compareAtPrice && (
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            Save {Math.round(100 - (product.price / product.compareAtPrice) * 100)}%
          </span>
        )}
      </div>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        {product.description}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-muted">Material</span>
          <p className="mt-1 text-ink">{product.material}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-muted">Color</span>
          <p className="mt-1 text-ink">{product.color}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-muted">Dimensions</span>
          <p className="mt-1 text-ink">{product.dimensions}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-muted">Availability</span>
          <p className={cn("mt-1", product.inStock ? "text-ink" : "text-accent")}>
            {product.inStock ? "In Stock" : "Sold Out"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex items-center gap-4 rounded-full border border-ink/15 px-4 py-3">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus size={15} />
          </button>
          <span className="w-5 text-center text-sm">{quantity}</span>
          <button aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
            <Plus size={15} />
          </button>
        </div>

        <MagneticButton
          onClick={handleAdd}
          disabled={!product.inStock}
          className="flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <Check size={16} /> Added to Bag
            </motion.span>
          ) : product.inStock ? (
            "Add to Cart"
          ) : (
            "Sold Out"
          )}
        </MagneticButton>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-accent"
        >
          <Heart size={18} className={wishlisted ? "fill-accent text-accent" : "text-ink"} />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 border-t border-black/10 pt-6 text-center text-xs text-muted">
        <div className="flex flex-col items-center gap-2">
          <Truck size={18} className="text-accent" />
          Free Delivery
        </div>
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck size={18} className="text-accent" />
          5-Year Warranty
        </div>
        <div className="flex flex-col items-center gap-2">
          <RotateCcw size={18} className="text-accent" />
          30-Day Returns
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-6 border-b border-black/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative pb-3 text-sm font-medium transition-colors",
                activeTab === tab ? "text-ink" : "text-muted"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.span
                  layoutId="product-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        <div className="py-6 text-sm leading-relaxed text-muted">
          {activeTab === "Description" && <p>{product.description}</p>}
          {activeTab === "Specifications" && (
            <ul className="flex flex-col gap-2.5">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                  {d}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "Reviews" && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl text-ink">{product.rating.toFixed(1)}</span>
                <div>
                  <StarRating rating={product.rating} size={16} />
                  <p className="mt-1 text-xs text-muted">
                    Based on {product.reviewCount} reviews
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted">
                Reviews are collected from verified purchasers within 90 days of delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
