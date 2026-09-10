import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    // Client-side validation
    if (!name || name.length > 100) {
      toast.error("Name must be between 1 and 100 characters.");
      setLoading(false);
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!message || message.length < 10 || message.length > 5000) {
      toast.error("Message must be between 10 and 5000 characters.");
      setLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            ...(session?.access_token ? { "Authorization": `Bearer ${session.access_token}` } : {}),
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast.error(result.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      toast.success("Message sent! We'll get back to you shortly.");
    } catch {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Let's Build the Right Workforce Together
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Whether you're hiring or want to learn more about our process,
              schedule a call and let's talk.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-accent mt-1" size={22} />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:lena@lennoxtalentgroup.com" className="text-muted-foreground text-sm hover:text-accent transition-colors">lena@lennoxtalentgroup.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-accent mt-1" size={22} />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href="tel:+1" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                      Reach us via email or schedule a call
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="text-accent mt-1" size={22} />
                  <div>
                    <p className="font-medium text-foreground">Schedule a Call</p>
                    <Button
                      asChild
                      className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    >
                      <a href="https://calendly.com/lena-lennoxtalentgroup" target="_blank" rel="noopener noreferrer">
                        Book via Calendly
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h2>
              {submitted ? (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <p className="text-foreground font-semibold text-lg">Thank you!</p>
                  <p className="text-muted-foreground text-sm mt-2">We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" rows={5} required placeholder="How can we help?" />
                  </div>
                  <Button type="submit" size="lg" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                    {loading ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
