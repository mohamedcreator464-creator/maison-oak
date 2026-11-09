import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import Gallery from "@/components/product/Gallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — Maison & Oak" };
  return {
    title: `${product.name} — Maison & Oak`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <div className="mx-auto max-w-8xl px-6 pt-8 lg:px-10">
        <nav className="flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <ChevronRight size={12} />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-ink"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-8xl grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-2 lg:px-10 lg:py-14">
        <Gallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </section>

      <RelatedProducts products={related} />
    </>
  );
}
