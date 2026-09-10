import Hero from "@/components/Hero";
import TrustSignals from "@/components/TrustSignals";
import WhoWeAre from "@/components/WhoWeAre";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import warehouseAisle from "@/assets/warehouse-aisle.jpg";

const Index = () => (
  <>
    <Hero />
    <TrustSignals />
    <WhoWeAre />
    <IndustriesWeServe />

    {/* Full-width image break */}
    <section className="py-0">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={warehouseAisle}
          alt="Warehouse worker carrying a box through an industrial aisle with shelving and supplies"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />
      </motion.div>
    </section>

    <FAQ />
    <CTASection />
  </>
);

export default Index;
