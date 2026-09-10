import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const employerFaqs = [
  { q: "What roles do you fill?", a: "Direct-hire placements in manufacturing, warehouse, security, facility support, and transportation—including production staff, supervisors, skilled trades, and CDL drivers." },
  { q: "How do you ensure quality?", a: "Structured screening verifies experience, reliability, and role alignment before candidates are presented." },
  { q: "How fast can you deliver candidates?", a: "Most searches close within 2–4 weeks. Urgent needs can receive qualified candidates in 5–7 business days." },
];

const candidateFaqs = [
  { q: "Is there a cost?", a: "No. Our services are free for candidates." },
  { q: "What happens after I apply?", a: "We review your intake within 1–3 business days and contact you if aligned with current openings." },
  { q: "Are roles temporary?", a: "No. We specialize in direct-hire, long-term employment." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const FAQGroup = ({ title, faqs, variant }: { title: string; faqs: { q: string; a: string }[]; variant?: "default" | "highlighted" }) => (
  <div className={`mb-10 last:mb-0 rounded-lg p-6 ${variant === "highlighted" ? "bg-secondary/50 border border-border" : ""}`}>
    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">{title}</h3>
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div key={i} variants={item}>
            <AccordionItem
              value={`faq-${title}-${i}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-md data-[state=open]:border-accent/30 transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  </div>
);

const FAQ = () => (
  <section className="py-20 bg-background" aria-labelledby="faq-heading">
    <div className="container mx-auto px-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <h2 id="faq-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg">
          Quick answers to common questions about working with us.
        </p>
      </motion.div>

      <FAQGroup title="For Employers" faqs={employerFaqs} />
      <FAQGroup title="For Candidates" faqs={candidateFaqs} variant="highlighted" />
    </div>
  </section>
);

export default FAQ;
