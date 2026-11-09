"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { formatPrice } from "@/lib/utils";
import MagneticButton from "../ui/MagneticButton";

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal } =
    useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-ink/40"
          onClick={() => setCartOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <span className="font-display text-xl">
                Your Bag {cart.length > 0 && `(${cart.length})`}
              </span>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={40} className="text-muted/50" />
                <p className="text-muted">Your bag is empty — for now.</p>
                <MagneticButton onClick={() => setCartOpen(false)}>
                  <Link href="/shop">Continue Shopping</Link>
                </MagneticButton>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col divide-y divide-black/5">
                    {cart.map((line) => (
                      <li key={line.product.id} className="flex gap-4 py-5">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-card">
                          <Image
                            src={line.product.images[0]}
                            alt={line.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-sm leading-snug">
                                {line.product.name}
                              </p>
                              <p className="mt-0.5 text-xs text-muted">
                                {line.product.color}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(line.product.id)}
                              aria-label="Remove item"
                              className="text-muted hover:text-accent"
                            >
                              <X size={15} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-black/10 px-2 py-1">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  updateQuantity(line.product.id, line.quantity - 1)
                                }
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-4 text-center text-sm">
                                {line.quantity}
                              </span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateQuantity(line.product.id, line.quantity + 1)
                                }
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="text-sm font-medium">
                              {formatPrice(line.product.price * line.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-black/10 px-6 py-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-muted">Subtotal</span>
                    <motion.span
                      key={cartTotal}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-lg"
                    >
                      {formatPrice(cartTotal)}
                    </motion.span>
                  </div>
                  <MagneticButton className="w-full justify-center">
                    Checkout
                  </MagneticButton>
                  <p className="mt-3 text-center text-xs text-muted">
                    Shipping & taxes calculated at checkout
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
