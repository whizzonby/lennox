import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Lennox Talent Group found us three reliable welders in under two weeks. They understand blue-collar hiring like no one else.",
    name: "Mike R.",
    role: "Operations Manager, Steel Works Inc.",
    initials: "MR",
  },
  {
    quote: "They didn't just get me a job—they prepared me for the interview and followed up after I started. That meant a lot.",
    name: "Carlos D.",
    role: "Forklift Operator",
    initials: "CD",
  },
  {
    quote: "Professional, responsive, and genuinely invested in making the right match. We've been working with them for over a year now.",
    name: "Sarah T.",
    role: "HR Director, BuildRight Construction",
    initials: "ST",
  },
];

const Testimonials = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-14">
        What People Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card rounded-lg p-8 shadow-sm border border-border relative"
          >
            <Quote size={32} className="text-accent/30 absolute top-6 right-6" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-accent/15">
                <AvatarFallback className="bg-accent/15 text-accent font-semibold text-sm">{t.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
