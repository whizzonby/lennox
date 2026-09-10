import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden border-b-4 border-accent/30">
      <motion.div className="absolute inset-0 bg-primary" style={{ scale: bgScale }} />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Let's Build the Right Workforce Together
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-10 max-w-xl mx-auto">
            Whether you're hiring or want to learn more about our process,
            schedule a call and let's talk.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8"
            >
              <a href="https://calendly.com/lena-lennoxtalentgroup" target="_blank" rel="noopener noreferrer">
                Book a Call via Calendly
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold text-base px-8"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
