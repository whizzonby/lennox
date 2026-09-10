import { motion } from "framer-motion";
import { Search, Users, UserCheck, HeartHandshake, Target, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import forkliftDiscussion from "@/assets/forklift-discussion.jpg";
import warehouseInventory from "@/assets/warehouse-inventory.jpg";

const services = [
  { title: "Targeted Industrial Sourcing", desc: "We identify and engage qualified candidates across manufacturing, warehouse, transportation, and facility support roles." },
  { title: "Experience & Reliability Screening", desc: "Each candidate is vetted for experience, reliability, and role alignment before being presented to your team." },
  { title: "Interview Coordination", desc: "We manage candidate communications and scheduling to accelerate your hiring decisions." },
  { title: "Direct Placement with 90-Day Guarantee", desc: "Post-placement follow-up and a replacement guarantee ensure long-term retention and performance." },
];

const processSteps = [
  { icon: Search, title: "Discovery Call", time: "15–30 min", desc: "Define role requirements and hiring timeline." },
  { icon: Target, title: "Sourcing & Screening", time: "5–10 business days", desc: "Identify and vet qualified candidates for experience, reliability, and long-term fit." },
  { icon: UserCheck, title: "Candidate Presentation", time: "", desc: "Curated shortlist presented for interview and selection." },
  { icon: HeartHandshake, title: "Placement & Follow-Up", time: "", desc: "30-day transition support to ensure a smooth start." },
];

const Employers = () => (
  <>
    {/* Hero with text + image side by side */}
    <section className="bg-primary py-16 md:py-20" aria-label="Employers hero">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Reliable Talent. Simple Hiring.
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-4">
              With 5+ years of collective experience placing manufacturing, warehouse, transportation, and facility support professionals for notable KC Metro companies, Lennox Talent Group understands industrial hiring.
            </p>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              We source, screen, and present candidates prepared to perform and stay long-term—backed by a 90-day guarantee.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10 shadow-lg"
              >
                <a href="https://calendly.com/lena-lennoxtalentgroup" target="_blank" rel="noopener noreferrer">
                  Schedule a Discovery Call
                </a>
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
              src={forkliftDiscussion}
              alt="Warehouse supervisors reviewing operations near a forklift from above"
              className="w-full h-72 md:h-[420px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-16 bg-background" aria-labelledby="employer-services-heading">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 id="employer-services-heading" className="font-display text-3xl font-bold text-foreground text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 border border-border"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed ml-5">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 bg-secondary" aria-labelledby="employer-process-heading">
      <div className="container mx-auto px-4">
        <h2 id="employer-process-heading" className="font-display text-3xl font-bold text-secondary-foreground text-center mb-12">Our Hiring Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {processSteps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/15 text-accent mb-4">
                <s.icon size={28} />
              </div>
              <div className="text-xs font-bold text-accent mb-1">Step {i + 1}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{s.title}</h3>
              {s.time && <p className="text-xs text-accent font-medium mb-2">{s.time}</p>}
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Investment & Guarantee */}
    <section className="py-16 bg-background" aria-labelledby="employer-pricing-heading">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 id="employer-pricing-heading" className="font-display text-3xl font-bold text-foreground text-center mb-8">Investment &amp; Guarantee</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Placement Fee</h3>
            <p className="text-foreground font-bold text-3xl mb-3">20%</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              of first-year base salary (direct-hire only). Covers sourcing, screening, interview coordination, and post-placement follow-up.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">90-Day Guarantee</h3>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 text-accent mb-3">
              <ShieldCheck size={22} />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Replacement search at no additional fee if employment ends within 90 days due to performance or fit.
            </p>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mb-8">
          Our goal is not just to fill a role — it's to secure the right long-term hire for your organization.
        </p>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10"
          >
            <a href="https://calendly.com/lena-lennoxtalentgroup" target="_blank" rel="noopener noreferrer">
              Schedule a Call to Get Started
            </a>
          </Button>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 bg-secondary" aria-labelledby="employer-faq-heading">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 id="employer-faq-heading" className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>
        <Accordion type="single" collapsible className="space-y-3">
          {[
            { q: "What roles do you fill?", a: "Direct-hire placements in manufacturing, warehouse, security, facility support, and transportation—including production staff, supervisors, skilled trades, and CDL drivers." },
            { q: "How do you ensure quality?", a: "Structured screening verifies experience, reliability, and role alignment before candidates are presented." },
            { q: "How fast can you deliver candidates?", a: "Most searches close within 2–4 weeks. Urgent needs can receive qualified candidates in 5–7 business days." },
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
          src={warehouseInventory}
          alt="Warehouse inventory shelving in an industrial distribution center"
          className="w-full h-80 md:h-[28rem] object-cover object-[center_25%]"
          loading="lazy"
        />
      </motion.div>
    </section>
  </>
);

export default Employers;
