import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-8xl flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink">This room is empty</h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        The page you&rsquo;re looking for has been moved, sold out, or never existed.
      </p>
      <MagneticButton className="mt-8">
        <Link href="/">Back to Home</Link>
      </MagneticButton>
    </div>
  );
}
