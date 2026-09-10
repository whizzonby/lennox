import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Handshake, TrendingUp } from "lucide-react";
import { useRef } from "react";

const values = [
  { icon: Users, title: "People First", desc: "We believe hiring works best when relationships come before transactions. Every interaction is rooted in empathy, transparency, and genuine care for the people we serve." },
  { icon: Handshake, title: "Partnerships Always", desc: "Long-term collaboration over quick placements. We invest in every relationship, building trust that lasts well beyond the first hire." },
  { icon: TrendingUp, title: "Talent That Thrives", desc: "We equip candidates with tools, preparation, and support for sustained success — not just a job offer, but a foundation for lasting career growth." },
];


const WhoWeAre = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="bg-background" aria-labelledby="who-we-are-heading">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left column — sticky */}
          <div className="md:w-5/12 md:sticky md:top-20 md:self-start md:h-[calc(100vh-5rem)] md:flex md:items-center py-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 id="who-we-are-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Who We Are
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Lennox Talent Group is a people-first industrial recruiting agency specializing in direct-hire placements across manufacturing, warehouse, and transportation. We source and screen job-ready candidates while equipping workers with the tools to secure and sustain long-term employment.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We believe strong businesses and thriving careers are built by placing the right people in the right roles.
              </p>

            </motion.div>
          </div>

          {/* Right column — scrolls with timeline line */}
          <div className="md:w-7/12 relative flex flex-col gap-8 py-20">
            {/* Animated progress line */}
            <div className="hidden md:block absolute left-0 top-20 bottom-20 w-px bg-border">
              <motion.div
                className="w-full bg-accent origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, boxShadow: "0 8px 30px -12px hsl(var(--accent) / 0.25)" }}
                className="bg-card rounded-lg p-8 shadow-sm border border-border md:ml-8 transition-colors"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 text-accent mb-4"
                >
                  <v.icon size={24} />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
