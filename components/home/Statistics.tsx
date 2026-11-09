import { stats } from "@/data/site";
import AnimatedCounter from "../ui/AnimatedCounter";
import Reveal from "../ui/Reveal";

export default function Statistics() {
  return (
    <section className="relative overflow-hidden bg-ink py-24">
      <div className="mx-auto grid max-w-8xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <p className="font-display text-4xl text-white sm:text-5xl">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/60">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
