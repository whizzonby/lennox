import { motion } from "framer-motion";
import { Factory, HardHat, Truck, ShieldCheck, Warehouse } from "lucide-react";

const industries = [
  { icon: Factory, title: "Manufacturing & Production", desc: "Assembly, machine operation, quality control, and production line roles." },
  { icon: HardHat, title: "Construction & Skilled Trades", desc: "Welders, electricians, plumbers, carpenters, and general laborers." },
  { icon: Warehouse, title: "Logistics & Warehousing", desc: "Forklift operators, pickers, packers, inventory clerks, and warehouse leads." },
  { icon: Truck, title: "CDL & Transportation", desc: "CDL-A/B drivers, delivery drivers, dispatchers, and fleet support." },
  { icon: ShieldCheck, title: "Security & Facility Support", desc: "Security officers, janitorial staff, groundskeepers, and maintenance techs." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const Industries = () => (
  <section className="py-20 bg-secondary overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
          Industries We Serve
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We specialize in recruiting and placing dependable blue-collar and
          skilled workers across these key industries.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {industries.map((ind) => (
          <motion.div
            key={ind.title}
            variants={card}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-card rounded-lg p-6 shadow-sm border border-border cursor-default group"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 text-accent mb-4 group-hover:bg-accent/25 transition-colors"
            >
              <ind.icon size={24} />
            </motion.div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{ind.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{ind.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Industries;
