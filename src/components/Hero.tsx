import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.75, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[85vh] flex items-center overflow-hidden" aria-label="Hero">
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
          role="img"
          aria-label="Industrial warehouse workers collaborating on the job"
        />
      </motion.div>
      <motion.div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-primary via-primary/90 to-primary/50 md:to-primary/60" style={{ opacity: overlayOpacity }} />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Connecting Industrial Workers with Employers Who Value Reliability.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed"
          >
            Lennox Talent Group is an industrial recruiting agency placing direct-hire talent in manufacturing, warehouse, and transportation roles—connecting dependable workers with employers seeking long-term fit.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10 shadow-lg"
            >
              <Link to="/jobseekers">Jobseekers – Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground/15 text-primary-foreground border-2 border-primary-foreground/60 hover:bg-primary-foreground/25 font-medium text-base px-8 backdrop-blur-sm"
            >
              <Link to="/employers">Employers – Schedule a Call</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
