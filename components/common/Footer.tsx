"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: ["Living Room", "Bedroom", "Dining", "Office", "Outdoor", "Kids"],
  },
  {
    title: "Help",
    links: ["FAQ", "Shipping Policy", "Return Policy", "Privacy Policy", "Contact Us"],
  },
  {
    title: "Company",
    links: ["About Us", "Our Craftsmanship", "Careers", "Press", "Sustainability"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-secondary">
      <div className="mx-auto max-w-8xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-2xl text-ink">
              Maison<span className="text-primary">&</span>Oak
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Thoughtfully designed furniture, crafted from solid wood, natural
              stone and honest materials — built to be lived with for decades.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm uppercase tracking-wider text-ink">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="link-underline text-sm text-muted hover:text-ink"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-ink">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-muted">
              Get 10% off your first order and early access to new arrivals.
            </p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Email address"
                className="rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#74492f]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Maison &amp; Oak. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-ink">Privacy Policy</Link>
            <Link href="/" className="hover:text-ink">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
