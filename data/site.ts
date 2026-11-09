import { Collection, Testimonial, FAQ, Category } from "@/types";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: { name: Category; image: string; description: string }[] = [
  { name: "Living Room", image: img("photo-1586023492125-27b2c045efd7", 900), description: "Sofas, chairs & tables built for gathering" },
  { name: "Bedroom", image: img("photo-1505693416388-ac5ce068fe85", 900), description: "Beds, dressers & nightstands for slower mornings" },
  { name: "Dining", image: img("photo-1567016432779-094069958ea5", 900), description: "Tables & chairs for long dinners" },
  { name: "Office", image: img("photo-1518455027359-f3f8164ba6bd", 900), description: "Desks & seating for focused days" },
  { name: "Outdoor", image: img("photo-1567538096630-e0c55bd6374c", 900), description: "All-weather pieces for open air living" },
  { name: "Kids", image: img("photo-1591129841117-3adfd313e34f", 900), description: "Playful, durable pieces that grow with them" },
];

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "the-heritage-collection",
    name: "The Heritage Collection",
    tagline: "Solid walnut & white oak, joined by hand",
    image: img("photo-1618221195710-dd6b41faaea6", 1600),
    productCount: 18,
  },
  {
    id: "c2",
    slug: "coastal-teak",
    name: "Coastal Teak",
    tagline: "Grade-A teak for outdoor living, indoors and out",
    image: img("photo-1567538096630-e0c55bd6374c", 1600),
    productCount: 12,
  },
  {
    id: "c3",
    slug: "soft-form",
    name: "Soft Form",
    tagline: "Bouclé, linen & velvet upholstery, rounded edges",
    image: img("photo-1519710164239-da123dc03ef4", 1600),
    productCount: 15,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Meredith Coyle",
    location: "Austin, TX",
    rating: 5,
    quote:
      "The Aveline sofa is the first piece of furniture I've bought that actually looks better in person than online. The bouclé is impossibly soft and the oak legs give it real weight.",
    avatar: img("photo-1544005313-94ddf0286df2", 200),
  },
  {
    id: "t2",
    name: "Daniel Escobar",
    location: "Portland, OR",
    rating: 5,
    quote:
      "White-glove delivery on the Province dining table was seamless — two people had it assembled and levelled in twenty minutes. It's the centerpiece of our home now.",
    avatar: img("photo-1500648767791-00dcc994a43e", 200),
  },
  {
    id: "t3",
    name: "Priya Nair",
    location: "Chicago, IL",
    rating: 5,
    quote:
      "I was nervous about ordering a leather chair sight unseen, but the Harlow exceeded every expectation. The leather already has a beautiful patina after six months.",
    avatar: img("photo-1531123897727-8f129e1688ce", 200),
  },
  {
    id: "t4",
    name: "James Whitfield",
    location: "Charleston, SC",
    rating: 4,
    quote:
      "The Cabana teak set has survived a full summer of coastal humidity without a hint of warping. Customer support helped me pick the right cushion fabric too.",
    avatar: img("photo-1560250097-0b93528c311a", 200),
  },
];

export const faqs: FAQ[] = [
  {
    question: "How long does delivery take?",
    answer:
      "In-stock items typically arrive within 7–14 business days. Made-to-order pieces, like custom upholstery colors, take 6–8 weeks. You'll receive tracking as soon as your order ships.",
  },
  {
    question: "Do you offer white-glove delivery?",
    answer:
      "Yes. White-glove delivery includes room-of-choice placement, full assembly, and packaging removal. It's available at checkout for an additional fee on larger pieces like sofas, beds, and dining tables.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return window on all non-custom items in original condition. Custom upholstery and made-to-order pieces are final sale unless damaged in transit.",
  },
  {
    question: "Is assembly required?",
    answer:
      "Most case goods (dressers, consoles, bookcases) require light assembly, typically legs or hardware only. Seating and tables usually ship fully or mostly assembled. Each product page lists exact assembly requirements.",
  },
  {
    question: "Do you offer a warranty?",
    answer:
      "Every piece includes a 5-year structural warranty covering frames, joinery, and mechanisms. Upholstery fabric and leather are covered for 2 years against manufacturing defects.",
  },
  {
    question: "Can I order fabric or wood samples?",
    answer:
      "Yes, swatch sets are available for all upholstery fabrics, leathers, and wood finishes. You can request up to 5 free samples per order, shipped within 2–3 business days.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within the continental United States and Canada. We're working on expanding to additional regions — join our newsletter for updates.",
  },
  {
    question: "How do I care for solid wood furniture?",
    answer:
      "Dust regularly with a soft, dry cloth and avoid direct sunlight or heat sources, which can cause fading and warping. We recommend an oil or wax treatment every 6–12 months for oiled finishes.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "Orders can be modified or cancelled free of charge within 24 hours of purchase. After that, made-to-order items enter production and cannot be changed.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes, we partner with a third-party provider to offer installment plans starting at 0% APR for qualifying orders, available at checkout.",
  },
];

export const stats = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 250, suffix: "+", label: "Premium Products" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Positive Reviews" },
];
