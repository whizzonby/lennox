import { motion } from "framer-motion";
import { Factory, HardHat, Truck, ShieldCheck, Warehouse } from "lucide-react";

const industries = [
  { icon: Factory, label: "Manufacturing & Production" },
  { icon: HardHat, label: "Construction & Skilled Trades" },
  { icon: Warehouse, label: "Logistics & Warehousing" },
  { icon: Truck, label: "CDL & Transportation" },
  { icon: ShieldCheck, label: "Security & Facility Support" },
];

const WhatWeDo = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
          What We Do
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We specialize in recruiting and placing dependable blue-collar and
          skilled workers for employers who need talent they can trust.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card rounded-lg p-6 flex flex-col items-center text-center shadow-sm border border-border"
          >
            <ind.icon size={36} className="text-accent mb-4" />
            <span className="text-sm font-medium text-foreground">{ind.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-muted-foreground mt-10 max-w-xl mx-auto">
        We prioritize quality placements, long-term success, and aligned
        expectations on both sides.
      </p>
    </div>
  </section>
);

export default WhatWeDo;
