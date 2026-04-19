import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Package, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  Zap, 
  Globe, 
  Check,
  ChevronDown,
  Quote,
  Star,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  onGetStarted: () => void;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-8 rounded-3xl bg-white border border-[#eceee9] hover:border-primary/20 hover:shadow-xl transition-all group"
  >
    <div className="w-12 h-12 rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed italic">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#e2e8e1]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180 text-primary")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed italic pr-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#f9faf8] text-foreground font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#f9faf8]/80 backdrop-blur-md border-b border-[#e2e8e1]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-foreground">SpecInsite SDM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Process', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">{item}</a>
            ))}
            <Button onClick={onGetStarted} size="sm" className="bg-primary text-white hover:bg-primary/90 px-6 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-accent/10 to-transparent rounded-full blur-[120px] -z-10" />
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="bg-white border-primary/20 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-sm mb-6">
              Next-Gen SDM Infrastructure
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Manage <span className="text-primary italic">Packaging Lifecycle</span> with Natural Precision
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium italic"
          >
            The world's first SDM platform designed for modern compliance, sustainability tracking, and supplier collaboration. Simple yet powerful.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button onClick={onGetStarted} size="lg" className="h-14 px-10 bg-primary text-white hover:bg-primary/90 rounded-2xl font-bold uppercase tracking-widest text-xs group shadow-xl hover:shadow-primary/20 transition-all">
              Initiate Workspace <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl bg-white border-[#e2e8e1] text-foreground font-bold uppercase tracking-widest text-xs hover:bg-muted/50 shadow-sm">
              View Live Spec
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-16 max-w-5xl mx-auto"
          >
            <div className="relative rounded-[2rem] border border-[#eceee9] bg-white p-4 shadow-[0_40px_100px_rgba(0,0,0,0.04)]">
              <div className="rounded-[1.5rem] bg-[#f9faf8] overflow-hidden border border-[#e2e8e1] aspect-[16/9] flex items-center justify-center">
                 <div className="flex flex-col items-center gap-4 text-primary/20">
                    <Package className="w-24 h-24" />
                    <span className="font-bold text-xl uppercase tracking-[0.5em]">SpecInsite Interface Preview</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Engineered for Excellence</h2>
            <h3 className="text-4xl font-bold tracking-tight">Everything you need to <span className="italic">scale compliance</span>.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Layers}
              title="SKU BOM Intelligence"
              description="Hierarchical mapping of product packaging from primary to tertiary layers with automated weight totals."
              delay={0.1}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Regulatory Shield"
              description="Pre-configured engines for SB 54 and upcoming global EPR legislations. Stay ahead of the tax curve."
              delay={0.2}
            />
            <FeatureCard 
              icon={Zap}
              title="Direct Sourcing"
              description="Zero-friction supplier portal for spec collection. No more hunting through email threads or PDFs."
              delay={0.3}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Dynamic Analytics"
              description="Visualize tonnage, material mix, and carbon factors with precision-grade charts and insights."
              delay={0.4}
            />
            <FeatureCard 
              icon={Globe}
              title="Supply Chain Map"
              description="Geospatial registry of manufacturing and distribution nodes. Optimize for local compliance."
              delay={0.5}
            />
            <FeatureCard 
              icon={Star}
              title="Sustainability Scoring"
              description="System-calculated recyclability and PCR percentage scores to meet internal ESG targets."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Animated Timeline */}
      <section id="process" className="py-24 px-6 bg-[#f9faf8]">
        <div className="max-w-4xl mx-auto">
           <div className="text-center space-y-4 mb-20">
            <h2 className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em]">Operational Flow</h2>
            <h3 className="text-4xl font-bold tracking-tight">The SpecInsite <span className="italic underline decoration-secondary/30 underline-offset-8">Lifecycle</span></h3>
          </div>
          <div className="space-y-12 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-px before:bg-[#e2e8e1]">
            {[
              { step: '01', title: 'Asset Initiation', desc: 'Define your product base and initial packaging requirements.' },
              { step: '02', title: 'Supplier Sync', desc: 'Suppliers upload technical specifications directly via magic-link portal.' },
              { step: '03', title: 'Verification', desc: 'Engineers review specs and approve components for the master registry.' },
              { step: '04', title: 'Report Generation', desc: 'Automated tonnage and liability reports generated for state regulators.' }
            ].map((item, i) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-20"
              >
                <div className="absolute left-0 w-16 h-16 rounded-2xl bg-white border border-[#e2e8e1] flex items-center justify-center text-secondary font-bold shadow-sm z-10 group-hover:bg-secondary group-hover:text-white transition-colors">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground italic leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel (Simple) */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Community Driven</h2>
            <h3 className="text-4xl font-bold tracking-tight">Trusted by <span className="italic">Category Leaders</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'Head of Sustainability', company: 'Luxe Beauty Co.', quote: 'SpecInsite SDM transformed how we handle EPR. What used to take months now takes days.' },
              { name: 'Marcus Thorne', role: 'Packaging Engineer', company: 'NatureFirst', quote: 'The cleanest interface in the industry. Finally, an SDM built for humans.' },
              { name: 'Elena Rodriguez', role: 'Sourcing Director', company: 'SpecInsite Brand Group', quote: 'Supplier collaboration is now effortless. Data accuracy has improved by 40%.' }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-[#f9faf8] border border-[#eceee9] space-y-6"
              >
                <Quote className="w-8 h-8 text-secondary/30" />
                <p className="text-lg font-medium italic text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-accent" />
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{t.role} @ {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-[#f9faf8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Investment</h2>
            <h3 className="text-4xl font-bold tracking-tight">Transparent <span className="italic">Compliance Pricing</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Standard */}
            <div className="p-10 rounded-[2.5rem] bg-white border border-[#e2e8e1] space-y-8 flex flex-col h-full">
              <div className="space-y-4">
                <Badge variant="outline" className="border-muted-foreground/20 text-muted-foreground">Standard</Badge>
                <div className="text-4xl font-mono font-bold">$499 <span className="text-sm font-normal text-muted-foreground uppercase">/ mo</span></div>
                <p className="text-xs text-muted-foreground italic font-medium">Perfect for emerging brands needing EPR readiness.</p>
              </div>
              <ul className="space-y-4 flex-1">
                {['Up to 50 SKUs', 'EPR Liability Reports', 'Supplier Portal Access', 'Material Mix Insights'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium">
                    <Check className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] border-primary text-primary hover:bg-primary/5">Get Started</Button>
            </div>
            {/* Growth */}
            <div className="p-10 rounded-[2.5rem] bg-primary text-white space-y-8 flex flex-col h-full shadow-2xl shadow-primary/20 scale-105 relative z-10">
              <div className="absolute top-0 right-10 -translate-y-1/2">
                <Badge className="bg-secondary text-white border-none shadow-lg px-4 py-1">Most Popular</Badge>
              </div>
              <div className="space-y-4">
                <Badge variant="outline" className="border-white/20 text-white/60">Growth</Badge>
                <div className="text-4xl font-mono font-bold">$1,299 <span className="text-sm font-normal text-white/60 uppercase">/ mo</span></div>
                <p className="text-xs text-white/60 italic font-medium">For scaling enterprises with complex global supply chains.</p>
              </div>
              <ul className="space-y-4 flex-1">
                {['Unlimited SKUs', 'SB 54 Tax Simulator', 'Advanced Carbon Tracking', 'API Access', '24/7 Priority Guard'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium">
                    <Check className="w-4 h-4 text-secondary" /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={onGetStarted} className="w-full h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] bg-white text-primary hover:bg-white/90">Initialize Workspace</Button>
            </div>
            {/* Enterprise */}
            <div className="p-10 rounded-[2.5rem] bg-white border border-[#e2e8e1] space-y-8 flex flex-col h-full">
              <div className="space-y-4">
                <Badge variant="outline" className="border-muted-foreground/20 text-muted-foreground">Custom</Badge>
                <div className="text-4xl font-mono font-bold">Contact</div>
                <p className="text-xs text-muted-foreground italic font-medium">Bespoke infrastructure for multi-national conglomerates.</p>
              </div>
              <ul className="space-y-4 flex-1">
                {['Dedicated Support', 'On-Prem Hosting', 'Custom Compliance Engine', 'Audit Ready Vault'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium">
                    <Check className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] border-primary text-primary hover:bg-primary/5">Request Demo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Inquiries</h2>
            <h3 className="text-4xl font-bold tracking-tight">Frequenty Asked <span className="italic underline decoration-accent/30 underline-offset-8">Questions</span></h3>
          </div>
          <div className="space-y-2">
            <FAQItem 
              question="What exactly is SpecInsite SDM?"
              answer="SpecInsite SDM is an infrastructure layer for Software Development Management focused specifically on physical asset data (packaging) and regulatory compliance (EPR). It centralizes technical specs, supplier data, and sustainability metrics in one source of truth."
            />
            <FAQItem 
              question="How does the SB 54 tax simulator work?"
              answer="Our engine parses your global packaging registry and calculates projected tax liabilities based on California's current SB 54 framework, accounting for material types, PCR percentages, and recyclability scores."
            />
            <FAQItem 
              question="Can I integrate my existing ERP?"
              answer="Yes. SpecInsite SDM provides a robust REST API for Growth and Enterprise customers to sync product data directly from SAP, NetSuite, or Oracle."
            />
            <FAQItem 
              question="How do suppliers upload data?"
              answer="Suppliers receive a secure, one-time magic link. They don't need an account to upload technical specs, simplifying the data collection process significantly."
            />
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="py-24 px-6 bg-[#344e41] text-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em]">Final Initiation</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl mx-auto">Ready to <span className="text-secondary italic">SpecInsite</span> your supply chain?</h3>
            <p className="text-white/60 italic text-xl max-w-xl mx-auto">Join the category leaders scaling compliance with natural precision.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button onClick={onGetStarted} size="lg" className="h-16 px-12 bg-white text-[#344e41] hover:bg-white/90 rounded-[2rem] font-bold uppercase tracking-widest text-xs shadow-2xl group transition-all">
              Launch Workspace <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#344e41] bg-secondary" />
              ))}
              <div className="pl-4 flex items-center text-xs font-bold text-white/40 uppercase tracking-widest">
                Trusted by 50+ Global Enterprises
              </div>
            </div>
          </div>
          <div className="pt-24 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
            <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                <Package className="w-5 h-5" />
              </div>
              <span>SpecInsite SDM</span>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            <div className="text-[10px] font-mono tracking-tighter">
              © 2026 SPECINSITE INFRASTRUCTURE CORP. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
