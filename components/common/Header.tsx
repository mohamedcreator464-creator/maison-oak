"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/data/site";
import { useStore } from "@/lib/store-context";
import { cn } from "@/lib/utils";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { label: "Shop", href: "/shop", mega: true },
  { label: "Collections", href: "/shop" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen } = useStore();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-accent"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="font-display text-2xl tracking-wide text-ink">
            Maison<span className="text-primary">&</span>Oak
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.mega && setMegaOpen(true)}
                onMouseLeave={() => link.mega && setMegaOpen(false)}
              >
                <Link
                  href={link.href}
                  className="link-underline flex items-center gap-1 text-sm font-medium text-ink"
                >
                  {link.label}
                  {link.mega && <ChevronDown size={14} />}
                </Link>

                <AnimatePresence>
                  {link.mega && megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="glass absolute left-1/2 top-full mt-4 w-[680px] -translate-x-1/2 rounded-2xl border border-black/5 p-6 shadow-2xl"
                    >
                      <div className="grid grid-cols-3 gap-4">
                        {categories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={`/shop?category=${encodeURIComponent(cat.name)}`}
                            className="group flex flex-col gap-2"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                              <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                sizes="220px"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <span className="text-sm font-medium text-ink">{cat.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            >
              <Search size={18} />
            </button>
            <Link
              href="/"
              aria-label="Wishlist"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary sm:flex"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary sm:flex"
            >
              <User size={18} />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-black/5 bg-white"
            >
              <div className="mx-auto max-w-8xl px-6 py-4 lg:px-10">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for sofas, tables, lighting…"
                  className="w-full border-b border-ink/20 bg-transparent py-2 font-display text-lg placeholder:text-muted focus:border-accent focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink/40"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-6">
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    href={`/shop?category=${encodeURIComponent(c.name)}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-muted"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
