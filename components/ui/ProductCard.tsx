"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store-context";
import StarRating from "./StarRating";
import { useState } from "react";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);
  const secondImage = product.images[1] ?? product.images[0];
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
          <Image
            src={secondImage}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                New
              </span>
            )}
            {product.compareAtPrice && (
              <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                Save {Math.round(100 - (product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
            {!product.inStock && (
              <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform hover:scale-110"
          >
            <Heart
              size={16}
              className={cn(wishlisted ? "fill-accent text-accent" : "text-ink")}
            />
          </button>

          {/* Hover actions */}
          <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink/90 py-2.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ShoppingBag size={14} />
              {justAdded ? "Added" : "Add to Cart"}
            </button>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur">
              <Eye size={15} className="text-ink" />
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <p className="text-[11px] uppercase tracking-wider text-muted">
            {product.category}
          </p>
          <h3 className="font-display text-base leading-snug text-ink">
            {product.name}
          </h3>
          <StarRating rating={product.rating} showValue />
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="font-medium text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
