import { motion } from "framer-motion";
import { Factory, Truck, ShieldCheck } from "lucide-react";

const industries = [
  {
    icon: Factory,
    title: "Manufacturing & Warehouse",
    desc: "Production operators, machine operators, assemblers, material handlers, forklift operators, and warehouse associates.",
  },
  {
    icon: Truck,
    title: "Transportation (CDL, DOT & Under 10)",
    desc: "CDL Class A & B drivers, DOT-regulated roles, and local delivery drivers for short- and long-haul operations.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Facility Support",
    desc: "Security officers, facility maintenance technicians, janitorial staff, and building support personnel.",
  },
];

const IndustriesWeServe = () => (
  <section className="py-16 bg-secondary" aria-labelledby="industries-heading">
    <div className="container mx-auto px-4">
      <motion.h2
        id="industries-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground text-center mb-12"
      >
        Industries We Serve
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-card rounded-lg p-8 border border-border shadow-sm text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/15 text-accent mb-4">
              <ind.icon size={28} />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{ind.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{ind.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default IndustriesWeServe;
