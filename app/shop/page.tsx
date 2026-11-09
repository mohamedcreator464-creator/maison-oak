import { Suspense } from "react";
import type { Metadata } from "next";
import ShopExperience from "@/components/shop/ShopExperience";

export const metadata: Metadata = {
  title: "Shop All Furniture — Maison & Oak",
  description: "Browse our full catalog of premium, handcrafted furniture.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-muted">Loading…</div>}>
      <ShopExperience />
    </Suspense>
  );
}
