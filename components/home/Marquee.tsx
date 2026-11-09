const words = [
  "Solid Wood",
  "Hand-Finished",
  "Natural Stone",
  "Heirloom Quality",
  "Sustainably Sourced",
  "Free White-Glove Delivery",
];

export default function Marquee() {
  const loop = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-black/5 bg-secondary py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {loop.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-xl text-ink/70"
          >
            {w}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
