import { motion } from "framer-motion";
import { ClipboardList, Clock, FileText, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import warehouseWorker from "@/assets/warehouse-worker.jpg";
import warehouseTeam from "@/assets/warehouse-team.jpg";

const steps = [
  { icon: ClipboardList, title: "Complete the Intake", desc: "Submit your work history and preferences. Takes approximately 10–15 minutes." },
  { icon: Clock, title: "Review (1–3 Business Days)", desc: "We assess alignment and reach out if matched with current openings." },
  { icon: FileText, title: "Interview Prep & Submission", desc: "Resume refinement and interview guidance before employer submission." },
  { icon: HeartHandshake, title: "Placement & 30-Day Support", desc: "Ongoing follow-up to ensure a strong start in your new role." },
];

const Jobseekers = () => {
  return (
    <>
      {/* Hero with text + image side by side */}
      <section className="bg-primary py-16 md:py-20" aria-label="Jobseekers hero">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Looking for Industrial or Skilled Work?
                <br />
                <span className="text-accent">Let's Get You Placed.</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                We place dependable candidates in manufacturing, warehouse, and transportation roles. Beyond submission, we help you prepare and position yourself for long-term success. Services include resume updates, a mock interview guide, and 30-day post-placement support.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10 shadow-lg"
                >
                  <a href="#intake-form">Start Your Intake</a>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:w-1/2"
            >
              <img
                src={warehouseWorker}
                alt="Warehouse worker operating a pallet jack in an industrial distribution center"
                className="w-full h-72 md:h-[420px] object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background" aria-labelledby="jobseeker-how-it-works">
        <div className="container mx-auto px-4">
          <h2 id="jobseeker-how-it-works" className="font-display text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 text-accent mb-4">
                  <s.icon size={28} />
                </div>
                <div className="text-xs font-bold text-accent mb-1">Step {i + 1}</div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section id="intake-form" className="py-16 bg-secondary" aria-labelledby="jobseeker-intake-heading">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="jobseeker-intake-heading" className="font-display text-3xl font-bold text-secondary-foreground text-center mb-8">
            Jobseeker Intake Form
          </h2>
          <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center bg-muted z-0">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Loading intake form…</span>
              </div>
            </div>
            <iframe
              title="Jobseeker Intake Form"
              src="https://form.jotform.com/260385718586066"
              className="relative z-10"
              style={{ width: "100%", minHeight: "min(800px, 70vh)", border: "none" }}
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background" aria-labelledby="jobseeker-faq-heading">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 id="jobseeker-faq-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Is there a cost?", a: "No. Our services are free for candidates." },
              { q: "What happens after I apply?", a: "We review your intake within 1–3 business days and contact you if aligned with current openings." },
              { q: "Are roles temporary?", a: "No. We specialize in direct-hire, long-term employment." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <AccordionItem
                  value={`faq-${i}`}
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
        </div>
      </section>

      {/* Full-width image break */}
      <section className="py-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={warehouseTeam}
            alt="Warehouse team collaborating in an industrial facility"
            className="w-full h-80 md:h-[28rem] object-cover object-[center_25%]"
            loading="lazy"
          />
        </motion.div>
      </section>
    </>
  );
};

export default Jobseekers;
