import { ShieldCheck, DollarSign, UserCheck, Clock } from "lucide-react";

const signals = [
  { icon: ShieldCheck, label: "Vetted & Qualified Candidates" },
  { icon: DollarSign, label: "Free for Jobseekers" },
  { icon: UserCheck, label: "Personalized Matching" },
  { icon: Clock, label: "Fast Turnaround" },
];

// Duplicate for seamless loop
const allSignals = [...signals, ...signals];

const TrustSignals = () => (
  <section className="py-6 bg-accent/10 border-y border-accent/20 overflow-hidden">
    <div className="relative">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {allSignals.map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            className="flex items-center gap-3 shrink-0 px-4"
          >
            <div className="shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <s.icon size={24} className="text-accent" />
            </div>
            <span className="text-base md:text-lg font-bold text-foreground leading-tight">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSignals;
